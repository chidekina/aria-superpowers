import fs from "node:fs";
import path from "node:path";
import { parseEnvKeys } from "./parseEnvKeys.js";

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function checkEnv({
  cwd = process.cwd(),
  envPath = ".env",
  examplePath = ".env.example",
  strict = true,
  allowEmpty = false,
} = {}) {
  const fullEnvPath = path.resolve(cwd, envPath);
  const fullExamplePath = path.resolve(cwd, examplePath);

  const exampleContent = readFileSafe(fullExamplePath);
  if (exampleContent === null) {
    return {
      ok: false,
      missing: [],
      empty: [],
      message: `❌ Arquivo não encontrado: ${examplePath} (em ${cwd})`,
      code: 2,
    };
  }

  const envContent = readFileSafe(fullEnvPath);
  if (envContent === null) {
    return {
      ok: false,
      missing: [],
      empty: [],
      message: `❌ Arquivo não encontrado: ${envPath} (em ${cwd})\n   Dica: copie ${examplePath} e preencha os valores.`,
      code: 2,
    };
  }

  const expected = parseEnvKeys(exampleContent);
  const actual = parseEnvKeys(envContent);

  const missing = [];
  const empty = [];

  for (const [key] of expected) {
    if (!actual.has(key)) {
      missing.push(key);
    } else if (!allowEmpty && actual.get(key) === "") {
      empty.push(key);
    }
  }

  const hasIssues = missing.length > 0 || empty.length > 0;
  const ok = !hasIssues || !strict;
  const code = hasIssues && strict ? 1 : 0;

  if (!hasIssues) {
    return {
      ok: true,
      missing: [],
      empty: [],
      message: `✅ ${envPath} está OK — nenhuma variável faltando.`,
      code: 0,
    };
  }

  const lines = [];

  if (missing.length > 0) {
    lines.push(`❌ Variáveis ausentes no ${envPath}:`);
    missing.forEach((k) => lines.push(`   - ${k}`));
  }

  if (empty.length > 0) {
    lines.push(`⚠️  Variáveis sem valor no ${envPath}:`);
    empty.forEach((k) => lines.push(`   - ${k}`));
  }

  lines.push(`\n   Dica: confira o ${examplePath} e preencha os valores.`);

  return { ok, missing, empty, message: lines.join("\n"), code };
}