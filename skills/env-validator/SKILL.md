---
name: env-validator
description: "Valida se todas as variáveis do .env.example estão presentes e preenchidas no .env. Triggers on: env-validator check, validar env, checar variáveis de ambiente."
user-invocable: true
tags: [env, dotenv, validator, cli, devtools]
requires: [node>=18]
---

# env-validator

Valida arquivos `.env` contra um `.env.example`, garantindo que nenhuma variável obrigatória esteja faltando ou vazia.

---

## Uso

```
env-validator check                                        # Validação básica
env-validator check --env .env.local --example .env.example  # Arquivos customizados
env-validator check --json                                 # Saída em JSON para CI/scripts
env-validator check --no-strict                            # Avisa sem falhar o processo
env-validator check --allow-empty                          # Aceita variáveis com valor vazio
```

## O que ela faz

- Passo 1: Lê o `.env.example` como fonte da verdade e extrai todas as chaves declaradas
- Passo 2: Lê o `.env` e extrai as chaves presentes com seus respectivos valores
- Passo 3: Compara os dois arquivos e identifica chaves ausentes e chaves sem valor
- Passo 4: Retorna uma mensagem legível ou JSON com o resultado e encerra com o exit code correto

## Exemplo

**Prompt:**
> env-validator check

**O Claude vai:**
1. Ler o `.env.example` e mapear todas as variáveis esperadas
2. Ler o `.env` e comparar com as variáveis esperadas
3. Entregar um relatório indicando o que está faltando, o que está vazio e o exit code para o CI/CD