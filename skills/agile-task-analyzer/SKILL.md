---
name: agile-task-analyzer
description: "Analisa uma tarefa e a decompõe em subtarefas ágeis, recomendando o framework mais adequado (Scrum, Kanban, Scrumban, SAFe, XP) com justificativa e gerando um quadro Kanban visual. Triggers on: /agile-task, analisa tarefa, quebra em subtarefas, como executar de forma ágil, planeje esse projeto, organize essa demanda."
user-invocable: true
tags: [agile, scrum, kanban, gestao, planejamento, projetos]
requires: []
---

# Agile Task Analyzer

Analisa qualquer tarefa ou objetivo e entrega um plano de execução ágil completo, adaptado ao nível de conhecimento do usuário.

---

## Uso

```
/agile-task                          # Analisa a tarefa descrita na mensagem
/agile-task --iniciante              # Força linguagem didática e explicações detalhadas
/agile-task --especialista           # Forças linguagem técnica com terminologia ágil completa
/agile-task --framework=kanban       # Usa um framework específico em vez de recomendar automaticamente
/agile-task --sem-kanban             # Retorna apenas a análise textual, sem o quadro visual
```

## O que ela faz

- **Detecta o nível do usuário** automaticamente (iniciante, intermediário ou especialista) pelo jeito que escreve, adaptando a linguagem e o nível de detalhe da resposta
- **Analisa a tarefa** identificando tipo (técnica ou de negócio), complexidade e natureza do trabalho
- **Recomenda o framework ágil ideal** entre Scrum, Kanban, Scrumban, SAFe, XP e Lean, sempre com justificativa clara
- **Decompõe em subtarefas** com nível médio de detalhe: descrição, pontos de atenção (riscos, dependências, stakeholders) e posicionamento no framework
- **Gera um quadro Kanban visual** em HTML interativo com drag and drop, WIP limit, marcação de bloqueadores e tags de épico
- **Entrega um resumo executivo** com sequência de execução, riscos principais e próximo passo imediato

## Exemplo

**Prompt:**
> /agile-task Quero lançar um app de delivery para pequenos restaurantes

**O Claude vai:**
1. Detectar o nível do usuário pela mensagem (ex: intermediário)
2. Analisar a tarefa: tipo, complexidade e natureza iterativa
3. Recomendar o framework (ex: Scrum) com justificativa de 2–3 frases
4. Quebrar em subtarefas — ex: Discovery com stakeholders / Definição do MVP / Desenvolvimento do backend / App mobile / Testes / Launch
5. Detalhar cada subtarefa com descrição, pontos de atenção e posicionamento no backlog
6. Gerar e entregar um arquivo `kanban-board.html` interativo com os cards organizados por prioridade
7. Apresentar resumo executivo com sequência, riscos e próximo passo concreto
