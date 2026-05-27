# Chapter 3.8 - Documentation Consolidation Plan

## 3.8.0 Overview

This chapter defines the plan for consolidating the A.A.S. documentation into one final, coherent system document. The finished guide should present one authoritative version of what A.A.S. is, how A.A.S. works, why A.A.S. exists, and how its architecture should be implemented.

The documentation should not split the product into competing status-based architectures. Existing notes, scaffolds, experiments, and earlier drafts are source material. The reader-facing guide should synthesize them into the final A.A.S. architecture.

### 3.8.1 Final Chapter Taxonomy

| Chapter | Purpose |
|---------|---------|
| Chapter 0 | Documentation standards, setup, formatting conventions, and guide authoring rules |
| Chapter 1 | Whole-system introduction: what A.A.S. is, why it exists, core capabilities, and shared vocabulary |
| Chapter 2 | Hermes side of A.A.S.: execution substrate, profiles, tasks, workers, memory, skills, logs, artifact output, and bridge-facing runtime surfaces |
| Chapter 3 | A.A.S. layer: product architecture, workspaces, ontology, Field Runtime, backend truth, frontend, APIs, and consolidation plan |
| Chapter 4 | Implementation plan created after Chapters 1-3 are consolidated; organized around doable and demo-able prototype phases |

### 3.8.2 Source Material to Consolidate

| Source | Useful Information | Final Placement |
|--------|--------------------|-----------------|
| Chapter 1.1 | System purpose, A.A.S./Hermes relationship, design hardlines | Chapter 1 introduction |
| Chapter 1.2 | Feature list and capability inventory | Chapter 1 capabilities |
| Chapter 2.1 | Agent roles, Hermes execution, routing, anti-patterns | Chapter 2 Hermes execution |
| Chapter 2.2 | Memory, profiles, skills, preferences, Agent Brief boundaries | Chapter 2 Hermes context layer and Chapter 3 backend preferences |
| Chapter 2.3 | Bridge, task packets, logs, artifacts, runtime surfaces | Chapter 2 Hermes bridge |
| Chapter 3.1 | A.A.S. product overview and workflow | Chapter 3 A.A.S. layer introduction |
| Chapter 3.2 | Chat, Draw, Model, Architect workspaces | Chapter 3 workspace model |
| Chapter 3.3 | A.A.S. simulation flowchart for contest-grade concept-to-board workflow | Chapter 3 agent simulation |
| Chapter 3.4 | Object, Subject, Vector, Boundary, Seed ontology | Chapter 3 ontology |
| Chapter 3.5 | A.A.S. system architecture and Field Runtime | Chapter 3 architecture |
| Chapter 3.6 | Frontend workspace architecture | Chapter 3 frontend |
| Chapter 3.7 | Backend truth, commands, events, APIs, storage, recovery | Chapter 3 backend |
| Former implementation roadmap source | Build order, phase map, acceptance tests, and implementation chunks | Consolidated into Chapter 4 |
| Raw design documents | Deep reasoning, examples, schemas, formulas, bridge notes, scoring notes | Use as reference material; distill into concise final chapters |

### 3.8.3 Source Preservation Register

The consolidation should preserve source information even when it changes format. Details that are not part of the main final-architecture narrative should be retained as implementation notes, source registers, appendix material, setup notes, or traceability tables.

