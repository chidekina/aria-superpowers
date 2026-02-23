# Skill Specification

Skills are Markdown files that extend Claude Code with specialized knowledge and workflows.

## File Format

Each skill lives in its own directory: `skills/<name>/SKILL.md`

### Required Frontmatter

```markdown
---
name: skill-name
description: "One-liner description. Triggers on: example phrase, /command."
user-invocable: true|false
---
```

### Optional Frontmatter

```markdown
requires: [ollama, playwright]   # external tools needed
tags: [git, automation]          # for skills.json registry
```

### Sections (recommended)

- **Overview** — what the skill does and when to use it
- **Usage** — commands or trigger phrases
- **Workflow** — step-by-step process
- **Examples** — concrete prompts and outputs

## Naming Conventions

- Directory name = skill name (kebab-case)
- File always named `SKILL.md`
- Trigger phrases in description after "Triggers on:"
- User-invocable skills must start with `/` trigger

## Good Skill Design

- Focused on one task — don't bundle unrelated behaviors
- Explicit about what tools it needs (Bash, MCP servers, etc.)
- Includes concrete examples, not abstract descriptions
- Works offline unless `requires` lists a service

# Designer
- The Designer is an agent focused on creating responsive interfaces for mobile, tablet and desktop, following conventional commit messaging standards.
- It integrates practices with Git and TailwindCSS, facilitating the automation of commits through the /commit command, ensuring organization and standardization in the development flow.

# Zod Types Provider

Zod Types Provider is a module aimed at validation and backend typing using TypeScript. It applies validations with Zod, works with conditional data and mapped types, promoting greater security, consistency and predictability in the structure of application data.