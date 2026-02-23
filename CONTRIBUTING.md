# Contributing to ARIA Superpowers

> 🇧🇷 Lendo em português? Veja o [CONTRIBUTING.pt-br.md](CONTRIBUTING.pt-br.md)

Thanks for your interest! This is a curated collection — not all PRs will be merged, but all ideas are welcome.

## Ways to Contribute

### Submit via the website (no git required)
Visit **[chidekina.github.io/aria-superpowers](https://chidekina.github.io/aria-superpowers/)**, scroll to the bottom, fill the "Submit a skill" form and click "Open on GitHub →". A pre-filled issue will open — just submit it.

### Request a skill
Open a [Skill Request issue](../../issues/new?template=skill-request.yml). Describe the use case and an example prompt.

### Report a bug
Open a [Bug Report issue](../../issues/new?template=bug-report.yml).

### Share your own skills
Use [Discussions](../../discussions) to share skills you've written. Others can use them directly even if they're not merged here.

### Submit a PR
PRs are welcome for:
- Bug fixes in existing skills
- New skills that are broadly useful (not project-specific)
- Improvements to docs or the skill browser

PRs must follow the format in [SKILL_SPEC.md](SKILL_SPEC.md).

## Skill Format

Each skill lives in `skills/<name>/SKILL.md`:

```markdown
---
name: skill-name
description: "One-liner. Triggers on: /command, trigger phrase."
user-invocable: true
tags: [tag1, tag2]
requires: []
---

## Usage
...

## Workflow
...

## Examples
...
```

After creating the skill file, add an entry to `skills.json` at the root:

```json
{
  "name": "skill-name",
  "description": "One-liner description",
  "category": "devops",
  "tags": ["tag1", "tag2"],
  "requires": [],
  "user-invocable": true,
  "trigger": "/skill-name"
}
```

## Review Process

This repo is maintained by one person. PRs may take time to review. Not every skill fits — the bar is: "would most Claude Code users benefit from this?"

## Pre-submit Checklist

- [ ] Folder name matches skill name (kebab-case)
- [ ] File is named exactly `SKILL.md`
- [ ] Frontmatter has `name`, `description`, and `user-invocable`
- [ ] Skill has at least a **Usage** section and an **Example**
- [ ] Entry added to `skills.json`
- [ ] Skill is broadly useful, not project-specific

## Code of Conduct

Be kind. This is a small open-source project made in spare time.
