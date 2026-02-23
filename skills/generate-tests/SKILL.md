````md
# name: generate-tests

# description: 
Auto-generate Jest/Vitest test files with intelligent coverage and mock detection.  

# tags:
Triggers on: generate tests, create tests, test this file, /test.  

**user-invocable:** true

---

# Generate Tests

Generate robust unit or integration tests for JavaScript and TypeScript projects using local LLM (Ollama or MCP tools). Automatically detects async functions, edge cases, and external dependencies.

---

# Usage

```bash
/test src/userService.ts
/test src/userService.ts --framework jest
/test src/userService.ts --framework vitest
/test src/userService.ts --integration
/test src/userService.ts --coverage 80
/test src/userService.ts --watch
````

## Options

* `--framework jest|vitest` (default: auto-detect)
* `--integration` → generate integration tests
* `--unit` → generate unit tests (default)
* `--coverage <n>` → target minimum coverage %
* `--write` → auto-create test file
* `--watch` → run test after generation
* `--report` → return JSON metadata report

---

# Workflow

## 1️⃣ Read Source File

```bash
cat <file>
```

Extract:

* Exported functions/classes
* Async functions
* Thrown errors
* External dependencies (axios, fetch, fs, db, env, etc.)

---

## 2️⃣ Analyze Dependencies

If external dependencies are detected:

* Generate mocks
* Stub environment variables
* Mock repositories/services

---

## 3️⃣ Generate Test Structure

Rules:

* One `describe` block per export
* Cover:

  * Happy path
  * Invalid parameters
  * Edge cases
  * Exception paths
  * Async rejection cases
* No redundant tests
* Clean naming

---

## 4️⃣ Output Preview

Show generated test file:

```ts
// userService.test.ts
```

Ask for confirmation if `--write` not passed.

---

## 5️⃣ Write File (if confirmed or --write)

Example:

```bash
touch src/__tests__/userService.test.ts
```

Write generated content.

---

## 6️⃣ Run Tests (optional)

If `--watch`:

```bash
npm test
```

If coverage < target:

1. Re-analyze uncovered branches
2. Generate missing tests
3. Repeat cycle (max 3 iterations)

---

# Test File Naming Convention

| Source           | Output                          |
| ---------------- | ------------------------------- |
| userService.ts   | userService.test.ts             |
| auth.js          | auth.test.js                    |
| services/user.ts | services/**tests**/user.test.ts |

---

# Test Format

## Default (Jest/Vitest)

```ts
import { functionName } from "./functionName"

describe("functionName", () => {
  it("should return expected result for valid input", () => {
    ...
  })

  it("should throw error for invalid input", () => {
    ...
  })

  it("should handle edge cases", () => {
    ...
  })
})
```

---

# Async Example

If async detected:

```ts
it("should resolve with correct data", async () => {
  await expect(getUser("123")).resolves.toEqual(...)
})

it("should reject when repository fails", async () => {
  await expect(getUser("123")).rejects.toThrow()
})
```

---

# Mock Strategy

Auto-mock when detecting:

* axios
* fetch
* fs
* database repositories
* crypto
* external services

## Example (Vitest)

```ts
vi.mock("../repository/userRepository")
```

## Example (Jest)

```ts
jest.mock("../repository/userRepository")
```

---

# Coverage Rules

If `--coverage 80`:

1. Run coverage
2. Parse output
3. Identify uncovered lines
4. Generate additional edge tests
5. Re-run (max 3 loops)

---

# Output Modes

## Default

Print generated test file.

## With `--write`

Create file automatically.

## With `--report`

Return JSON metadata:

```json
{
  "exportsDetected": ["getUser", "createUser"],
  "asyncFunctions": ["getUser"],
  "mocksGenerated": ["userRepository"],
  "estimatedCoverage": 85
}
```

---

# Tool Priority

1. `mcp__aria__generate_tests` (preferred)
2. `mcp__ollama__generate_tests`
3. Local Ollama direct prompt
4. Manual fallback template

---

# Integration with CLI

Equivalent AC CLI command:

```bash
ac test src/userService.ts
ac test src/userService.ts --coverage 85
```

Can also bind to lazygit custom command.

---

# Internal Prompt Template

```text
You are a senior JavaScript/TypeScript test engineer.

Goal:
Generate robust {framework} tests.

Requirements:
- Cover all exported members
- Include happy path, edge cases, invalid inputs
- Mock external dependencies
- Use async testing correctly
- Avoid redundant tests
- Maintain clean structure

Return only the test file code.
```

---

# Intelligent Behaviors

* Detects if file already has tests → suggest improvements
* Detects trivial functions → generate minimal tests
* Detects pure functions → avoid unnecessary mocks
* Detects controller layer → suggest integration mode

---

# Notes

* Works fully offline with Ollama
* No API cost
* Avoids generating snapshot tests by default
* First describe block always matches filename
* Compatible with TypeScript strict mode

```

---

Se quiser, posso agora gerar:

- A versão `.json` para registrar como skill MCP  
- A implementação base em TypeScript  
- O esqueleto da CLI funcional  
- O modo autônomo com loop de cobertura  

Qual o próximo passo da arquitetura?
```
