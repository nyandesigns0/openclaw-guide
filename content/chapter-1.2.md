# Chapter 1.2 - Core System Capabilities

## 1.2.0 Overview

This chapter defines the core capabilities of the final A.A.S. system. These capabilities form one coherent product architecture: A.A.S. owns design intelligence and product truth; Hermes owns durable execution; the bridge connects them through task packets, task bindings, artifact registration, and event translation.

### 1.2.1 Product Capabilities

| Capability | Purpose |
|------------|---------|
| Four workspaces | Chat, Draw, Model, and Architect give the operator distinct ways to steer conversation, visual composition, spatial validation, and design direction |
| Direction field | Architect Mode represents design meaning through Object, Subject, Vector, Boundary, and Seed nodes |
| Shared inspector | Any selected object can expose metadata, lineage, scores, artifacts, approvals, logs, raw data, and related commits |
| Artifact registry | Generated and uploaded outputs are stored as traceable artifacts with lineage and validation state |
| Approval system | Risky moves, commits, branch actions, expensive work, finalization, and overwrites require explicit approval |
| Event history | Commands, moves, task updates, artifacts, evaluations, tensions, branches, commits, and warnings are recorded as inspectable events |

### 1.2.2 A.A.S. Field Runtime Capabilities

| Capability | Purpose |
|------------|---------|
| WorldState | Derived active design state compiled from graph truth, commits, artifacts, preferences, evaluations, and events |
| Affordance generation | Exposes meaningful legal next moves from the current design situation |
| Move scoring | Ranks moves by design gain, process fit, information value, novelty, risk, cost, governance, and elegance |
| Context distillation | Produces compact Agent Briefs for Hermes profiles so agents receive relevant context and output contracts |
| Move compilation | Converts selected A.A.S. moves into Hermes task packets, profile assignments, dependencies, and artifact contracts |
| Feature registry | Defines measurable design, process, execution, user-alignment, risk, and elegance variables |
| Evaluator contracts | Measures artifacts, branches, models, renders, boards, and concepts with evidence, confidence, and critique |
| Branch ecology | Maintains competing design hypotheses that can be developed, critiqued, compared, merged, killed, or committed |
| Tension engine | Tracks design contradictions and generates moves to resolve, defer, or elevate them |
| Commitment Ledger | Records project-truth decisions with rationale, evidence, consequences, reversibility, and approval metadata |

### 1.2.3 Hermes Capabilities

| Capability | Purpose |
|------------|---------|
| Specialist profiles | Durable agent bodies for research, concept, model, representation, critic, supervisor, and other roles |
| Kanban task execution | Durable coordination for task groups, dependencies, status, blocks, retries, comments, and handoffs |
| Dispatcher and workers | Assigns ready work to profiles and executes task packets through allowed tools and skills |
| Profile memory | Stores procedural lessons, role habits, and reusable execution knowledge without owning project truth |
| Skill packs | Teach profiles how to read A.A.S. packets, write artifacts, emit patches, critique, model, render, and validate |
| Logs and comments | Provide execution traces that A.A.S. can translate into events, warnings, and progress updates |
| Artifact output roots | Controlled locations where Hermes writes task outputs for A.A.S. ingestion and registration |

### 1.2.4 Bridge Capabilities

| Capability | Purpose |
|------------|---------|
| Profile binding | Maps A.A.S. roles and moves to Hermes profiles |
| Task packet generation | Writes compact task packets with Agent Briefs, output contracts, artifact roots, and safety rules |
| Task binding | Links A.A.S. moves and run records to Hermes task IDs and task groups |
| Kanban watcher | Observes Hermes task state and converts execution state into A.A.S. move status |
| Log watcher | Converts task logs and comments into stable A.A.S. progress, warning, and failure events |
| Artifact watcher | Registers Hermes-produced files as A.A.S. artifacts with lineage and metadata |
| Patch submission | Converts structured Hermes output into A.A.S. patches or commands |
| Recovery handling | Turns failures, stalls, missing artifacts, and conflicts into visible recovery moves or supervisor warnings |

### 1.2.5 Data and Governance Capabilities

| Capability | Purpose |
|------------|---------|
| Backend command pipe | All user, agent, Hermes, and maintenance writes enter one validation and transaction path |
| Versioning and conflicts | Semantic edits use expected versions and conflict recovery instead of silent overwrites |
| Scoped preferences | User, team, project, session, and prompt preferences are source-tracked and precedence-resolved |
| Artifact lineage | Outputs link to source artifacts, branches, tensions, commits, moves, evaluations, and Hermes tasks |
| Replay and audit | Events and snapshots make the design process inspectable and recoverable |
| Security boundary | Frontend never controls Hermes directly; Hermes never mutates A.A.S. truth directly |

### 1.2.6 Capability Rule

Every feature in A.A.S. should support one of three outcomes:

**Better Design State:** The system understands the architectural situation more clearly. \
**Better Design Work:** Hermes and specialized tools produce stronger, more traceable outputs. \
**Better Design Commitment:** The operator can decide, approve, reject, merge, or commit with evidence.

Features that do not improve design state, design work, or design commitment should remain supporting utilities rather than primary product concepts.
