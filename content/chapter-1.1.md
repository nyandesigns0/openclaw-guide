# Chapter 1.1 - Introduction

## 1.1.0 Overview

This chapter defines the purpose of the A.A.S. guide after the Field Runtime and Hermes architecture shift. A.A.S. is the design-intelligence and product-truth layer. Hermes Agent is the durable execution fabric: profiles, Kanban tasks, worker processes, memory, skills, dispatcher, logs, and task state. A.A.S. compiles architectural moves into Hermes work while preserving WorldState, artifacts, scoped preferences, and commits as product truth.

### 1.1.1 A.A.S. / Hermes System Overview

**Hermes Role:** Hermes is the execution substrate. Hermes profiles act as specialist agent bodies, Hermes Kanban coordinates durable multi-agent task work, and Hermes memory/skills improve agent capability over time. \
**A.A.S. Role:** A.A.S. is the architectural operating environment above Hermes. It reads design state, exposes meaningful moves, compiles moves into Hermes task groups, watches task/log/artifact state, and records WorldState, tensions, branches, artifacts, preferences, and commitments. \
**Architecture Relationship:** Hermes executes work. A.A.S. defines what the work means architecturally. Agents should not navigate raw tool mazes or hand-built workflow graphs; they should receive a compact situation brief and choose from meaningful next moves. \
**Runtime Boundary:** Product truth belongs to the A.A.S. backend control plane. Agent execution, profile memory, skills, and task operations belong to Hermes. Specialized tools are reached through typed move execution.

```text
Hermes = profiles, Kanban, workers, skills, memory, logs, execution
A.A.S. Field Runtime = design intelligence, WorldState, moves, commits, UI
```

### 1.1.2 Hardware Overview

**Laptop:** Lenovo ThinkPad \
**CPU:** Intel Core i5-8350U @ 1.70 GHz \
**RAM:** 16.0 GB installed, 15.8 GB usable \
**System type:** 64-bit operating system, x64-based processor \
**Storage:** 500 GB \
**Device ID:** 9CC8C135-1159-4E14-A450-18EEB977D876 \
**Product ID:** 00330-51685-69764-AAOEM

### 1.1.3 Design Objectives

**Objective:** Establish A.A.S. Field Runtime as the architectural design environment above Hermes Agent. \
**Agent Experience:** Agents should enter a design field, receive the current situation, select or propose legal moves, execute through Hermes task packets, and see world state update. \
**Human Experience:** The operator defines goals and values, reviews branches and tensions, approves high-impact commitments, and inspects artifacts through the Field Navigator. \
**Architectural Output:** The system should move from vague prompts toward committed design truth: branches, critiques, ground-truth models, drawings, renders, boards, and validated delivery artifacts. \
**Design Intelligence:** The system should compute design state, objectives, tensions, process phase, design debt, feature scores, move effects, and elegance so the right move appears at the right time. \
**Maintainability:** Keep Hermes as the execution fabric. Put A.A.S.-specific semantics, persistence, UI, move compilation, scoring, preference governance, and commitment logic in the A.A.S. product layer.

### 1.1.4 Design Hardlines

**No Graph-First Product:** A visual graph may remain as trace, replay, and debugging infrastructure, but it is not the primary agent operating model. \
**Moves Over Tools:** Agents choose architectural moves such as spawning branches, resolving tensions, building ground truth, generating studies, validating artifacts, or committing decisions. The system maps those moves to Hermes tasks and specialized tools. \
**Primitives vs Patterns:** Primitive move types are stable runtime verbs. Architectural move patterns are data-driven strategies that can evolve through evidence, sandboxing, and curator approval. \
**WorldState as Canon:** A.A.S. maintains a structured WorldState containing goal, intent, project status, branches, artifacts, tensions, commits, available moves, risks, questions, feature state, and recent events. \
**Commitment Discipline:** Speculation can branch freely, but only committed decisions become project truth. Major commits, branch kills, finalization, expensive generation batches, and overwrites require approval. \
**Memory Boundary:** Hermes memory is procedural agent learning. A.A.S. WorldState, Artifact Registry, Preference Store, and Commitment Ledger are canonical project truth. \
**Preference Scope:** User preferences, team standards, project commitments, session choices, and explicit prompts must be scoped, source-tracked, and conflict-resolved before entering an Agent Brief. \
**State Separation:** Source code, Hermes runtime state, A.A.S. product state, and generated artifacts must remain clearly separated. \
**Security:** Bind local runtime services conservatively and avoid exposing Hermes worker control, task databases, profile homes, API keys, or artifact roots directly through public forwarding.
