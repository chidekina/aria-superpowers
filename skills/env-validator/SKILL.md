---
name: env-validator
description: "Validates that all variables declared in .env.example are present and non-empty in .env. Triggers on: validate env, check env, missing env vars, /env-validator."
user-invocable: true
tags: [env, dotenv, devops, cli]
---

# env-validator

Validate that your `.env` file has all the variables declared in `.env.example` before starting the app or running CI/CD pipelines.

---

## Usage

```
/env-validator                        # Validate .env against .env.example
/env-validator --allow-empty          # Accept keys with empty values (KEY=)
/env-validator --no-strict            # Warn only, don't fail the process
/env-validator --env .env.local       # Use a custom .env file
```

---

## Workflow

1. **Read `.env.example`** as the source of truth — every key declared there must exist in `.env`:
   ```bash
   cat .env.example
   ```

2. **Read `.env`** and extract all present keys and values:
   ```bash
   cat .env
   ```

3. **Compare the two files** and identify:
   - Keys **absent** from `.env` → report as missing
   - Keys **present but empty** (`KEY=`) → report as empty (unless `--allow-empty`)
   - Extra keys in `.env` not in `.env.example` → ignore

4. **Report results** clearly:
   - ✅ All keys present and filled → OK
   - ❌ Missing or empty keys → list them with a hint to check `.env.example`

5. **Exit with the correct code:**
   - `0` = OK
   - `1` = missing or empty variables (strict mode)
   - `2` = file not found

---

## Examples

**Prompt:**
> /env-validator

**`.env.example`:**
```
DATABASE_URL=
JWT_SECRET=
API_KEY=
```

**`.env`:**
```
DATABASE_URL=postgres://localhost
JWT_SECRET=minha-senha
```

**Claude will respond:**
```
❌ Variáveis ausentes no .env:
   - API_KEY

   Dica: confira o .env.example e preencha os valores.
```

---

**Prompt:**
> /env-validator --allow-empty

**Claude will respond:**
```
✅ .env está OK — nenhuma variável faltando.
```

---

## Rules

- `.env.example` is always the source of truth — never the other way around
- Keys with empty values (`KEY=`) are invalid by default; use `--allow-empty` to accept them
- Extra keys in `.env` that don't exist in `.env.example` are not an error
- Supports both `UPPER_CASE` and `lower_case` key formats
- Ignores comment lines (`#`) and blank lines
- Supports `export KEY=value` syntax
- Handles Windows-saved files (BOM)