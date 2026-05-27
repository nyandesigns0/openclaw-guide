# Chapter 3.6 - Frontend

## 3.6.0 Overview

The A.A.S. frontend is a four-workspace operator console. The only primary workspaces are Chat, Draw, Model, and Architect. Each workspace reads derived WorldState, Agent Direction State, Design Exploration Graph, artifact registry, approvals, feature pressures, graph events, and Hermes execution state through the backend. The frontend is a live view and local working surface, not a source of truth.

### 3.6.1 General UI Elements

**Application Shell:** Left project/session sidebar, top project/run bar, center workspace, right inspector, and bottom status/event/task bar. \
**Workspace Tabs:** The top-level workspace tabs are Chat, Draw, Model, and Architect in that console order. No other feature should be promoted to a primary mode. \
**Left Sidebar:** Projects, sessions, workspace tabs, saved direction states, recent artifacts, and pinned project references. \
**Top Bar:** Active project, active session, run state, selected field mode, Hermes bridge status, recompute, save snapshot, execute, and approval indicators. \
**Center Workspace:** Renders the selected workspace from backend snapshot plus events. Local edits may be optimistic, but persisted truth changes only after backend command success. \
**Right Inspector:** Selected object details, metadata, scores, feature deltas, rationale, linked artifacts, direction links, Hermes task logs, approvals, raw JSON, and file preview when relevant. \
**Bottom Bar:** System status, event stream summary, active move progress, Hermes task group status, direction snapshot rail, and commit preview.

### 3.6.2 Chat Workspace

**Conversation Thread:** Chronological user and agent messages with role attribution and links to moves, direction nodes, branches, tensions, commits, artifacts, evaluations, and Hermes tasks. \
**Message Composer:** Text, references, uploads, selected objects, and move approvals can be sent from one composer. \
**Move Cards:** Compact presentations of available moves, score explanations, risks, approval requirements, expected feature effects, and execute controls. \
**Approval Controls:** Inline approve, reject, annotate, or defer actions for user-gated moves, commits, preference conflicts, and risky execution. \
**Preference Source Badges:** Messages can show source badges such as current prompt, session preference, user preference, team standard, or project commit. \
**World Sync:** Chat actions update the backend graph through typed commands and then receive resulting events. Chat prose alone is never canonical project truth.

### 3.6.3 Draw Workspace

**Board Canvas:** 2D composition workspace for boards, references, sketches, plan layouts, section layouts, diagrams, image bays, prompt notes, and material swatches. \
**Artifact Placement:** Users place persisted artifacts on boards while preserving source links, branch links, direction-node links, move lineage, commit state, and validation status. \
**Image Bay:** Generated studies, precedent images, render candidates, masks, crops, and segmentation QA outputs can be compared and annotated. \
**Layout Tools:** Frames, grids, alignment controls, scale handles, crop controls, layer order, grouping, labels, and export-safe board boundaries support repeatable board assembly. \
**Prompt Notes:** Visual prompts and constraints can be attached to image bays, artifacts, or direction nodes so representation moves receive structured context. \
**Board Packages:** Draw Mode exports deterministic board packages only when required artifacts, commits, model checks, and critical tension gates are satisfied.

### 3.6.4 Model Workspace

**3D Viewer:** WebGL model workspace with orbit, pan, zoom, shading, wireframe, section, plan-cut, and analysis controls. \
**Ground-Truth Status:** Displays whether model state is none, pending, available, outdated, invalid, hypothesis, created, or validated. \
**Model Affordances:** Controls to generate massing, cut plans, cut sections, compare area, rebuild after commit, evaluate privacy/view, and validate render perspective. \
**Feature Readouts:** Shows geometry-derived features such as area, adjacency, view orientation, solar exposure, circulation length, openness, and privacy zones. \
**Layer and Measurement Tools:** Layer toggles, isolation, dimensions, areas, section planes, annotations, and saved camera views. \
**Artifact Links:** Model outputs link back to moves, branches, tensions, commits, direction nodes, Hermes tasks, evaluator outputs, and validation events.

### 3.6.5 Architect Workspace

**Flat Direction Field:** Architect Mode renders a flat 2D direction graph. Node position is relational, not axis-based; X and Y do not mean stable/speculative or grounded/atmospheric. \
**Direction Nodes:** Nodes use one fixed primary type, icon, color family, label, live subcategory, tags, influence weight, confidence state, lock state, parent binding, child count, links, and metadata. The primary type is Object, Subject, Vector, Boundary, or Seed. \
**Ontology Visual Language:** Object, Subject, Vector, Boundary, and Seed receive stable icon and color families so users can read the field quickly. Subcategories may influence badges, chips, labels, or filters, but they must not override primary type identity. \
**Inspector Ontology Controls:** The inspector exposes primary type as a fixed enum and subcategory as a live library term. Users and agents may propose, merge, archive, or restore subcategories through governance flows, but cannot create new primary types in normal editing. \
**Node Gestures:** Users can create, edit, move, link, duplicate, delete, lock, disable, tag, fork, collapse, expand, compare, select, marquee select, focus, pan, zoom, and search. \
**Radial Command Menu:** Node click opens edit, duplicate, link, delete, lock, disable, focus, fork, collapse, and expand controls. \
**Parent and Sub-Nodes:** Collapsed parents show child count, status, and dominant color family. Expanded parents reveal children around the parent using local layout rules. \
**Soft Clusters:** Intent, Truth, Constraints, References, Taste, Exploration, Risk, Atmosphere, Systems, Structure, Material, Evidence, Output, and Concept Options appear as soft overlapping overlays or filters, not hard containers or node types. \
**Link Rendering:** Influence, dependency, evidence, reference, iteration, conflict, and output links are readable through stroke, dash, opacity, color, and endpoint markers. \
**Field Modes:** Conflict Scan, Taste Isolation, Truth Filter, Output Map, Branch Compare, and Influence Map emphasize different graph relationships without changing underlying data. \
**Evolution Rail:** Saved states, forks, restores, rejected paths, committed changes, active branches, collapsed parents, expanded branches, field mode, and layout snapshots are visible as direction history. \
**Agent Direction State:** The current graph compiles into the Agent Direction State and Design Exploration Graph that guide move generation, context distillation, model work, draw work, and Hermes execution packets.

### 3.6.6 Live Sync and Optimistic State

**Snapshot Hydration:** The frontend loads project/session context, derived WorldState, direction graph records, active approvals, and `last_event_id` during bootstrap. \
**Event Application:** After hydration, the frontend should apply `graph.event` messages to local stores instead of refetching the whole graph after every change. \
**Reconnect Rule:** On reconnect, the frontend sends `last_event_id`. The backend returns missed events when possible or a full snapshot when the event gap is too old. \
**Working Graph:** The dashboard maintains a local working graph for optimistic edits. This graph is disposable and must reconcile against backend events. \
**Optimistic Drag:** Node dragging updates the UI immediately, then sends `move_node` with the current version. Success keeps the local position; failure rolls back or merges with the authoritative event. \
**Conflict Handling:** Position edits can use last-write-wins. Semantic edits such as title, summary, type, status, lock state, merge, split, or delete require `expectedVersion` and must surface `409` conflicts for user or agent resolution. \
**No Direct Hermes State:** The dashboard never treats Hermes task memory, local worker cache, or profile state as project truth. Hermes status appears only through backend events and task bindings.
