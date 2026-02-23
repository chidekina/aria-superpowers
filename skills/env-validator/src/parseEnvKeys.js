export function parseEnvKeys(fileContent) {
  const content = fileContent.replace(/^\uFEFF/, "");
  const entries = new Map();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const cleaned = line.startsWith("export ") ? line.slice(7).trim() : line;

    const eqIndex = cleaned.indexOf("=");
    if (eqIndex === -1) continue;

    const key = cleaned.slice(0, eqIndex).trim();
    const rawValue = cleaned.slice(eqIndex + 1).trim();

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

    const value = rawValue.replace(/^(["'])(.*)\1$/, "$2");

    entries.set(key, value);
  }

  return entries;
}