import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseEnvKeys } from "../src/parseEnvKeys.js";

describe("parseEnvKeys", () => {
  it("parses basic KEY=VALUE pairs", () => {
    const result = parseEnvKeys("FOO=bar\nBAZ=qux");
    assert.equal(result.get("FOO"), "bar");
    assert.equal(result.get("BAZ"), "qux");
  });

  it("accepts lowercase keys", () => {
    const result = parseEnvKeys("database_url=postgres://localhost");
    assert.ok(result.has("database_url"));
  });

  it("accepts mixed case keys", () => {
    const result = parseEnvKeys("MyKey=value");
    assert.ok(result.has("MyKey"));
  });

  it("ignores comment lines", () => {
    const result = parseEnvKeys("# this is a comment\nFOO=bar");
    assert.ok(!result.has("# this is a comment"));
    assert.ok(result.has("FOO"));
  });

  it("ignores blank lines", () => {
    const result = parseEnvKeys("\n\nFOO=bar\n\n");
    assert.equal(result.size, 1);
  });

  it("handles export prefix", () => {
    const result = parseEnvKeys("export SECRET=abc123");
    assert.equal(result.get("SECRET"), "abc123");
  });

  it("strips double quotes from values", () => {
    const result = parseEnvKeys(`FOO="hello world"`);
    assert.equal(result.get("FOO"), "hello world");
  });

  it("strips single quotes from values", () => {
    const result = parseEnvKeys(`FOO='hello world'`);
    assert.equal(result.get("FOO"), "hello world");
  });

  it("stores empty string for KEY=", () => {
    const result = parseEnvKeys("EMPTY=");
    assert.ok(result.has("EMPTY"));
    assert.equal(result.get("EMPTY"), "");
  });

  it("removes BOM from start of content", () => {
    const result = parseEnvKeys("\uFEFFFOO=bar");
    assert.ok(result.has("FOO"));
  });

  it("ignores keys with invalid characters", () => {
    const result = parseEnvKeys("123INVALID=val\nVALID=ok");
    assert.ok(!result.has("123INVALID"));
    assert.ok(result.has("VALID"));
  });

  it("handles CRLF line endings", () => {
    const result = parseEnvKeys("FOO=bar\r\nBAZ=qux");
    assert.ok(result.has("FOO"));
    assert.ok(result.has("BAZ"));
  });
});

// tests/parseEnvKeys.test.js
// Run with: node --test tests/parseEnvKeys.test.js