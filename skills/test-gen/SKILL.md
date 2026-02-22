---
name: test-gen
description: "Generate test cases from type constraints and specs. Creates boundary tests, edge cases, and fixtures automatically. Pact-lang inspired. Triggers on: generate tests, test from spec, create fixtures, boundary tests."
user-invocable: true
---

# Test Generator (Pact-lang Inspired)

Automatically generates test cases from type constraints and YAML specs.

---

## The Value

Instead of manually writing tests for every edge case, declare constraints once and get:
- **Boundary tests** (min/max values)
- **Format tests** (email, UUID, etc.)
- **Edge cases** (empty, null, very long)
- **Happy path fixtures**
- **Error scenario tests**

---

## Usage

```
/test-gen                           # Auto-detect spec and generate tests
/test-gen tasks/spec-auth.yaml      # Generate from specific spec
/test-gen --type User               # Generate tests for a specific type
/test-gen --endpoint createUser     # Generate tests for an endpoint
/test-gen --fixtures                # Generate only fixtures, no tests
```

---

## From Constraints to Tests

### Field Constraints → Test Cases

| Constraint | Generated Tests |
|------------|-----------------|
| `minLen: 1` | Empty string should fail |
| `maxLen: 200` | 201 chars should fail, 200 should pass |
| `format: email` | Invalid email should fail, valid should pass |
| `unique: true` | Duplicate should fail with CONFLICT |
| `required: true` | Missing field should fail with VALIDATION_ERROR |

### Example Transformation

**Spec:**
```yaml
types:
  User:
    fields:
      email:
        type: String
        format: email
        unique: true
        constraints:
          - minLen: 5
          - maxLen: 255
      password:
        type: String
        constraints:
          - minLen: 8
          - maxLen: 100
```

**Generated Tests:**
```typescript
describe('User validation', () => {
  // Email tests
  describe('email field', () => {
    it('should reject empty email', async () => {
      const result = await createUser({ email: '', password: 'valid123' })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should reject email shorter than 5 chars', async () => {
      const result = await createUser({ email: 'a@b', password: 'valid123' })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should reject email longer than 255 chars', async () => {
      const longEmail = 'a'.repeat(250) + '@test.com'
      const result = await createUser({ email: longEmail, password: 'valid123' })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should reject invalid email format', async () => {
      const result = await createUser({ email: 'not-an-email', password: 'valid123' })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should reject duplicate email', async () => {
      await createUser({ email: 'test@example.com', password: 'valid123' })
      const result = await createUser({ email: 'test@example.com', password: 'other456' })
      expect(result.error.code).toBe('CONFLICT')
    })

    it('should accept valid email', async () => {
      const result = await createUser({ email: 'valid@example.com', password: 'valid123' })
      expect(result.ok).toBe(true)
    })
  })

  // Password tests
  describe('password field', () => {
    it('should reject password shorter than 8 chars', async () => {
      const result = await createUser({ email: 'test@example.com', password: 'short' })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should reject password longer than 100 chars', async () => {
      const longPass = 'a'.repeat(101)
      const result = await createUser({ email: 'test@example.com', password: longPass })
      expect(result.error.code).toBe('VALIDATION_ERROR')
    })

    it('should accept valid password', async () => {
      const result = await createUser({ email: 'test@example.com', password: 'validpassword123' })
      expect(result.ok).toBe(true)
    })
  })
})
```

---

## Fixture Generation

Generate valid test fixtures that satisfy all constraints:

```typescript
// fixtures/user.fixtures.ts
export const validUser = {
  email: 'test.user@example.com',
  password: 'SecurePass123!',
  name: 'Test User',
}

export const minimalUser = {
  email: 'a@b.co',  // 5 chars minimum
  password: 'Pass1234',  // 8 chars minimum
}

export const maximalUser = {
  email: 'a'.repeat(240) + '@example.com',  // Near 255 limit
  password: 'a'.repeat(100),  // At 100 limit
}

export const invalidUsers = {
  emptyEmail: { email: '', password: 'valid123' },
  shortEmail: { email: 'a@b', password: 'valid123' },
  invalidEmail: { email: 'not-an-email', password: 'valid123' },
  shortPassword: { email: 'test@example.com', password: 'short' },
  missingEmail: { password: 'valid123' },
  missingPassword: { email: 'test@example.com' },
}
```

