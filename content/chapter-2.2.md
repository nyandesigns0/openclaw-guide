# Chapter 2.2 - Hermes Memory, Profiles, and Skills

## 2.2.0 Overview

This chapter defines the Hermes-side context system used by A.A.S. Hermes memory, profiles, skills, logs, and task context help agents execute work. They do not define project truth. A.A.S. controls what context is sent to Hermes, what outputs are accepted, and what becomes durable design state.

Hermes memory remembers procedures, lessons, and execution habits. A.A.S. records commits, graph truth, artifacts, preferences, WorldState, and event history.

### 2.2.1 Profile Model

**Base Profiles:** A.A.S. should define base Hermes profiles such as `aas-research-base`, `aas-concept-base`, `aas-model-base`, `aas-representation-base`, `aas-critic-base`, and `aas-supervisor-base`. \
**Project Profiles:** When memory isolation matters, the runtime should create project-scoped profiles such as `aas-concept-p123`. \
**Shared Profiles:** Shared base profiles are acceptable for low-risk execution only when task packets and A.A.S. retrieval filters prevent project-specific bleed. \
**Profile Instructions:** Each profile should include role purpose, allowed work, forbidden work, output contract rules, artifact conventions, patch format, and escalation conditions. \
**Profile Ownership:** Hermes owns profile homes and profile-local memory. A.A.S. owns profile binding records and decides which profile is assigned to each move.

### 2.2.2 Skill Packs

Hermes skills should teach execution procedure, not project truth.

Useful A.A.S. skill packs include:

**Task Packet Reader:** Read the A.A.S. packet, identify required output, respect locked records, and preserve source references. \
**Artifact Writer:** Write outputs to the assigned artifact root with metadata, preview text, lineage, and expected file names. \
**Patch Emitter:** Return structured operations, rationale, affected records, expected versions, risk level, and approval needs. \
**Critique Contract:** Produce evidence-backed critique with feature deltas, confidence, unresolved tensions, and recommended next moves. \
**Model Contract:** Produce geometry or validation outputs with model version, source branch, measured features, failed checks, and assumptions. \
**Representation Contract:** Produce image, board, render, diagram, or prompt outputs with source artifacts, branch links, and validation notes.

Skills may improve profile execution quality, but they must not bypass A.A.S. command validation or commit rules.

### 2.2.3 Hermes Memory Types

**Profile Memory:** Stores how a profile works: procedures, recurring mistakes, useful tool sequences, style habits, and role-specific lessons. \
**Task Context:** Stores temporary execution context for the active task: packet, brief, allowed artifacts, local notes, and in-progress outputs. \
**Skill Memory:** Stores reusable procedures embedded in skills or skill-local support files. \
**Log Memory:** Stores task comments, logs, and execution traces that can later be summarized. \
**Shared Procedural Memory:** Stores cross-profile lessons that are safe to reuse across projects, such as validation checklists or artifact naming conventions. \
**Retrieval Memory:** OpenViking or another retrieval store may hold derived context cards and summaries, but it remains a context cache rather than project truth.

### 2.2.4 Memory Boundary With A.A.S.

The memory flow should be:

```text
A.A.S. graph / events / commits
  -> derived memory card or Agent Brief
  -> Hermes profile execution
  -> structured output or patch
  -> A.A.S. command validation
  -> graph / event / artifact / commit update
```

It should never be:

```text
Hermes memory
  -> direct graph mutation
  -> unreviewed project truth
```

**Commit Boundary:** Architectural decisions become canonical through A.A.S. commits, not through profile recall. \
**Preference Boundary:** User, team, project, session, and prompt preferences are resolved by A.A.S. before entering a task packet. \
**Artifact Boundary:** Hermes may produce files. A.A.S. accepts them only after registration, lineage assignment, validation, and event writing. \
**State Boundary:** Hermes local graph caches are disposable. A.A.S. backend records remain authoritative.

### 2.2.5 Agent Briefs Sent to Hermes

A.A.S. should send compact Agent Briefs instead of asking Hermes profiles to inspect all memory and project records.

An Agent Brief should include:

**Goal:** Current user goal, normalized goal, output intent, and non-goals. \
**Task Intent:** The selected move, target branch, target artifact, active tension, and expected output. \
**Relevant Truth:** Committed decisions, locked constraints, active direction nodes, source artifacts, and current feature pressures. \
**Allowed Context:** References, memory snippets, project preferences, and prior outputs needed for this task. \
**Blocked Context:** Things the profile must not assume, overwrite, expose, or treat as truth. \
**Output Contract:** Required structured result, artifact metadata, patch format, confidence, warnings, and completion status. \
**Source Manifest:** The records, preferences, commits, memory cards, and artifacts used to build the brief.

### 2.2.6 Preference and User Context Handling

Hermes profiles should not silently learn user taste as project truth.

**Stable User Preferences:** A.A.S. may summarize durable user preferences into scoped records. \
**Session Instructions:** Current prompt or session choices can override stable preferences for that session. \
**Project Commits:** Project commitments override general taste where the project has explicitly decided something. \
**Team Standards:** Team or firm standards apply only through explicit scope and precedence rules. \
**Profile Habits:** Hermes profile memory can remember how to communicate or perform, but it should not redefine user preference without A.A.S. promotion.

Every preference used in a Hermes task should be visible in the Agent Brief source manifest.

### 2.2.7 Maintenance and Learning

Hermes can support learning without becoming the product database.

**After Task Completion:** A.A.S. can summarize successful procedures, failure causes, useful prompts, tool sequences, and validation lessons into profile memory or skills. \
**Trace Summaries:** Hermes logs can be summarized into A.A.S. events, evaluator notes, pattern statistics, or memory cards. \
**Skill Updates:** Repeated stable procedures can become skill updates after review. \
**Profile Cleanup:** Stale, project-specific, conflicting, or unsafe profile memories should be pruned or scoped. \
**Pattern Proposal:** Hermes may propose new move patterns, but A.A.S. owns sandboxing, validation, curation, and promotion.

### 2.2.8 Hermes Memory Anti-Patterns

**Profile Memory as Truth:** Do not let profile recall override A.A.S. commits, graph rows, or artifacts. \
**Global Vector Memory Without Filters:** Do not retrieve across users, teams, projects, or private scopes without strict metadata filtering. \
**Raw Dump Briefs:** Do not send every note, memory card, artifact, and chat message into every task. \
**Untraceable Preference Use:** Do not let a profile claim a user preference without source and scope. \
**Silent Skill Mutation:** Do not let task execution rewrite skills or shared procedures without review. \
**Cross-Project Bleed:** Do not let project-specific facts or taste migrate into unrelated work through shared profiles. \
**Memory-Only Decisions:** Do not record major design decisions only in Hermes memory, logs, or comments.
