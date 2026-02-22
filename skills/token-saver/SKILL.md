---
name: token-saver
description: "Token optimization guide for Claude Code. This skill should be used when the user wants to reduce API costs, learn model routing strategies, or understand how to use free/cheaper tools (Ollama, Haiku) instead of burning expensive Claude tokens on routine tasks. Triggers on: save tokens, reduce costs, token tips, cheap claude, model routing, ollama setup, token optimization."
---

# Token Saver — Claude Code Cost Optimization

## Overview

A routing and habits guide to cut Claude API costs. The core idea: match the tool to the task — use free/cheap tools for simple work, and reserve expensive models for genuinely hard problems.

---

## Quick Reference

```
FREE    → Ollama  (commits, summaries, translations, explanations)
CHEAP   → Haiku   (quick lookups, simple one-liners)
DEFAULT → Sonnet  (daily coding, features, bugs)
DEEP    → Opus    (architecture, security, complex refactors only)
```

---

## Tier 0 — Ollama (FREE, runs locally)

Install once, zero API cost forever.

**Setup:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b
```

**Always route these to Ollama:**

| Task | Command |
|------|---------|
| Commit message | `ollama run llama3.2:3b "write a conventional commit for: <diff>"` |
| Summarize text | `ollama run llama3.2:3b "summarize: <text>"` |
| Translate PT↔EN | `ollama run llama3.2:3b "translate to english: <text>"` |
| Explain a function | `ollama run llama3.2:3b "explain this code: <snippet>"` |
| PR description | `ollama run llama3.2:3b "write a PR description for: <summary>"` |
| Classify text | `ollama run llama3.2:3b "classify as bug/feature/chore: <text>"` |

**Rule:** No deep reasoning needed + short output = Ollama.

---

## Tier 1 — Haiku (Cheapest Claude)

```bash
/model claude-haiku-4-5-20251001
```

**Good for:** Simple lookups, yes/no questions, short edits with clear instructions, quick one-liners.

---

## Tier 2 — Sonnet (Default)

```bash
/model claude-sonnet-4-6
```

**Good for:** Feature implementation, bug fixes, code reviews, most daily coding tasks. Stay here unless stuck.

---

## Tier 3 — Opus (Use Sparingly)

```bash
/model claude-opus-4-6
```

**Good for:** System architecture, security audits, complex multi-system refactors.
**Not for:** Anything Sonnet handles on the first try.

---

## Read Code Surgically

Every line loaded into context costs tokens.

| Instead of | Do this |
|-----------|---------|
| "Read this file and find the auth logic" | "Find the `authenticate` function in `auth.service.ts`" |
| "Look at the whole component" | "Show me just the `useEffect` hooks in `Dashboard.tsx`" |
| Opening a 500-line file | Grep for the symbol first, then read only that block |

---

## Scope Requests Tightly

Bundling tasks inflates both input and output tokens.

**Instead of:** "Fix this bug, refactor the function, add tests, and update the docs"
**Do:** Fix the bug → commit → then ask for the next thing separately.

---

## Stop Retry Loops Early

Re-running the same failing prompt 5 times multiplies cost with no gain.

- Stop after 2 failed attempts
- Rethink the approach or ask a more specific question
- A different angle costs fewer tokens than brute-forcing the same one

---

## Biggest Wins (in order)

1. **Move commits/translations/summaries to Ollama** — these are 100% free
2. **Stay on Sonnet** — don't upgrade to Opus by default
3. **Read functions, not files** — surgical reads cut context size dramatically
4. **One task per prompt** — smaller prompts, smaller responses
