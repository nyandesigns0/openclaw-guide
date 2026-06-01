# Chapter 4.2 - Current Implementation State

## 4.2.0 Overview

Chapter 4.1 defines what the A.A.S. implementation phases should build. This chapter records where the current A.A.S. frontend actually stands after inspecting `C:\Code\aas-frontend` and its reference documentation.

The current implementation is no longer only a visual mock. It is a Next.js 16 / React 19 four-mode operator console with real local server-route behavior in Draw, a server-mediated Hermes bridge in Chat, a rich but client-local Architect direction field, and a mostly visual Model workspace. It is best understood as a local A.A.S. prototype with strong Draw and Chat vertical slices, not yet the full Field Runtime described in Chapters 3 and 4.1.

The most important distinction is:

**Chapter 4.1:** the intended phased implementation plan. \
**Chapter 4.2:** the current implementation state measured against that plan. \
**Current maturity:** beyond a static frontend shell, but still short of a unified backend-owned WorldState, affordance engine, move library, branch/tension/commit governance, evaluator layer, and production hardening.

### 4.2.1 Current System Shape

The current `aas-frontend` app is organized around one persistent shell with four workspace modes:

| Mode | Current state | Implementation reading |
|------|---------------|------------------------|
| Chat | Functional Hermes bridge | Server routes proxy Hermes health, sessions, messages, streaming, and stop calls. Chat injects Draw world context into Hermes turns. |
| Draw | Strongest implemented slice | Fabric board editor, dashboard, templates, save/autosave, import/export, upload, Unsplash, Gemini/Nanobanana image tools, local artifact records, events, and command envelopes. |
| Model | Visual mock | CSS/SVG wireframe viewport and panels exist, but there is no real geometry engine, Rhino Compute flow, model artifact registry, or validation runtime. |
| Architect | Rich client-side mock | Direction-field graph, nodes, links, snapshots, field modes, inspector, and interactions exist through `useArchitectMockState`, but state is not persisted to backend WorldState. |

The current app has a canonical local Draw scope:

```text
projectId = aas-local-project
sessionId = aas-local-session
projectName = Desert Artist Retreat
```

Draw writes local A.A.S.-shaped records under `.aas-data/` through Next.js route handlers. In production, artifact bytes can use Supabase Storage when configured, and a Supabase migration exists for Draw persistence, but the inspected state still treats the local JSON store as the active runtime store.

The active architecture is therefore:

```text
User
  -> AppShell
  -> Chat / Draw / Model / Architect
  -> Next.js route handlers
  -> local Draw store / artifact storage / Hermes proxy
```

This is useful, but it is not yet:

```text
User
  -> A.A.S. Backend Control Plane
  -> Field Runtime
  -> WorldState / AffordanceCompiler / MoveCompiler
  -> Hermes task packets
  -> artifacts / evaluations / commits / replay
```

### 4.2.2 What Is Implemented Now

**Shell and navigation:** The app has a persistent shell with Sidebar, TopBar, RightPanel, StatusBar, mode switching, Draw route synchronization, shared viewport controls, and active mode persistence. Legacy `script` mode is migrated to `architect` in local storage. The Script React Flow code still exists, but it is not mounted as a primary workspace.

**Draw workspace:** Draw is the most complete local prototype. It has board dashboard views, preset and custom canvas creation, template gallery, a Fabric.js editor, object selection, movement, resizing, layer ordering, undo/redo, keyboard shortcuts, text and shape tools, freehand drawing, image upload, Unsplash search, AI image generation, background removal, manual save, autosave, refresh recovery, PNG export, JSON export, JSON import, and artifact registry panels.

**Draw truth path:** Draw uses TypeScript contracts for boards, folders, layers, artifacts, artifact versions, artifact links, events, commands, templates, and project references. Durable edits pass through server routes or command envelopes and write A.A.S.-compatible records. Fabric JSON is treated as editable source. Thumbnails, exports, uploads, Unsplash images, and AI outputs are treated as artifacts.

