# Como Contribuir com uma Skill

> 🇺🇸 Reading in English? See [CONTRIBUTING.md](CONTRIBUTING.md)

Bem-vindo(a)! Este guia explica, passo a passo, como criar e enviar uma skill para o ARIA Superpowers.
Não precisa ser expert em programação — se você criou um prompt útil para o Claude Code, já pode contribuir.

---

## O que é uma Skill?

Uma skill é um arquivo Markdown (`.md`) que ensina o Claude Code a ter um comportamento novo — como um "modo turbo" para uma tarefa específica.

**Exemplos:** revisar código, gerar commits inteligentes, criar testes automaticamente, descrever PRs.

---

## Formas de Contribuir

| Forma | Dificuldade | Requer git? |
|-------|-------------|-------------|
| [Pelo site (formulário)](#opção-1--pelo-site-sem-git) | ⭐ Fácil | Não |
| [Abrindo uma Issue no GitHub](#opção-2--abrindo-uma-issue-no-github) | ⭐ Fácil | Não |
| [Enviando um Pull Request](#opção-3--enviando-um-pull-request-recomendado) | ⭐⭐ Médio | Sim |

---

## Opção 1 — Pelo site (sem git)

1. Acesse **[chidekina.github.io/aria-superpowers](https://chidekina.github.io/aria-superpowers/)**
2. Role até o final da página e clique em **"✨ Submit a skill"**
3. Preencha o formulário:
   - **Nome da skill** — ex: `docker-compose`
   - **Categoria** — escolha a mais próxima
   - **Trigger** — o comando que ativa a skill, ex: `/docker-compose`
   - **Descrição** — uma frase explicando o que ela faz
   - **Conteúdo** — o Markdown da skill (veja o [formato abaixo](#formato-da-skill))
4. Clique em **"Open on GitHub →"**
5. Uma issue já preenchida vai abrir no GitHub
6. Clique em **"Submit new issue"**

Pronto! Vou revisar e, se aceita, converto em Pull Request por você.

---

## Opção 2 — Abrindo uma Issue no GitHub

Use esta opção se quiser apenas **sugerir uma ideia** sem escrever a skill completa.

1. Acesse [github.com/chidekina/aria-superpowers/issues/new/choose](https://github.com/chidekina/aria-superpowers/issues/new/choose)
2. Clique em **"Skill Request"**
3. Preencha o formulário:
   - **Skill name** — nome da skill
   - **Use case** — que problema ela resolve?
   - **Example prompt** — o que você escreveria para o Claude para ativar essa skill?
   - **External dependencies** — precisa de alguma ferramenta? (ex: docker, ollama)
4. Clique em **"Submit new issue"**

---

## Opção 3 — Enviando um Pull Request (recomendado)

Esta é a forma mais completa. Você cria a skill no próprio repositório e envia para revisão.

### Pré-requisitos

- [Git](https://git-scm.com/downloads) instalado
- Conta no [GitHub](https://github.com)
- Um editor de texto (VSCode, Notepad++, qualquer um)

---

### Passo 1 — Faça um Fork do repositório

> **Fork** é uma cópia do repositório que fica na sua conta. Você edita lá, sem afetar o original.

1. Acesse [github.com/chidekina/aria-superpowers](https://github.com/chidekina/aria-superpowers)
2. Clique no botão **"Fork"** no canto superior direito
3. Clique em **"Create fork"**

Agora você tem uma cópia em `github.com/SEU-USUARIO/aria-superpowers`.

---

### Passo 2 — Clone o repositório na sua máquina

Abra o terminal (Prompt de Comando, PowerShell ou Terminal do Mac/Linux) e execute:

```bash
git clone https://github.com/SEU-USUARIO/aria-superpowers.git
```

> Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

Depois, entre na pasta:

```bash
cd aria-superpowers
```

---

### Passo 3 — Crie uma branch para a sua skill

> **Branch** é uma ramificação isolada. Você trabalha nela sem afetar a versão principal.

```bash
git checkout -b skill/nome-da-sua-skill
```

**Exemplo:**
```bash
git checkout -b skill/docker-compose
```

---

### Passo 4 — Crie a pasta e o arquivo da skill

Cada skill fica numa pasta dentro de `skills/`, com um arquivo chamado `SKILL.md`.

```bash
mkdir skills/nome-da-sua-skill
```

**Exemplo:**
```bash
mkdir skills/docker-compose
```

Agora crie o arquivo `SKILL.md` dentro da pasta. Use o template abaixo:

---

### Formato da Skill

```markdown
---
name: nome-da-skill
description: "Uma frase explicando o que faz. Triggers on: /comando, frase de ativação."
user-invocable: true
tags: [tag1, tag2]
requires: []
---

# Nome da Skill

Uma frase curta explicando o propósito.

---

## Uso

\`\`\`
/nome-da-skill             # Descrição do uso básico
/nome-da-skill --opcao     # Descrição de variação
\`\`\`

## O que ela faz

Explique em bullets o que o Claude vai fazer ao ativar essa skill:

- Passo 1: ...
- Passo 2: ...
- Passo 3: ...

## Exemplo

**Prompt:**
> /nome-da-skill

**O Claude vai:**
1. Fazer X
2. Fazer Y
3. Entregar Z
```

---

### Exemplo real — skill `docker-compose`

```markdown
---
name: docker-compose
description: "Gera um docker-compose.yml para o projeto atual. Triggers on: /docker-compose, cria docker-compose, sobe com docker."
user-invocable: true
tags: [docker, devops, automation]
requires: [docker]
---

# Docker Compose Generator

Analisa o projeto e gera um `docker-compose.yml` pronto para uso.

---

## Uso

\`\`\`
/docker-compose            # Gera para o projeto atual
/docker-compose --prod     # Versão para produção
\`\`\`

## O que ela faz

- Detecta a linguagem e framework do projeto
- Identifica bancos de dados usados
- Gera serviços, volumes e variáveis de ambiente
- Cria `.env.example` se não existir

## Exemplo

**Prompt:**
> /docker-compose

**O Claude vai:**
1. Ler `package.json`, `requirements.txt` ou equivalente
2. Identificar dependências (Postgres, Redis, etc.)
3. Gerar `docker-compose.yml` com todos os serviços
4. Explicar como subir com `docker compose up`
```

---

### Passo 5 — Adicione a skill no `skills.json`

Abra o arquivo `skills.json` na raiz do repositório e adicione um objeto para a sua skill:

```json
{
  "name": "docker-compose",
  "description": "Gera um docker-compose.yml para o projeto atual",
  "category": "devops",
  "tags": ["docker", "devops", "automation"],
  "requires": ["docker"],
  "user-invocable": true,
  "trigger": "/docker-compose"
}
```

> Adicione após a última entrada, antes do `]` final. Não esqueça da vírgula na entrada anterior.

---

### Passo 6 — Faça o commit das mudanças

```bash
git add skills/nome-da-sua-skill/SKILL.md skills.json
git commit -m "feat: add nome-da-sua-skill skill"
```

**Exemplo:**
```bash
git add skills/docker-compose/SKILL.md skills.json
git commit -m "feat: add docker-compose skill"
```

---

### Passo 7 — Envie para o seu Fork

```bash
git push origin skill/nome-da-sua-skill
```

---

### Passo 8 — Abra o Pull Request

1. Acesse `github.com/SEU-USUARIO/aria-superpowers`
2. Você vai ver um banner amarelo: **"Compare & pull request"** — clique nele
3. Preencha:
   - **Título:** `feat: add nome-da-skill skill`
   - **Descrição:** explique em 2-3 linhas o que a skill faz e quando usar
4. Clique em **"Create pull request"**

---

## Checklist antes de enviar

Antes de abrir o PR, confirme:

- [ ] A pasta se chama igual à skill (kebab-case, sem espaços)
- [ ] O arquivo se chama exatamente `SKILL.md`
- [ ] O frontmatter tem `name`, `description` e `user-invocable`
- [ ] A skill tem pelo menos uma seção de **Uso** e um **Exemplo**
- [ ] A entrada foi adicionada no `skills.json`
- [ ] A skill funciona para qualquer pessoa, não só para um projeto específico

---

## Dúvidas?

- Leia o [SKILL_SPEC.md](SKILL_SPEC.md) para entender o formato completo
- Abra uma [Discussion](https://github.com/chidekina/aria-superpowers/discussions) para compartilhar ideias
- Abra uma [Issue](https://github.com/chidekina/aria-superpowers/issues) para reportar problemas

---

Feito com 💙 — toda contribuição é bem-vinda, do iniciante ao expert.
