# Chapter 3.2 - Feature List

## 3.2.0 Overview

The A.A.S. application has exactly four primary workspaces: Chat, Draw, Model, and Architect. All four read derived WorldState and write canonical graph state through typed backend commands. Hermes remains the execution substrate behind the visible workspaces and uses the same backend write path.

### 3.2.1 Architect Mode

**Direction Field:** Architect Mode is the high-level AI direction interface. It shapes Object, Subject, Vector, Boundary, and Seed nodes plus links, snapshots, and operating direction. \
**Flat 2D Graph:** The main view is a flat XY direction field. X and Y have no fixed axis meaning; proximity, links, tags, color family, label density, lock state, and value vectors explain relationships. \
**Direction Nodes:** Nodes have five hard primary types: Object, Subject, Vector, Boundary, and Seed. Concepts, intent, facts, constraints, references, taste, exploration, risk, atmosphere, evidence, systems, structure, material, output goals, design options, artifacts, renders, models, and iterations are live subcategories, tags, overlays, payloads, or linked artifacts rather than primary node types. \
**Node Operations:** Users can create, read, update, delete, move, link, duplicate, lock, tag, fork, collapse, expand, compare, disable, and focus nodes. \
**Parent and Sub-Nodes:** Parent nodes contain related design meaning without becoming visual boxes. Seed nodes can gather renders, models, plans, sections, sketches, prompts, references, critiques, and output files as artifacts or child records without changing their primary type. \
**Soft Clusters:** Clusters form through proximity, tags, value similarity, links, and parent-child structure. Domains such as Intent, Truth, Constraints, References, Taste, Exploration, Risk, Atmosphere, Systems, Structure, Material, Evidence, Output, and Concept Options are overlays or filters that can overlap; they are not hard ontology. \
**Link Semantics:** Links express influence, dependency, evidence, reference, iteration, conflict, lineage, and output flow. Link state can be strong, weak, locked, provisional, inherited, or broken. \
**Field Modes:** Conflict Scan, Taste Isolation, Truth Filter, Output Map, Branch Compare, and Influence Map change emphasis without changing underlying project data. \
**Evolution Rail:** Saved direction states record graph layout, active nodes, locks, links, collapsed parents, expanded branches, selected field mode, concept states, and Agent Direction State. \
**Agent Direction Output:** Architect Mode outputs an Agent Direction State and Design Exploration Graph that guide the AffordanceCompiler, ContextDistiller, EvaluatorRegistry, MoveCompiler, and Hermes task packets.

### 3.2.2 Draw Mode

**Visual Composition Workspace:** Draw Mode is the board and visual composition workspace for references, sketches, prompt notes, material swatches, image bays, diagrams, plan layouts, section layouts, render studies, and board packages. \
**Board Authoring:** Users arrange artifacts into visual narratives while preserving artifact lineage, branch links, commit links, and validation state. \
**Image and Prompt Work:** Draw Mode can create or refine image prompts, compare generated studies, annotate image bays, and package visual constraints for representation moves. \
**Reference Handling:** Uploaded precedents, material references, site images, diagrams, and markups are represented as artifacts with metadata and source links. \
**Output Packages:** Draw Mode assembles deterministic board packages for PNG/PDF export after required commits, model checks, and tension gates are satisfied.

### 3.2.3 Chat Mode

**Conversation Layer:** Chat is used for explanations, questions, corrections, options, approvals, and conversational steering. \
**WorldState-Linked Messages:** Agent messages can reference direction nodes, branches, tensions, commits, artifacts, evaluator outputs, and move results instead of making chat prose durable state. \
**Move Presentation:** Agents can present available moves, explain scoring, request approvals, and justify overrides in chat. \
**Preference Awareness:** Chat can surface which scoped preferences influenced an answer, such as a project commit, current prompt, user preference, or team standard. \
**Approval Flow:** High-impact commits, branch kills, expensive generation batches, finalization, reverts, preference conflicts, and overwrites can request user approval through chat and shared approval controls.

### 3.2.4 Model Mode

**Ground-Truth Workspace:** Model Mode is the validation environment for spatial truth. \
**Model Affordances:** Moves can generate massing from a committed branch, cut floor plans, cut sections, validate render perspective, compare area against program, or rebuild after a branch commit. \
**Rhino Compute Integration:** Rhino Compute is invoked by MoveExecutor when a move requires geometry computation. It is not exposed as a raw everyday agent choice. \
**Geometry-Derived Features:** Model analysis can measure area, view orientation, solar exposure, adjacency, circulation length, section depth, openness, privacy zones, and other features. \
**Spatial QA:** Agents use model state to check consistency across plans, sections, renders, diagrams, boards, and commitments. \
**Versioned Models:** Model artifacts are versioned and linked to the moves, branches, commits, Hermes tasks, feature evaluations, direction nodes, and validation events that created them.