| Source Detail | Preservation Shape |
|---------------|--------------------|
| A.A.S. / Hermes responsibility split | Chapter 1 overview, Chapter 2 Hermes, Chapter 3 A.A.S. |
| Hardware note: Lenovo ThinkPad, Intel Core i5-8350U @ 1.70 GHz, 16 GB RAM, 64-bit x64 system, 500 GB storage, device/product identifiers | Preserve as setup or local workstation reference material, not as architecture |
| Existing implementation scaffold notes: Next.js operator console, Fastify backend, Prisma plus SQLite persistence, saved pipelines, chat sessions, runs, run steps, artifacts, approvals, events, project state, bootstrap demo workspace, and local pipeline executor | Preserve as implementation history/reference material and migration evidence, not as a second product architecture |
| Existing app-home note: `D:\AAS\agents\developer\projects\_active\A.A.A` | Preserve as operational handoff/reference material, not as architecture |
| Existing UI scaffold: Build mode, Chat mode, right rail with General, Files, Editor, Terminal | Preserve as implementation history for how the final Chat/Draw/Model/Architect workspace model can be staged |
| Existing verification notes: backend generation, Prisma migration, and `npm run build` validation | Preserve as development-runbook evidence and validation history |
| Existing milestone commits: UI redesign shell `29887aa`, UI polish `e02f58e`, backend runtime layer `d2a0ef5` | Preserve as implementation history/reference material |
| Four workspaces: Chat, Draw, Model, Architect | Chapter 1 capabilities, Chapter 3.2 workspace model, Chapter 3.6 frontend |
| Five-node ontology: Object, Subject, Vector, Boundary, Seed | Chapter 1 design model and Chapter 3.4 canonical ontology |
| Design pipeline `Object + Subject -> Vector + Boundary -> Seed` | Chapter 1 introduction and Chapter 3.4 ontology |
| Agent roles: Planner, Research, Concept, Design Development, Model, Representation, Critic/Evaluator, Supervisor, Curator | Chapter 3.5 agent and service roles |
| Runtime services: AffordanceCompiler, ContextDistiller, MoveCompiler, FeatureRegistry, EvaluatorRegistry, TensionEngine, BranchEcology, CommitmentLedger | Chapter 3.5 Field Runtime and Chapter 3.7 backend services |
| Core runtime objects: WorldState, DirectionNode, DirectionLink, DirectionSnapshot, ConceptState, ValueVector, Affordance, Move, Command, AgentPatch, MovePrimitive, MovePattern, IntentGradient, FeatureRegistry, Tension, Branch, Commit, AgentBrief, Trajectory | Chapter 3.5 Core Runtime Object Catalog |
| Hermes profile guidance, project-scoped profiles, shared profile fallback, profile memory discipline | Chapter 2.1 and Chapter 2.2 |
| A.A.S.-Hermes Bridge, CLI bridge, Kanban DB watcher, log watcher, artifact watcher, profile/skill sync, MCP/plugin/direct API | Chapter 2.3 |
| Affordance scoring, feature scoring, tension energy, information gain, novelty, quality-diversity, MAP-Elites, bandits, surrogate effects | Chapter 3 final architecture where conceptual; Chapter 4 where work is phased |
| Move pattern lifecycle: discover, propose, sandbox, critique, validate, promote, monitor, prune | Chapter 3 final architecture where conceptual; Chapter 4 where work is phased |
| Process grammar, trajectory memory, design debt, unlock value, landmarks | Chapter 3.5 object catalog and Field Runtime architecture; Chapter 4 where work is phased |
| Branch lifecycle: spawn, develop, critique, compare, kill, merge, commit | Chapter 3.5 and Chapter 4 |
| Tension detection, tension energy, blocking finalization, artifact links | Chapter 3.5 and Chapter 3.7 |
| Commitment contents, revert rule, downstream enforcement | Chapter 3.5 and Chapter 3.7 |
| Event names, replay, reconnect, undo, audit | Chapter 3.7 backend event system |
| API surfaces for world, commands, direction graph, affordances, moves, move patterns, features, tensions, branches, commits, patches, briefs, bridge | Chapter 3.7 API surface |
| External tools: Rhino Compute, GPT Image V2, renderers, validators, exporters | Chapter 3.5 integration rule and Chapter 4 |
| Anti-patterns: graph-first product, raw tool exposure, memory as truth, uncommitted truth, hidden mutation, unregistered score variables, unvalidated learned moves, ontology drift | Distributed to Chapter 1 hardlines, Chapter 2 anti-patterns, Chapter 3.4 ontology rules, Chapter 3.5 ownership, and Chapter 4 |

### 3.8.4 Consolidation Rules

**One Final Architecture:** Each chapter should describe the final A.A.S. system, not multiple product versions. \
**Layer Ownership:** Hermes responsibilities belong in Chapter 2. A.A.S. product, state, and design-intelligence responsibilities belong in Chapter 3. \
**No Duplicate Definitions:** Define a concept once in its home chapter, then reference it elsewhere. \
**Practical Detail:** Architecture chapters should include enough schema shape, data flow, command flow, and responsibility boundaries to guide implementation. \
**Reader Navigation:** A user should know where to look: Hermes execution in Chapter 2, A.A.S. ontology and Field Runtime in Chapter 3, system purpose in Chapter 1. \
**Buildable Documentation:** Every final chapter should help an implementer build the system, not just understand its philosophy. \
**No Raw Note Dumps:** Raw design reasoning should be compressed into decisions, rules, contracts, diagrams, tables, and implementation steps.

### 3.8.5 Conflicts to Resolve Into Final Decisions

