#!/usr/bin/env node
// PR review script — checks skill submissions against contribution rules.
// Writes /tmp/review-result.json with { passed, issues, warnings }.
// Always exits 0 (informational only, does not block merge).

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const CHANGED_FILES_PATH = process.env.CHANGED_FILES_PATH || '/tmp/changed-files.txt';
const REPO_ROOT = process.env.REPO_ROOT || process.cwd();
const OUTPUT_PATH = '/tmp/review-result.json';

const issues = [];
const warnings = [];

function issue(rule, message) {
  issues.push({ rule, message });
}

function warn(message) {
  warnings.push(message);
}

// --- Load changed files ---
let changedFiles;
try {
  changedFiles = fs.readFileSync(CHANGED_FILES_PATH, 'utf8')
    .split('\n')
    .map(f => f.trim())
    .filter(Boolean);
} catch (e) {
  issue('changed-files', `Could not read changed files list: ${e.message}`);
  write({ passed: false, issues, warnings });
  process.exit(0);
}

if (changedFiles.length === 0) {
  warn('No files changed in this PR.');
  write({ passed: true, issues, warnings });
  process.exit(0);
}

// --- Rule 1: No existing files modified (outside skills/<name>/SKILL.md and skills.json) ---
const ALLOWED_NEW_PATTERN = /^skills\/[^/]+\//;
const SKILLS_JSON = 'skills.json';

for (const f of changedFiles) {
  if (f === SKILLS_JSON) continue;
  if (ALLOWED_NEW_PATTERN.test(f)) continue;
  issue(
    'no-existing-files',
    `File \`${f}\` is outside the allowed paths. Only \`skills/<name>/\` files and \`skills.json\` may be changed.`
  );
}

// --- Identify new skill directories ---
const skillDirs = new Set();
for (const f of changedFiles) {
  const m = f.match(/^skills\/([^/]+)\//);
  if (m) skillDirs.add(m[1]);
}

for (const skillName of skillDirs) {
  const skillDir = path.join(REPO_ROOT, 'skills', skillName);
  const skillMdPath = path.join(skillDir, 'SKILL.md');

  // --- Rule 2: Correct directory ---
  // (already enforced by rule 1 pattern; just check dir exists)
  if (!fs.existsSync(skillDir)) {
    issue('correct-directory', `Directory \`skills/${skillName}/\` does not exist.`);
    continue;
  }

  // --- Rule 3: SKILL.md exists and is non-empty ---
  if (!fs.existsSync(skillMdPath)) {
    issue('skill-md-exists', `\`skills/${skillName}/SKILL.md\` is missing.`);
    continue;
  }

  const skillMdContent = fs.readFileSync(skillMdPath, 'utf8').trim();
  if (!skillMdContent) {
    issue('skill-md-non-empty', `\`skills/${skillName}/SKILL.md\` is empty.`);
    continue;
  }

  // --- Rule 4: Valid frontmatter ---
  const frontmatter = parseFrontmatter(skillMdContent);
  if (!frontmatter) {
    issue(
      'valid-frontmatter',
      `\`skills/${skillName}/SKILL.md\` is missing a valid YAML frontmatter block (\`---\` delimiters).`
    );
    continue;
  }

  const missingFields = ['name', 'description', 'user-invocable'].filter(f => !(f in frontmatter));
  if (missingFields.length > 0) {
    issue(
      'valid-frontmatter',
      `\`skills/${skillName}/SKILL.md\` frontmatter is missing required fields: ${missingFields.map(f => `\`${f}\``).join(', ')}.`
    );
  }

  // --- Rule 5: skill name matches directory ---
  if (frontmatter.name !== undefined && frontmatter.name !== skillName) {
    issue(
      'name-matches-directory',
      `Frontmatter \`name: ${frontmatter.name}\` does not match directory name \`${skillName}\`. They must be identical.`
    );
  }
}

// --- Rule 6: skills.json entry is valid ---
if (changedFiles.includes(SKILLS_JSON)) {
  const skillsJsonPath = path.join(REPO_ROOT, SKILLS_JSON);
  let skillsData;

  try {
    skillsData = JSON.parse(fs.readFileSync(skillsJsonPath, 'utf8'));
  } catch (e) {
    issue('valid-skills-json', `\`skills.json\` is not valid JSON: ${e.message}`);
    skillsData = null;
  }

  if (skillsData && Array.isArray(skillsData)) {
    for (const entry of skillsData) {
      if (!Array.isArray(entry.tags)) {
        issue(
          'valid-skills-json',
          `Entry \`${entry.name || '(unnamed)'}\` in \`skills.json\` is missing or has a non-array \`tags\` field.`
        );
      }
      if (!Array.isArray(entry.requires)) {
        issue(
          'valid-skills-json',
          `Entry \`${entry.name || '(unnamed)'}\` in \`skills.json\` is missing or has a non-array \`requires\` field.`
        );
      }
    }
  } else if (skillsData && !Array.isArray(skillsData)) {
    issue('valid-skills-json', '`skills.json` must be a JSON array at the top level.');
  }
}

// --- Write result ---
const passed = issues.length === 0;
write({ passed, issues, warnings });
process.exit(0);

// ---------------------------------------------------------------------------

function write(result) {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  const out = (msg) => process.stdout.write(msg + '\n');
  if (result.passed) {
    out('✅ All checks passed.');
  } else {
    out(`❌ ${result.issues.length} issue(s) found:`);
    result.issues.forEach(i => out(`  [${i.rule}] ${i.message}`));
  }
  if (result.warnings && result.warnings.length > 0) {
    result.warnings.forEach(w => out(`  ⚠️  ${w}`));
  }
}

function parseFrontmatter(content) {
  // Expects content starting with ---\n...\n---
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  const block = content.slice(4, end).trim();
  const result = {};
  for (const line of block.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    result[key] = value;
  }
  return result;
}
