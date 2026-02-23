import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkEnv } from "../src/index.js";

// ─── Helper: create a temp dir with .env and .env.example ────────────────────

function makeTempDir(files = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "env-validator-test-"));
  for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, filename), content, "utf8");
  }
  return dir;
}

describe("checkEnv", () => {
  let tmpDir;

  afterEach(() => {
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns ok=true when all keys are present", () => {
    tmpDir = makeTempDir({
      ".env.example": "FOO=\nBAR=",
      ".env":         "FOO=hello\nBAR=world",
    });
    const result = checkEnv({ cwd: tmpDir });
    assert.equal(result.ok, true);
    assert.equal(result.code, 0);
    assert.deepEqual(result.missing, []);
    assert.deepEqual(result.empty, []);
  });

  it("returns missing keys when .env is incomplete", () => {
    tmpDir = makeTempDir({
      ".env.example": "FOO=\nBAR=\nBAZ=",
      ".env":         "FOO=hello",
    });
    const result = checkEnv({ cwd: tmpDir });
    assert.equal(result.ok, false);
    assert.equal(result.code, 1);
    assert.ok(result.missing.includes("BAR"));
    assert.ok(result.missing.includes("BAZ"));
  });

  it("detects empty values in strict mode (allowEmpty=false)", () => {
    tmpDir = makeTempDir({
      ".env.example": "SECRET=",
      ".env":         "SECRET=",
    });
    const result = checkEnv({ cwd: tmpDir, allowEmpty: false });
    assert.equal(result.ok, false);
    assert.ok(result.empty.includes("SECRET"));
  });

  it("accepts empty values when allowEmpty=true", () => {
    tmpDir = makeTempDir({
      ".env.example": "SECRET=",
      ".env":         "SECRET=",
    });
    const result = checkEnv({ cwd: tmpDir, allowEmpty: true });
    assert.equal(result.ok, true);
    assert.equal(result.code, 0);
  });

  it("returns ok=true with code=0 when strict=false, even with missing vars", () => {
    tmpDir = makeTempDir({
      ".env.example": "FOO=\nBAR=",
      ".env":         "FOO=hello",
    });
    const result = checkEnv({ cwd: tmpDir, strict: false });
    assert.equal(result.ok, true);
    assert.equal(result.code, 0);
    assert.ok(result.missing.includes("BAR"));
  });

  it("returns code=2 when .env.example is missing", () => {
    tmpDir = makeTempDir({ ".env": "FOO=bar" });
    const result = checkEnv({ cwd: tmpDir });
    assert.equal(result.code, 2);
  });

  it("returns code=2 when .env is missing", () => {
    tmpDir = makeTempDir({ ".env.example": "FOO=" });
    const result = checkEnv({ cwd: tmpDir });
    assert.equal(result.code, 2);
  });

  it("supports lowercase keys", () => {
    tmpDir = makeTempDir({
      ".env.example": "database_url=",
      ".env":         "database_url=postgres://localhost",
    });
    const result = checkEnv({ cwd: tmpDir });
    assert.equal(result.ok, true);
  });

  it("uses custom envPath and examplePath", () => {
    tmpDir = makeTempDir({
      ".env.production.example": "API_KEY=",
      ".env.production":         "API_KEY=secret",
    });
    const result = checkEnv({
      cwd: tmpDir,
      envPath: ".env.production",
      examplePath: ".env.production.example",
    });
    assert.equal(result.ok, true);
  });
});

// tests/checkEnv.test.js
// Run with: node --test tests/checkEnv.test.js