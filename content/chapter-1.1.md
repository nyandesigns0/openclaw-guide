# Chapter 1.1 - Introduction

## 1.1.0 Overview

A.A.S. is the Autonomous Architectural System: an architectural design environment where a human operator, an A.A.S. product layer, and Hermes execution work together to produce coherent design truth, design artifacts, and final architectural outputs.

The guide documents the final A.A.S. system and architecture. It does not present competing versions of the product. It defines what A.A.S. is, how A.A.S. works, why A.A.S. exists, and how the system should be built as one coherent architecture.

The documentation is organized by responsibility:

**Chapter 1:** Introduction to the whole A.A.S. system, its purpose, core capabilities, and vocabulary. \
**Chapter 2:** Hermes side of A.A.S.: execution substrate, profiles, Kanban/task execution, worker behavior, memory, skills, logs, artifacts, dispatcher behavior, and bridge-facing runtime details. \
**Chapter 3:** A.A.S. layer: product layer, Field Runtime, ontology, workspaces, backend truth, WorldState, affordances, moves, branches, tensions, commits, frontend, APIs, and consolidation rules. \
**Chapter 4:** Implementation plan, created after Chapters 1-3 are consolidated, organized around doable and demo-able prototype phases.

### 1.1.1 What A.A.S. Is

**Architectural Operating Environment:** A.A.S. is the environment where architectural intent becomes structured design state, agent work, artifacts, evaluation, and committed project truth. \
**Design-Intelligence Layer:** A.A.S. reads the design world, identifies meaningful next moves, scores options, resolves tensions, manages branches, and records commitments. \
**Backend Truth Layer:** A.A.S. owns canonical product state: projects, direction graph, WorldState, artifacts, moves, evaluations, approvals, branches, tensions, commits, preferences, and runtime events. \
**Human-Steerable System:** The operator sets goals, values, constraints, approvals, and final direction. A.A.S. makes the state of the design explicit and helps the operator steer at the level of architectural meaning. \
**Hermes-Executed System:** Hermes provides durable execution through profiles, Kanban tasks, workers, skills, memory, logs, and task state. A.A.S. compiles architectural moves into Hermes work and accepts results through validated backend commands. \
**Four-Workspace Product:** A.A.S. presents Chat, Draw, Model, and Architect as the primary user workspaces.

### 1.1.2 Why A.A.S. Exists

A.A.S. exists because architectural design is not a simple linear prompt-response task. It requires competing concepts, objective facts, subjective values, constraints, references, geometry, visual output, critique, validation, preference handling, and committed decisions.

Ordinary chat systems lose design state inside conversation. Static workflow graphs force the user to predict the process before the design problem is understood. Raw tool orchestration exposes too much operational detail and too little architectural meaning.

A.A.S. solves this by making the design world explicit:

**State Is Structured:** Design state is represented through graph records, WorldState, artifacts, tensions, branches, preferences, and commits. \
**Moves Are Meaningful:** Agents and users choose architectural moves rather than raw tools. \
**Execution Is Durable:** Hermes executes specialist work through tasks, profiles, workers, memory, and logs. \
**Truth Is Governed:** Important design truth changes through commands, approvals, and commitments. \
**Outputs Are Traceable:** Artifacts connect back to branches, moves, tensions, commits, evaluations, and task bindings.

### 1.1.3 System Relationship

A.A.S. and Hermes have different responsibilities:

```text
A.A.S. = product truth, design intelligence, workspaces, commands, WorldState, commits
Hermes = profiles, Kanban, workers, skills, memory, logs, durable execution
Bridge = task packets, profile bindings, task bindings, logs, artifacts, event translation
```

The frontend never controls Hermes directly. The frontend talks to the A.A.S. backend. The A.A.S. backend validates commands, derives WorldState, scores moves, manages project truth, and uses the bridge to dispatch work into Hermes. Hermes executes and reports back. A.A.S. registers outputs and updates the design world.

### 1.1.4 Design Model

A.A.S. uses a small design ontology to keep architectural direction legible:

```text
Object + Subject -> Vector + Boundary -> Seed
```

**Object:** Objective outside truth: site facts, measurements, climate, existing conditions, codes, physical realities. \
**Subject:** Subjective inside truth: values, taste, memory, atmosphere, identity, human preference, lived experience. \
**Vector:** Pushing force: what the design should move toward. \
**Boundary:** Restricting force: what the design must remain within or must not violate. \
**Seed:** Generated design possibility: concepts, schemes, strategies, options, and variations.

The ontology is not a file taxonomy and not a workflow graph. It is the semantic backbone of Architect Mode and the direction field.

### 1.1.5 Core Workflow

The final A.A.S. workflow is:

1. The user enters goals, values, references, constraints, and desired outputs.
2. A.A.S. records objective and subjective truth as Object and Subject matter.
3. A.A.S. derives Vector and Boundary forces that shape the design field.
4. A.A.S. generates Seeds, branches, tensions, and available moves.
5. The operator and agents select meaningful architectural moves.
6. A.A.S. compiles approved moves into Hermes task packets.
7. Hermes profiles execute through Kanban tasks, workers, skills, tools, and logs.
8. A.A.S. registers artifacts, evaluates results, updates WorldState, and records events.
9. Branches are developed, compared, merged, rejected, or committed.
10. Committed decisions become project truth and guide final artifacts.

### 1.1.6 Design Hardlines

**One Source of Product Truth:** A.A.S. backend records and commits define project truth. Chat history, profile memory, logs, local caches, and raw files do not. \
**Hermes Executes, A.A.S. Governs:** Hermes is the execution substrate. A.A.S. owns meaning, validation, commands, artifacts, commitments, and user-facing state. \
**Moves Over Raw Tools:** The system exposes meaningful architectural moves rather than asking users or agents to choose low-level tools directly. \
**Four Primary Workspaces:** Chat, Draw, Model, and Architect are the primary user surfaces. Supporting panels and inspectors do not become separate primary modes. \
**Five Primary Node Types:** Object, Subject, Vector, Boundary, and Seed are the fixed primary ontology. Other terms are subcategories, tags, payloads, relations, artifacts, or states. \
**Commitment Discipline:** Speculative work can exist as branches, artifacts, tensions, and options. Project truth changes through commits. \
**Traceable Artifacts:** Every important artifact should have lineage: source move, branch, tension, commit, evaluator result, Hermes task, and event history. \
**Scoped Preferences:** User, team, project, session, and prompt preferences must be source-tracked and resolved before they shape agent context.
