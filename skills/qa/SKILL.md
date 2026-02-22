---
name: qa
description: QA Specialist Agent for smoke testing production deployments. Runs Playwright-based smoke tests against live URLs to verify health, auth flows, protected routes, and core UI. Use when validating a deploy, checking if a production app is working, or when asked to run QA on a project.
---

# QA Specialist Agent

Runs automated smoke tests against production (or staging) URLs using Playwright.

## Playwright Setup

Use the bundled `scripts/smoke_test.py`. Always run with `--help` first:

```bash
~/.local/share/pipx/venvs/playwright/bin/python ~/.claude/skills/qa/scripts/smoke_test.py --help
```

If playwright isn't installed:
```bash
pipx install playwright && playwright install chromium
```

## Known Projects

| Command | URL | Auth |
|---------|-----|------|
| `/qa pilot` | https://pilot.aethostech.com.br | Google OAuth |
| `/qa menthos` | https://menthos.aethostech.com.br | Email + Magic Link |
| `/qa hub` | https://hub-phi-six.vercel.app | Email/Password |
| `/qa coda` | https://coda-ce.com.br (check VPS) | — |

## Workflow

### 1. Identify target
- `/qa <project>` → use known project URL above
- `/qa <url>` → use URL directly
- No argument → ask which project

### 2. Run smoke test script
```bash
~/.local/share/pipx/venvs/playwright/bin/python \
  ~/.claude/skills/qa/scripts/smoke_test.py \
  --url <URL> \
  --project <name> \
  --auth <google|email|none>
```

### 3. Interpret results
- Show pass/fail per check with emoji (✅ / ❌ / ⚠️)
- Display screenshots paths
- If failures: diagnose root cause (logs, network errors)
- If all pass: confirm deploy is healthy

## Test Suite (per project)

### Smoke Tests (always run)
1. **Health check** — `GET /api/health` returns 200
2. **Homepage loads** — page title present, no JS errors
3. **Login page** — `/login` renders correctly
4. **Auth button** — OAuth/email button present and clickable
5. **OAuth redirect** — clicking triggers correct redirect (Google/email)
6. **Protected route** — `/dashboard` redirects to login when unauthenticated

### Extended Tests (on request)
- Form submission flows
- API endpoint responses
- Mobile viewport rendering
- Performance (load time < 3s)

## Output Format

```
🧪 QA Smoke Test — pilot.aethostech.com.br
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Health check        GET /api/health → 200
✅ Homepage            Title: "Aethos Pilot — Co-piloto para reviews do Google"
✅ Login page          /login → 200, rendered
✅ Google OAuth btn    "Entrar com Google" found
✅ OAuth redirect      → accounts.google.com ✓
✅ Protected route     /dashboard → redirects to /login ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6/6 passed | 0 failed | Screenshots: /tmp/qa-pilot-2026-02-22/
```

## Integration with Deploy

After a successful deploy, suggest running `/qa <project>` as final validation step.
If any test fails post-deploy, immediately flag as regression.

## Diagnosing Failures

- **Health 404/500** → app crashed or route missing, check `docker logs`
- **Login page blank** → JS bundle error, check browser console output
- **OAuth button missing** → env vars not loaded (GOOGLE_CLIENT_ID missing)
- **OAuth redirect wrong URL** → BETTER_AUTH_URL / NEXTAUTH_URL misconfigured
- **Protected route not redirecting** → middleware broken, check `middleware.ts`
