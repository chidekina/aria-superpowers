# ⚡ ARIA Superpowers

> Curated Claude Code skills — drop-in behaviors for your AI assistant

**[Browse skills →](https://chidekina.github.io/aria-superpowers)**

Skills extend [Claude Code](https://claude.ai/claude-code) with specialized knowledge and workflows. Drop a skill directory into `~/.claude/skills/` and Claude will use it automatically based on trigger phrases or context.

---

## Install

### Clone and install specific skills (recommended)

```bash
git clone https://github.com/chidekina/aria-superpowers.git
./aria-superpowers/install.sh commit frontend-design react-dev
```

### Install everything

```bash
git clone https://github.com/chidekina/aria-superpowers.git
./aria-superpowers/install.sh
```

Restart Claude Code after installing to activate new skills.

---

## Skills

| Skill | Category | Trigger | Description |
|-------|----------|---------|-------------|
| `commit` | git | `/commit` | Smart commits via Ollama |
| `code-reviewer` | quality | `/code-reviewer` | Structured code review |
| `test-gen` | quality | `/test-gen` | Generate tests from specs |
| `qa` | quality | `/qa` | Playwright smoke testing |
| `prd` | planning | `/prd` | Product requirements docs |
| `spec` | planning | `/spec` | YAML spec from requirements |
| `skill-creator` | planning | `/skill-creator` | Create new skills |
| `frontend-design` | frontend | auto | Production-grade UI |
| `react-dev` | frontend | `/react-dev` | React + TypeScript patterns |
| `shadcn-ui` | frontend | `/shadcn-ui` | shadcn/ui component guide |
| `typescript-advanced-types` | backend | auto | Advanced TS types |
| `api-design-principles` | backend | `/api-design-principles` | REST/GraphQL design |
| `postgresql-table-design` | backend | `/postgresql-table-design` | Schema design |
| `nodejs-backend-patterns` | backend | auto | Node.js production patterns |
| `mcp-builder` | tooling | `/mcp-builder` | Build MCP servers |
| `turborepo` | tooling | auto | Monorepo guidance |
| `pdf` | utilities | `/pdf` | PDF manipulation |
| `pptx` | utilities | `/pptx` | Presentation creation |
| `docx` | utilities | `/docx` | Document creation |
| `webapp-testing` | utilities | `/webapp-testing` | Playwright web testing |
| `token-saver` | utilities | `/token-saver` | Token optimization |

---

## How Skills Work

Claude Code loads `SKILL.md` files from `~/.claude/skills/` at session start. Skills with trigger phrases (e.g. `/commit`) are activated when you type that command. Others activate automatically when the context matches.

See [SKILL_SPEC.md](SKILL_SPEC.md) to write your own skills.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Skill requests via issues, community sharing via Discussions.

---

## License

[CC BY 4.0](LICENSE) — free to use and adapt with attribution.
