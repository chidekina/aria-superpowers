# env-validator

CLI para validar arquivos `.env` contra um `.env.example`, garantindo que nenhuma variável de ambiente obrigatória esteja faltando ou vazia antes de iniciar a aplicação ou rodar um pipeline de CI/CD.

---

## Sumário

- [Instalação](#instalação)
- [Como funciona](#como-funciona)
- [Uso](#uso)
- [Opções](#opções)
- [Exit Codes](#exit-codes)
- [Integração com CI/CD](#integração-com-cicd)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Decisões técnicas](#decisões-técnicas)
- [Requisitos](#requisitos)

---

## Instalação

### Via npm link (desenvolvimento local)

```bash
git clone https://github.com/cilosjenny/aria-superpowers.git
cd aria-superpowers/skills/env-validator
npm install
npm link
```

### Via npx (sem instalar globalmente)

```bash
npx env-validator check
```

---

## Como funciona

O `env-validator` lê o `.env.example` como fonte da verdade — todas as chaves declaradas nele devem existir no `.env`. A comparação considera:

- Chaves **ausentes** no `.env` → erro
- Chaves **presentes mas sem valor** (`KEY=`) → erro (a menos que `--allow-empty` seja passado)
- Chaves extras no `.env` que não estão no `.env.example` → ignoradas (não é erro)

### O que o parser entende

| Formato                  | Suportado |
|--------------------------|-----------|
| `KEY=value`              | ✅        |
| `KEY="valor com espaços"`| ✅        |
| `KEY='valor com espaços'`| ✅        |
| `export KEY=value`       | ✅        |
| `# comentário`           | ✅ (ignorado) |
| Linhas em branco         | ✅ (ignoradas) |
| Chaves UPPER_CASE        | ✅        |
| Chaves lower_case        | ✅        |
| Arquivos salvos no Windows (BOM) | ✅ |

---

## Uso

```bash
# Validação básica (usa .env e .env.example no diretório atual)
env-validator check

# Arquivos customizados
env-validator check --env .env.local --example .env.example

# Saída em JSON (para scripts e pipelines)
env-validator check --json

# Não falha o processo, apenas avisa
env-validator check --no-strict

# Aceita variáveis com valor vazio (KEY=)
env-validator check --allow-empty

# Exibe ajuda
env-validator --help
```

### Exemplo de saída (sucesso)

```
✅ .env está OK — nenhuma variável faltando.
```

### Exemplo de saída (erro)

```
❌ Variáveis ausentes no .env:
   - DATABASE_URL
   - JWT_SECRET

⚠️  Variáveis sem valor no .env:
   - API_KEY

   Dica: confira o .env.example e preencha os valores.
```

### Exemplo de saída em JSON

```json
{
  "ok": false,
  "missing": ["DATABASE_URL"],
  "empty": ["API_KEY"],
  "code": 1
}
```

---

## Opções

| Flag                   | Alias | Tipo    | Padrão         | Descrição                                              |
|------------------------|-------|---------|----------------|--------------------------------------------------------|
| `--env <path>`         | `-e`  | string  | `.env`         | Caminho do arquivo `.env` a ser validado               |
| `--example <path>`     | `-x`  | string  | `.env.example` | Caminho do arquivo de referência                       |
| `--no-strict`          | —     | boolean | `false`        | Avisa sobre problemas mas não falha o processo (código 0) |
| `--allow-empty`        | —     | boolean | `false`        | Aceita chaves com valor vazio (`KEY=`)                 |
| `--json`               | `-j`  | boolean | `false`        | Saída em JSON (sem a mensagem humanizada)              |
| `--help`               | `-h`  | boolean | `false`        | Exibe a ajuda                                          |

---

## Exit Codes

| Código | Significado                                               |
|--------|-----------------------------------------------------------|
| `0`    | Tudo OK — CI passa                                        |
| `1`    | Variáveis faltando ou vazias (modo `strict`, padrão)      |
| `2`    | Erro de uso ou arquivo não encontrado                     |

---

## Integração com CI/CD

### npm scripts (prestart / prebuild)

Adicione ao `package.json` do projeto que consome o validator:

```json
{
  "scripts": {
    "prestart": "env-validator check",
    "prebuild": "env-validator check"
  }
}
```

O npm executa automaticamente scripts com prefixo `pre` antes do comando principal. Se o validator falhar, o `start` ou `build` não chega a rodar.

### GitHub Actions

```yaml
- name: Validate environment variables
  run: env-validator check --env .env.ci --example .env.example
```

### Saída em JSON para pipelines mais complexos

```bash
result=$(env-validator check --json)
missing=$(echo "$result" | jq '.missing[]')
echo "Variáveis faltando: $missing"
```

---

## Estrutura do projeto

```
env-validator/
├── bin/
│   └── validator.js          # Ponto de entrada da CLI
├── src/
│   ├── index.js              # Lógica de validação (checkEnv)
│   └── parseEnvKeys.js       # Parser de arquivos .env
├── tests/
│   ├── Checkenv-teste.js     # Testes de integração do validador
│   └── parseEnvKeys-teste.js # Testes unitários do parser
├── package.json
├── README.md
└── SKILL.md
```

---

## Decisões técnicas

### Zero dependências externas
Todo o projeto usa apenas módulos nativos do Node.js (`node:fs`, `node:path`, `node:util`, `node:test`, `node:assert`). Isso reduz superfície de ataque, elimina problemas de versão e simplifica a instalação.

### `Map` em vez de `Set` no parser
O parser retorna `Map<string, string>` para preservar tanto a chave quanto o valor. Isso permite detectar variáveis presentes mas vazias (`KEY=`), o que um `Set` não conseguiria fazer.

### `parseArgs` nativo (Node 18+)
A CLI usa `parseArgs` de `node:util` em vez de parsing manual. Isso garante comportamento correto para qualquer combinação de flags, independente da ordem, e lança erros descritivos automaticamente para flags desconhecidas.

### Separação entre domínio e apresentação
`checkEnv` sempre retorna um objeto completo com `ok`, `missing`, `empty`, `message` e `code`. A decisão de como formatar a saída (texto ou JSON) é responsabilidade exclusiva da CLI, não da função de validação.

---

## Testes

O projeto usa o test runner nativo do Node.js — sem dependências adicionais.

```bash
npm test
```

Cobertura atual:

| Arquivo                | Casos testados |
|------------------------|----------------|
| `parseEnvKeys-teste.js`| 12             |
| `Checkenv-teste.js`    | 9              |

---

## Requisitos

- Node.js `>= 18.0.0`
- npm `>= 7.0.0`