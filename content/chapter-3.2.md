# Chapter 3.2 - Workspace Model

## 3.2.0 Overview

A.A.S. has exactly four primary workspaces: Chat, Draw, Model, and Architect. Each workspace is a different view into the same backend-owned product truth. The workspaces do not own separate versions of the project. They read WorldState, artifacts, direction graph records, approvals, events, feature pressures, branches, tensions, commits, and Hermes execution summaries through the A.A.S. backend.

The four workspaces share one rule:

```text
workspace action -> backend command or move request -> event -> WorldState update -> workspace refresh
```

### 3.2.1 Chat Workspace

Chat is the conversational steering surface. It explains what the system is doing, asks for missing information, presents available moves, requests approvals, and keeps human guidance connected to project truth.

**Conversation Layer:** Chat handles explanations, questions, corrections, options, approvals, and conversational steering. \
**WorldState-Linked Messages:** Agent messages can reference direction nodes, branches, tensions, commits, artifacts, evaluator outputs, move results, and Hermes tasks instead of making chat prose durable state. \
**Move Presentation:** Chat presents available moves, score explanations, risks, expected outputs, approval requirements, and execute controls. \
**Approval Flow:** High-impact commits, branch kills, expensive generation batches, finalization, reverts, preference conflicts, and overwrites can request user approval through chat and shared approval controls. \
**Preference Awareness:** Chat can surface which scoped preferences influenced an answer, such as a project commit, active prompt, session preference, user preference, or team standard. \
**Truth Boundary:** Chat submits typed backend commands and move requests. Chat prose alone is not canonical project truth.

### 3.2.2 Draw Workspace

Draw is the visual composition and board-authoring surface. It turns artifacts, references, diagrams, renders, sketches, plan/section layouts, and prompt notes into coherent visual packages.

**Visual Composition Workspace:** Draw handles boards, references, sketches, prompt notes, material swatches, image bays, diagrams, plan layouts, section layouts, render studies, and board packages. \
**Board Authoring:** Users arrange artifacts into visual narratives while preserving artifact lineage, branch links, commit links, validation state, and output intent. \
**Image and Prompt Work:** Draw can create or refine image prompts, compare generated studies, annotate image bays, and package visual constraints for representation moves. \
**Reference Handling:** Uploaded precedents, material references, site images, diagrams, and markups are represented as artifacts with metadata and source links. \
**Artifact Placement:** Board elements link back to source artifacts, branches, direction nodes, moves, commits, evaluations, and Hermes tasks. \
**Output Packages:** Draw assembles deterministic board packages for PNG/PDF export after required commits, model checks, and tension gates are satisfied.

### 3.2.3 Model Workspace

Model is the spatial validation surface. It handles ground-truth geometry, model-derived drawings, section cuts, area checks, and model consistency across design artifacts.

**Ground-Truth Workspace:** Model validates spatial truth and makes geometry-derived design state visible. \
**Model Affordances:** Moves can generate massing from a committed branch, cut floor plans, cut sections, validate render perspective, compare area against program, rebuild after a branch commit, or check privacy/view conditions. \
**Rhino Compute Integration:** Rhino Compute is invoked by typed model and validation moves. It is not exposed as a raw everyday agent choice. \
**Geometry-Derived Features:** Model analysis can measure area, view orientation, solar exposure, adjacency, circulation length, section depth, openness, privacy zones, and other spatial features. \
**Spatial QA:** Agents use model state to check consistency across plans, sections, renders, diagrams, boards, and commitments. \
**Versioned Models:** Model artifacts are versioned and linked to the moves, branches, commits, Hermes tasks, feature evaluations, direction nodes, and validation events that created them.

### 3.2.4 Architect Workspace

Architect is the high-level direction field. It shapes the design world through Object, Subject, Vector, Boundary, and Seed nodes plus links, snapshots, overlays, field modes, branches, and Agent Direction State.

**Direction Field:** Architect shapes Object, Subject, Vector, Boundary, and Seed nodes plus links, snapshots, and operating direction. \
**Flat 2D Graph:** The main view is a flat XY direction field. X and Y have no fixed axis meaning; proximity, links, tags, color family, label density, lock state, and value vectors explain relationships. \
**Direction Nodes:** Nodes have five fixed primary types: Object, Subject, Vector, Boundary, and Seed. Concepts, intent, facts, constraints, references, taste, exploration, risk, atmosphere, evidence, systems, structure, material, output goals, design options, artifacts, renders, models, and iterations are live subcategories, tags, overlays, payloads, or linked artifacts rather than primary node types. \
**Node Operations:** Users can create, read, update, delete, move, link, duplicate, lock, tag, fork, collapse, expand, compare, disable, and focus nodes. \
**Parent and Sub-Nodes:** Parent nodes contain related design meaning without becoming visual boxes. Seed nodes can gather renders, models, plans, sections, sketches, prompts, references, critiques, and output files as artifacts or child records without changing their primary type. \
**Soft Clusters:** Clusters form through proximity, tags, value similarity, links, and parent-child structure. Intent, Truth, Constraints, References, Taste, Exploration, Risk, Atmosphere, Systems, Structure, Material, Evidence, Output, and Concept Options are overlays or filters that can overlap; they are not hard ontology. \
**Link Semantics:** Links express influence, dependency, evidence, reference, iteration, conflict, lineage, and output flow. Link state can be strong, weak, locked, provisional, inherited, or broken. \
**Field Modes:** Conflict Scan, Taste Isolation, Truth Filter, Output Map, Branch Compare, and Influence Map change emphasis without changing underlying project data. \
**Evolution Rail:** Saved direction states record graph layout, active nodes, locks, links, collapsed parents, expanded branches, selected field mode, concept states, and Agent Direction State. \
**Agent Direction Output:** Architect outputs Agent Direction State and Design Exploration Graph data that guide the AffordanceCompiler, ContextDistiller, EvaluatorRegistry, MoveCompiler, and Hermes task packets.

### 3.2.5 Shared Workspace Controls

All workspaces share supporting controls without becoming additional primary modes.

**Inspector:** Shows selected object metadata, scores, rationale, linked artifacts, branch/tension/commit links, approvals, task logs, raw JSON, and previews. \
**Artifact Browser:** Shows generated and uploaded artifacts with lineage, validation state, branch links, and commit links. \
**Approval Controls:** Approve, reject, annotate, or defer user-gated actions. \
**Event Stream:** Shows important commands, move progress, artifact registration, evaluation results, bridge events, supervisor warnings, and commit events. \
**Status Bar:** Shows active move, Hermes task group status, bridge status, unresolved critical tensions, and finalization readiness.
