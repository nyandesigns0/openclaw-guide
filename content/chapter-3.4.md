# Chapter 3.4 - Frontend

## 3.4.0 Overview

The A.A.S. frontend is a spatial operator console centered on the Field Navigator. The application keeps a left project/session shell, a center field workspace, a right inspector, and a bottom timeline/commit/task preview, with Chat, Model Mode, Trace View, and Move Library View available as mode views over the same WorldState.

### 3.4.1 General UI Elements

**Application Shell:** Left sidebar, top project/run bar, center workspace, right inspector, and bottom status/timeline/task bar. \
**Left Sidebar:** Projects, sessions, modes, saved views, recent field states, and move-library access. \
**Top Bar:** Active project, active session, run state, field mode, Hermes bridge status, recompute, save, execute, and approval indicators. \
**Center Workspace:** Field Navigator by default, with Chat, Model, Trace, and Move Library views available without changing the underlying WorldState. \
**Right Inspector:** Object details, scores, feature deltas, rationale, linked artifacts, Hermes task logs, approvals, raw JSON, file preview, and terminal/tool output when relevant. \
**Bottom Bar:** System status, mini timeline, active move progress, event stream summary, Hermes task group status, and commit spine preview.

### 3.4.2 Field Navigator UI Elements

**Design Field Canvas:** A 2.5D or 3D interactive map showing the live design field. \
**Intent Core:** Central focus object showing current intent through the objects pulled toward it. \
**Field Axes:** Optional spatial axes for certainty, commitment, artifact completeness, risk, design maturity, feature pressure, or elegance. \
**Commit Spine:** A stable spine of committed decisions, rationale, evidence, affected artifacts, reversibility, and downstream constraints. \
**Affordance Wheel:** Contextual radial move menu around selected field objects. \
**Move Nodes:** Available and blocked affordances represented as field particles or nodes with score, cost, risk, approval, reversibility, feature effects, and elegance cues. \
**Branch Clusters:** Design hypotheses represented as cluster hulls containing artifacts, tensions, evidence, weaknesses, feature scores, and next recommended move. \
**Branch Comparison Mode:** A comparison zone for two or three branches showing shared tensions, unique strengths, risks, artifact completeness, ground-truth readiness, feature deltas, and merge previews. \
**Tension Nodes:** Stress objects connected to affected branches and artifacts, with severity shown by color, size, and motion. \
**Feature Pressure Nodes:** Registered features can appear as pressure nodes or overlays so the user sees what the system is trying to improve without reading a full score matrix. \
**Hermes Agent Presence:** Hermes profiles appear as lightweight probes or cursors with states for idle, ready, running, heartbeat, blocked, retrying, critiquing, validating, and completed.

### 3.4.3 Chat Mode UI Elements

**Conversation Thread:** Chronological user and agent messages with role attribution and links to moves, branches, tensions, commits, artifacts, evaluations, and Hermes tasks. \
**Move Cards:** Compact presentations of available moves, score explanations, risks, approval requirements, expected feature effects, and execute controls. \
**Approval Controls:** Inline approve, reject, annotate, or defer actions for user-gated moves, commits, preference conflicts, and risky execution. \
**Preference Source Badges:** Messages can show source badges such as current prompt, session preference, user preference, team standard, or project commit. \
**Artifact References:** Chat messages reference persisted artifacts rather than embedding state in prose. \
**World Sync:** Any chat action updates the Field Navigator; any field action can surface chat-visible reasoning and status.

### 3.4.4 Model Mode UI Elements

**3D Viewer:** WebGL model workspace with orbit, pan, zoom, shading, wireframe, section, plan-cut, and analysis controls. \
**Ground-Truth Status:** Displays whether model state is none, pending, available, outdated, invalid, hypothesis, created, or validated. \
**Model Affordances:** Controls to generate massing, cut plans, cut sections, compare area, rebuild after commit, evaluate privacy/view, and validate render perspective. \
**Feature Readouts:** Shows geometry-derived features such as area, adjacency, view orientation, solar exposure, circulation length, openness, and privacy zones. \
**Layer and Measurement Tools:** Layer toggles, isolation, dimensions, areas, section planes, and annotations. \
**Artifact Links:** Model outputs link back to moves, branches, tensions, commits, Hermes tasks, evaluator outputs, and validation events.

### 3.4.5 Trace View UI Elements

**Move History Graph:** Shows executed moves, dependencies, retries, failures, approvals, and resulting artifacts. \
**Hermes Task Graph:** Shows Kanban task groups, assigned profiles, dependencies, task state, comments, logs, and artifact paths. \
**Event Timeline:** Displays stable product events and WorldState snapshots for replay. \
**Feature Delta Timeline:** Shows predicted versus measured deltas for key features across moves. \
**Debug Inspector:** Shows raw payloads, blocked reasons, supervisor warnings, validation failures, evaluator results, and execution logs. \
**Replay Controls:** Scrub through commit history and field state evolution.

### 3.4.6 Move Library View UI Elements

**Library Columns:** Stable, sandbox, proposed, and deprecated move patterns. \
**Pattern Inspector:** Shows primitive type, domain, preconditions, inputs, outputs, expected effects, scoring hints, execution templates, validation tests, examples, success stats, and failure modes. \
**Sandbox Results:** Shows pattern runs against saved WorldState snapshots. \
**Curator Actions:** Promote, deprecate, merge duplicate, request test, or archive pattern. \
**Sensitivity Matrix View:** Shows expected effects from move patterns to registered features and measured deltas from evaluator feedback.
