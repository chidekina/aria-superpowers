---
name: commit
description: "Smart commit with Ollama-generated messages. Conventional commits, auto-push option. Triggers on: commit this, commit changes, smart commit, /commit."
user-invocable: true
---

# Smart Commit

Generate conventional commit messages using local Ollama (free, no API tokens).

---

## Usage

```
/commit                    # Generate message from staged changes
/commit --push             # Commit and push
/commit --all              # Stage all changes first
/commit --style simple     # Simple style (not conventional)
```

---

## Workflow

1. **Check staged changes:**
   ```bash
   git diff --cached --stat
   ```

2. **Generate message:**
   Use `aria_commit_message` (ARIA MCP) or fallback to `ollama_commit_message`.

3. **Present and confirm:**
   Show generated message, ask for edits.

4. **Commit:**
   ```bash
   git commit -m "<message>

   Co-Authored-By: Ollama <local@ollama.ai>"
   ```

5. **Push (if --push):**
   ```bash
   git push origin HEAD
   ```

---

## Message Format

### Conventional Commits (default)
```
<type>(<scope>): <description>

<body>

Co-Authored-By: Ollama <local@ollama.ai>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

### Simple Style
```
<description>

<body>
```

---

## Examples

```bash
/commit
# → feat(auth): add JWT token refresh endpoint
#
#   - Added refresh token validation
#   - Updated user session handling
#   - Added tests for token expiry

/commit --push
# Same as above, then pushes to origin

/commit --all
# Stages all changes first: git add -A
```

---

## Tool Priority

1. `mcp__aria__aria_commit_message` (ARIA MCP - preferred)
2. `mcp__ollama__ollama_commit_message` (Ollama MCP - fallback)
3. Manual generation (if both unavailable)

---

## Integration with lazygit

AC CLI's `qcommit` command uses the same logic:
```bash
ac qcommit        # Same as /commit
ac qcommit --push # Same as /commit --push
```

Lazygit keybinding `A` also triggers this.

---

## Notes

- First line always under 72 characters
- Large diffs (>4000 chars) are summarized
- Uses local Ollama = zero API cost
- Co-Authored-By identifies AI-generated messages
