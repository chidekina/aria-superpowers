---
name: prompt-modeler
description: "Generate structured strategic prompts with diagnostic and multiple options. Triggers on: /modelar-prompt."
user-invocable: true
tags: [prompt-engineering, strategy, meta]
---

# Prompt Modeler

## Overview

Generate structured, high-quality prompts based on contextual project analysis.

This skill:
- Analyzes scope and constraints
- Classifies risk and rigor
- Selects appropriate strategic profiles
- Generates 3 prompt options
- Never executes the project
- Never assumes behavior of generated prompts

Use when transforming ideas, projects, or existing code into structured prompts.

---

## Usage

Manual invocation:

/prompt-modeler

Execution always begins with the Mandatory Gate (Stage 0).

---

## Workflow

### Stage 0 — Mandatory Gate

Always ask:

Choose:
(A) Describe the project  
(B) Analyze existing files

If describing, require:

- Main objective
- Type (Study / Portfolio / Freelance / Product / Experiment)
- Stack or technology
- Deadline (if any)
- Dominant focus (Learning / Delivery / Architecture / Automation)
- Rigor level (Low / Moderate / High)
- Allow code generation? (Yes / Warn before / No)
- Governance model (Continuous flow / Always confirm)

Do not proceed without this stage.

---

### Stage 1 — Contextual Analysis

1. Extract dominant keywords
2. Classify:
   - Project type
   - Risk level (Low / Medium / High)
   - Required rigor
   - Dominant focus
   - Scope ambiguity
3. Detect:
   - Internal conflicts
   - Organizational complexity (stakeholders, compliance, distributed architecture, enterprise context)

If input is insufficient:
- Ask up to 3 refinement questions
or
- Request improved description

Never generate prompts from weak input.

---

### Strategic Profile Selection

Select up to 3 profiles.

Available profiles:

- Architect / Tech Lead
- Productive Copilot / Executor
- Senior Tutor
- Critical Reviewer
- Security Auditor
- Performance Specialist
- Technical Writer
- Product Strategist
- Organizational Architect (enterprise contexts only)

Priority rule (immutable):

Focus > Risk > Type > Rigor

---

### Light Mode Criteria

Apply only if:

- Low risk
- Closed scope
- No organizational complexity

Light Mode keeps:
- Clear objective
- Explicit context
- Defined output format
- Quality criteria
- Final directive

---

### Stage 2 — Mandatory Output Structure

Always return:

Diagnostic (max 4 lines)
- Type
- Focus
- Risk
- Organizational complexity (if any)

Primary Recommendation
- Dominant profile
- Short justification
- Confidence level (High / Medium / Low)

Option 1  
Option 2  
Option 3  

Each option must include:
- Name
- When to use (1 line)
- Ready-to-copy prompt (separate block)

Custom Prompt Adjustment
- Direct refinement questions

Always end with:

Choose: 1, 2, 3 or Customize.

---

## Constraints

- Never execute the project.
- Never assume behavior of generated prompts.
- Never generate fewer than 3 options.
- Maintain deterministic reasoning.
- Maintain profile priority rule.