**Draw events and commands:** Draw emits stable event names such as `aas.draw.board.saved`, `aas.draw.board.autosaved`, `aas.draw.asset.uploaded`, `aas.draw.asset.generated`, `aas.draw.export.created`, `aas.artifact.created`, and `aas.artifact.version.created`. `GET /api/projects/[projectId]/commands` exposes a guarded command affordance catalog. `POST /api/projects/[projectId]/commands` accepts Hermes-style envelopes for board creation, source saves, patch operations, asset registration, exports, AI operations, and artifact links.

**Chat workspace:** Chat now has a real server-mediated Hermes bridge. The browser calls same-origin Next routes. The Next server calls Hermes with `HERMES_API_URL` and server-only `HERMES_API_KEY`. Chat supports Hermes sessions, message history, streaming assistant/tool/run events, stop calls, agent/status projection, health display, and `@` references to Draw folders, boards, and layers.

**Chat context bridge:** Before a Chat turn, the server derives a Draw world summary from the current local Draw records and includes that as Hermes instructions. This is not a full Agent Brief, but it is an important partial bridge from A.A.S. project state into Hermes execution.

**Architect workspace:** Architect has the strongest interaction model after Draw, but it remains client-local. The graph supports design nodes, typed links, field modes, snapshots, forks, locks, disabled states, search, inspector state, and direction-state export. The current `architect-api-stub.ts` explicitly marks backend integration as future work.

**Model workspace:** Model is a visual placeholder. It communicates the intended ground-truth validation workspace, but it does not yet load real models, call Rhino Compute, register model artifacts, produce plan/section cuts, or validate renders against geometry.

**Auth and storage:** Draw auth uses signed actor headers or cookies with an HMAC secret derived from `BETTER_AUTH_SECRET`, with local development fallback to `local-operator`. This is not real Better Auth session membership. Artifact bytes are stored locally in development/test and can use Supabase Storage in production when environment variables are present.

**Tests:** The repo has focused test scripts for Draw, Chat, and Architect. Draw has broad route, store, auth, artifact, command, import/export, upload, AI-key, and patch coverage. Chat has API and route-handler tests. Architect has mock-state behavior tests. Browser E2E, live Supabase, live provider, real Hermes environment, and Model tests are still gaps.

### 4.2.3 Phase-by-Phase Status Against 4.1

Percentages below are rough estimates measured against each phase's **4.1 acceptance criteria**, not calendar progress. They reflect how much of the planned phase capability exists in the inspected `aas-frontend` codebase today.

