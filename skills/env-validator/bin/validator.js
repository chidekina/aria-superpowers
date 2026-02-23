#!/usr/bin/env node
import { parseArgs } from "node:util";
import { checkEnv } from "../src/index.js";

let values, positionals;

try {
  ({ values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      env:          { type: "string",  short: "e", default: ".env" },
      example:      { type: "string",  short: "x", default: ".env.example" },
      "no-strict":  { type: "boolean",             default: false },
      "allow-empty":{ type: "boolean",             default: false },
      json:         { type: "boolean", short: "j", default: false },
      help:         { type: "boolean", short: "h", default: false },
    },
  }));
} catch (err) {
  console.error(`Erro nos argumentos: ${err.message}`);
  printHelp();
  process.exit(2);
}

if (values.help) {
  printHelp();
  process.exit(0);
}

const cmd = positionals[0] ?? "check";

if (cmd !== "check") {
  console.error(`Comando desconhecido: "${cmd}"`);
  printHelp();
  process.exit(2);
}

const result = checkEnv({
  envPath:     values.env,
  examplePath: values.example,
  strict:      !values["no-strict"],
  allowEmpty:  values["allow-empty"],
});

if (values.json) {
  const { message: _message, ...jsonResult } = result;
  console.log(JSON.stringify(jsonResult, null, 2));
} else {
  console.log(result.message);
}

process.exit(result.code);

function printHelp() {
  console.log(`
Uso: env-validator check [opções]

Opções:
  -e, --env <path>       Caminho do arquivo .env          (padrão: .env)
  -x, --example <path>   Caminho do arquivo .env.example  (padrão: .env.example)
      --no-strict        Não falha o processo se houver variáveis faltando
      --allow-empty      Aceita chaves com valor vazio (KEY=)
  -j, --json             Saída em JSON (para uso em scripts/CI)
  -h, --help             Exibe esta ajuda

Exit codes:
  0  Tudo OK
  1  Variáveis faltando ou vazias (apenas no modo strict)
  2  Erro de uso ou arquivo não encontrado

Exemplos:
  env-validator check
  env-validator check --env .env.local --example .env.example
  env-validator check --json
  env-validator check --no-strict
  env-validator check --allow-empty
`);
}