---

## From Endpoint Outputs → Error Tests

**Spec:**
```yaml
endpoints:
  createUser:
    isTotal: true
    outputs:
      - status: 201, type: ok, returns: User
      - status: 400, type: err, code: VALIDATION_ERROR
      - status: 409, type: err, code: CONFLICT
      - status: 500, type: err, code: INTERNAL_ERROR
```

**Generated Tests:**
```typescript
describe('createUser endpoint', () => {
  it('should return 201 on success', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(validUser)
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
  })

  it('should return 400 VALIDATION_ERROR for invalid input', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'invalid' })
    expect(response.status).toBe(400)
    expect(response.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('should return 409 CONFLICT for duplicate', async () => {
    await createUser(validUser)
    const response = await request(app)
      .post('/api/users')
      .send(validUser)
    expect(response.status).toBe(409)
    expect(response.body.error.code).toBe('CONFLICT')
  })

  // Note: INTERNAL_ERROR is hard to test, mark as manual
  it.todo('should handle 500 INTERNAL_ERROR gracefully')
})
```

---

## Output Structure

```
tests/
├── unit/
│   └── {type}.test.ts          # Field validation tests
├── integration/
│   └── {endpoint}.test.ts      # API endpoint tests
├── fixtures/
│   └── {type}.fixtures.ts      # Valid/invalid test data
└── generated-tests-report.md   # Summary of what was generated
```

---

## Test Report

```markdown
# Generated Tests Report

## Source: tasks/spec-auth.yaml

### Types Covered
- User: 12 tests (6 email, 4 password, 2 integration)
- Session: 8 tests (4 token, 4 expiry)

### Endpoints Covered
- POST /api/users: 4 tests (all outputs covered)
- GET /api/users/:id: 3 tests (all outputs covered)

### Test Coverage by Constraint
| Constraint | Type | Tests Generated |
|------------|------|-----------------|
| minLen | email | 2 |
| maxLen | email | 1 |
| format:email | email | 2 |
| unique | email | 1 |
| minLen | password | 2 |
| maxLen | password | 1 |

### Manual Tests Required
- [ ] INTERNAL_ERROR scenarios (require mocking)
- [ ] Rate limiting tests
- [ ] Concurrent duplicate detection
```

---

## Integration with Ralph

Add to prd.json acceptance criteria automatically:

```json
{
  "id": "US-001",
  "title": "Add User registration",
  "acceptanceCriteria": [
    "POST /api/users accepts email, password",
    "Returns 201 with User on success",
    "Returns 400 for invalid email format",
    "Returns 400 for password < 8 chars",
    "Returns 409 for duplicate email",
    "Generated tests pass: pnpm test tests/integration/createUser.test.ts",
    "Typecheck passes"
  ]
}
```

---

## Automation

### Auto-run after /spec

```bash
# In /spec skill, add at the end:
echo "Run /test-gen to generate test cases from this spec"
```

### Ralph Integration

```bash
# ralph preflight could include:
test_coverage_check() {
  local spec_file=$(ls tasks/spec-*.yaml 2>/dev/null | head -1)
  if [ -n "$spec_file" ]; then
    local test_count=$(find tests -name "*.test.ts" | wc -l)
    if [ "$test_count" -eq 0 ]; then
      echo "⚠ No tests found. Run /test-gen to generate from spec."
    fi
  fi
}
```

### CI Integration

```yaml
# .github/workflows/test.yml
- name: Generate tests from spec
  run: claude --print "/test-gen tasks/spec-*.yaml --check"

- name: Run generated tests
  run: pnpm test
```

---

## ARIA MCP Tool

```typescript
{
  name: "aria_generate_tests",
  description: "Generate test cases from YAML spec constraints",
  inputSchema: {
    type: "object",
    properties: {
      specPath: { type: "string", description: "Path to spec YAML" },
      outputDir: { type: "string", description: "Test output directory" },
      type: { type: "string", description: "Specific type to test" },
      endpoint: { type: "string", description: "Specific endpoint to test" },
      fixturesOnly: { type: "boolean", description: "Generate only fixtures" }
    },
    required: ["specPath"]
  }
}
```