| 4.1 Phase | Est. complete | Planned target | Current implementation state |
|-----------|---------------|----------------|------------------------------|
| A - Foundation Truth | ~22% | Backend-owned projects, sessions, direction graph, events, artifacts, approvals, preferences, world states, command envelope, reconstructable product truth | Partial local prototype. Draw has local backend-shaped records, artifact versions, artifact links, events, command envelopes, expected versions, and a derived world route. This truth layer is Draw-centered, single-project, local JSON-backed, and not yet the full A.A.S. product truth for Architect, Chat, Model, approvals, preferences, or WorldState. |
| B - Workspace Skeleton | ~58% | Chat, Draw, Model, and Architect read one backend state and submit backend commands | Strong shell, uneven truth. The four-mode shell exists. Draw reads/writes through server routes. Chat can read Draw context and talk to Hermes. Architect and Model mostly remain workspace-local or mock surfaces. |
| C - Field Runtime Core | ~8% | WorldState compiler, feature registry, affordances, blocked moves, scoring, move explanations | Mostly not implemented. The Draw world route derives a summary, but there is no canonical WorldState compiler, FeatureRegistry, AffordanceCompiler, IntentGradient, blocked-move model, or score explanation system. |
| D - Move Library | ~12% | Governed primitives and reusable architectural move patterns | Minimal surface only. Draw command operations resemble typed actions, and the command route exposes an affordance catalog, but there is no general move primitive registry, pattern lifecycle, constrained precondition engine, typed effects layer, or architectural move compiler. |
| E - Hermes Bridge | ~38% | Selected move becomes Hermes work and returns status, logs, artifacts, and structured output through A.A.S. bridge contracts | Partial and important. Chat has a live server-mediated Hermes bridge with streaming and health. Hermes can address Draw through command envelopes. However, the bridge is not yet driven by selected A.A.S. moves, task packets, task bindings, artifact registration contracts, or full status translation from a Field Runtime. |
| F - Context and Memory | ~18% | Agent Briefs, scoped preferences, profile packs, retrieval context, source manifests, and memory boundaries | Early partial. Chat injects a compact Draw world summary into Hermes instructions. There is no full ContextDistiller, Agent Brief schema in runtime, scoped preference precedence, source manifest system, memory retrieval governance, or profile/skill pack lifecycle inside A.A.S. |
| G - Evaluation and Artifacts | ~42% | Artifacts versioned, linked, validated, evaluated, and reused downstream | Partial and strongest inside Draw. Draw artifacts, source versions, thumbnails, exports, uploads, AI outputs, local content routes, and artifact links exist. What is missing is the broader evaluator registry, feature scores, validation gates, model/render checks, deterministic board package evaluation, and downstream move generation based on artifact evaluations. |
| H - Branches, Tensions, and Commits | ~5% | Branch ecology, tension lifecycle, Commitment Ledger, comparison, merge, kill, finalization gates | Mostly not implemented. Architect mock data can visually express concepts, risks, links, and snapshots, and Draw artifact links can target branch/tension/commit IDs by string. There is no persisted branch, tension, or commit governance layer. |
| I - Hardening and Replay | ~22% | Recovery, audit, undo as inverse command, replay, stale client recovery, bridge failure recovery, supervisor warnings | Partial local hardening. Draw protects against stale saves with `expectedVersion`, returns 409 conflicts, blocks autosave after malformed source hydration, and records events. There is no full event replay, inverse-command undo, cross-workspace recovery model, supervisor warning system, or Hermes task failure recovery loop. |
| J - Search, Learning, and Curation | ~0% | Quality-diversity archives, information gain, novelty, bandits, trace mining, move pattern promotion | Not implemented. No learning loop, curator workflow, novelty scoring, bandits, trace mining, or promoted pattern lifecycle exists in the inspected app. |
| K - Cleaner Hermes Surfaces | ~8% | MCP/plugin/direct API may replace bridge internals without changing A.A.S. contracts | Future-facing. The current Hermes integration is useful but direct to the Hermes API through Next route handlers. There is no alternate MCP/plugin/direct API abstraction layer beyond the current server proxy and command surface. |

**Overall weighted estimate:** roughly **18–20%** of the full 4.1 phase plan is implemented end to end. The repo is furthest along in Phase B (shell), Phase G (Draw artifacts), and Phase E (Chat-Hermes bridge). It is furthest behind in Phases C, D, H, and J, which depend on a unified Field Runtime and governed product truth.

The current phase position is therefore not a simple linear completion of 4.1. The repo has advanced far in selected Phase B, E, and G surfaces, while foundational Phase A is only partially present and Phases C/D/H/I/J/K remain largely unbuilt. This is acceptable as a prototype history, but the next work should close the foundation gap rather than continue adding isolated workspace features.

### 4.2.4 Current Demo Loop

The current working local demo loop is Draw-centered:

```text
open A.A.S.
  -> enter Draw
  -> create or open a board
  -> edit Fabric canvas
  -> save or autosave source JSON
  -> write board / artifact / artifact version / event records
  -> inspect artifacts, events, links, and board state
  -> export PNG or JSON
  -> reference Draw records from Chat
  -> send Chat turn through Hermes bridge
  -> include Draw world summary in Hermes instructions
  -> optionally call Draw command route from Hermes-style agent work
```

This is a real prototype loop because state survives outside the React component tree and server routes mediate durable writes. It is not yet the full 4.1 demonstration loop:

```text
command
  -> graph row
  -> event
  -> WorldState
  -> affordance
  -> move
  -> Hermes task
  -> log / artifact
  -> bridge event
  -> artifact registration
  -> evaluation
  -> next WorldState
```

The missing center is the Field Runtime. Draw can create and persist artifacts. Chat can reach Hermes. What does not yet exist is the governed layer that turns backend truth into meaningful moves, packages those moves for Hermes, evaluates results, and updates a canonical WorldState across all workspaces.