| Conflict in Source Material | Final Decision |
|-----------------------------|----------------|
| Pipeline graph as product center versus Field Runtime as product center | Field Runtime is the product center. Pipeline/task graphs are execution or debug structures, not the main design model |
| Chat as state versus backend graph truth | Chat is a workspace and conversation surface. Backend records, events, artifacts, and commits define product truth |
| Hermes memory versus A.A.S. project truth | Hermes memory is procedural context. A.A.S. backend records and commits define project truth |
| Many node categories versus five primary ontology types | Object, Subject, Vector, Boundary, and Seed are fixed primary types. Other terms are subcategories, tags, payloads, artifacts, relations, or states |
| Raw tools versus architectural moves | Users and agents interact through meaningful moves. Tools are invoked through move contracts |
| Artifacts as files versus artifacts as lineage records | Files become A.A.S. artifacts only when registered with metadata, lineage, validation state, and links |
| Agent autonomy versus commitment governance | Agents propose, execute, critique, and patch. Committed design truth changes through approved commits |
| Shared memory versus scoped preference handling | Preferences are scoped, source-tracked, precedence-resolved, and included in Agent Brief manifests |

### 3.8.6 Chapter Update Plan

**Chapter 1 - Introduction**

1. Keep Chapter 1.1 as the whole-system introduction.
2. Define A.A.S., Hermes, the bridge, the four workspaces, and the five-node design model.
3. Explain why A.A.S. exists: structured design state, meaningful moves, durable execution, governed truth, traceable outputs.
4. Keep Chapter 1.2 as the core capability map for the final system.

**Chapter 2 - Hermes**

1. Keep Chapter 2.1 focused on Hermes execution architecture: profiles, Kanban tasks, dispatcher, workers, task packets, status translation, and anti-patterns.
2. Keep Chapter 2.2 focused on Hermes memory, profiles, skills, Agent Brief boundaries, preference handling, and learning rules.
3. Keep Chapter 2.3 focused on bridge surfaces: CLI, Kanban watcher, log watcher, artifact watcher, profile sync, MCP/plugin/API surfaces, recovery, and security.
4. Remove A.A.S. Field Runtime ownership from Chapter 2 except where Hermes receives or returns data through the bridge.

**Chapter 3 - A.A.S.**

1. Keep Chapter 3.1 as the A.A.S. layer introduction.
2. Rewrite Chapter 3.2 as the final workspace model: Chat, Draw, Model, Architect.
3. Keep Chapter 3.3 as the agent simulation flowchart chapter.
4. Keep Chapter 3.4 as the canonical ontology chapter.
5. Keep Chapter 3.5 as the final A.A.S. system architecture and Field Runtime overview.
6. Keep Chapter 3.6 as the final frontend/workspace architecture.
7. Keep Chapter 3.7 as the final backend control-plane architecture.
8. Remove implementation-plan material from the final Chapter 3 reader path.
9. Keep Chapter 3.8 as a temporary consolidation guide until the final chapter set is stable.
10. Keep Chapter 4 as the only reader-facing implementation-plan chapter.

### 3.8.7 Chapter 4 Role

Chapter 4 owns implementation planning. Chapters 1-3 define the system; Chapter 4 divides the work into practical implementation chunks.

Chapter 4 is not a time schedule. It divides implementation into practical chunks where every phase produces a doable and demo-able prototype aligned with the A.A.S. philosophy, system architecture, and responsibility boundaries. Early prototypes may be incomplete, but they must not contradict the final architecture.

Chapter 4 preserves implementation-relevant source material from the former roadmap source, raw design documents, implementation-history notes, bridge notes, API notes, and architecture sketches. It must not introduce product definitions that conflict with Chapters 1-3.

### 3.8.8 Acceptance Criteria

The documentation is cohesive when:

**One System:** The guide presents one final A.A.S. architecture. \
**Clear Ownership:** Hermes execution information lives in Chapter 2; A.A.S. product and Field Runtime information lives in Chapter 3. \
**Complete Reader Path:** A reader can move from purpose, to capabilities, to Hermes, to A.A.S. architecture, and then into Chapter 4 implementation planning without encountering conflicting definitions. \
**Buildable Contracts:** The docs define enough schemas, commands, flows, events, task packets, artifacts, and ownership boundaries for implementation. \
**No Contradictory Terms:** Pipeline, graph, memory, artifact, commit, branch, tension, move, task, and workspace all have stable meanings. \
**No Raw Note Leakage:** Draft reasoning is distilled into final decisions and placed in the correct chapter. \
**No Information Loss:** Every source detail is either integrated into a final chapter, preserved in a register, or intentionally moved to setup/reference material with a clear reason.