### 4.2.5 Architecture Mismatches and Gaps

**Frontend-only documentation is stale:** Some A.A.S. docs still describe the repo as strictly frontend-only and mock-state-only. That was true for an earlier milestone. The current Draw and Chat implementations include real Next.js route handlers, local persistence, local artifact content storage, server-only provider keys, and Hermes proxying. Chapter 4.2 should treat the current code and progress logs as the current implementation state, while still preserving the architecture rule that long-term product truth belongs in a real backend control plane.

**Single-project local runtime:** The app is scoped to `aas-local-project` and `aas-local-session`. That makes the local prototype coherent, but it is not multi-project, multi-user, or production-tenanted.

**Local truth is Draw-centered:** Draw has the strongest command/event/artifact model. Architect direction, Model geometry, Chat messages, approvals, preferences, branches, tensions, commits, and WorldState are not yet first-class persisted A.A.S. records in the same truth layer.

**Auth is a development boundary:** The current HMAC actor signing and local fallback are useful for local agent commands, but they are not real user authentication, project membership, or deployment-grade authorization.

**Hermes bridge is not yet move-native:** Chat can stream Hermes responses and Hermes can call Draw commands, but A.A.S. does not yet produce task packets from selected moves, bind tasks back to move records, translate worker logs into bridge events, or register Hermes artifacts through a full bridge contract.

**Model is not ground truth yet:** The Model workspace shows the intended UI language but does not create validated architectural geometry, model artifacts, plan cuts, section cuts, area checks, or render consistency checks.

**Supabase and providers need live verification:** The migration and storage path exist, and server-side Gemini/Unsplash paths exist, but production database migration, live provider success paths, and browser visual QA remain open.

**Field Runtime is still the main missing system:** WorldState, AffordanceCompiler, IntentGradient, ContextDistiller, MoveCompiler, TensionEngine, BranchEcology, CommitmentLedger, EvaluatorRegistry, Supervisor, replay, and learning remain target architecture rather than current implementation.

### 4.2.6 Practical Next Work

The next work should align with 4.1 rather than continue as disconnected feature growth.

| Priority | Phase alignment | Work |
|----------|-----------------|------|
| 1 | Phase A | Promote Draw's local truth pattern into a wider A.A.S. product truth layer: projects, sessions, direction graph, world snapshots, artifacts, events, approvals, preferences, and command envelope across all modes. |
| 2 | Phase B | Persist Architect direction nodes, links, snapshots, locks, field modes, and selected state through backend commands so Architect stops being client-only truth. |
| 3 | Phase C | Define the first real WorldState compiler from project, Draw, Architect, artifact, event, and Chat state. Generate basic available and blocked moves with explanation fields. |
| 4 | Phase D | Convert the Draw command catalog into a broader governed move primitive and move pattern registry with preconditions, effects, risk, cost, and output contracts. |
| 5 | Phase E | Replace ad hoc Chat context injection with move-to-Hermes task packets, task bindings, structured status translation, and bridge-controlled artifact registration. |
| 6 | Phase F | Add ContextDistiller and Agent Briefs with source manifests, scoped preferences, and memory boundaries. |
| 7 | Phase G | Expand Draw's artifact model into evaluation contracts, validation gates, model/render checks, and downstream move generation. |
| 8 | Phase H | Add persisted branches, tensions, commits, comparison, commit enforcement, and finalization gates. |
| 9 | Phase I | Build replay, inverse-command undo, stale-client recovery, failed-task recovery, and supervisor warnings on top of the event stream. |
| 10 | Phases J-K | Add learning, curation, trace mining, and cleaner Hermes integration surfaces only after the core truth and move loop is stable. |

The current implementation should be preserved as valuable evidence: Draw proves that local A.A.S.-compatible records and events can support a real workspace, and Chat proves that a server-mediated Hermes bridge can work. The next milestone is to connect those pieces through the missing A.A.S. runtime layer so every workspace stops being a separate island and starts becoming a view into one governed design world.
