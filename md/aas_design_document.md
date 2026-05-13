# A.A.S. Field Runtime — Affordance-Oriented Agent Environment

## 1. Executive Summary

A.A.S. should not be designed as a better graph editor. A graph assumes that the correct workflow can be predicted before the design task unfolds. Architectural production rarely works that way. Architectural work emerges through exploration, contradiction, critique, selection, commitment, and validation.

The new system should be an **Affordance-Oriented Agent Environment**: a runtime where the agent does not directly navigate a maze of tools, memories, files, and graph nodes. Instead, the environment continuously reads the current project state and exposes a small set of meaningful next moves.

The agent chooses among moves. The system maps the chosen move to tools, files, memory retrieval, validation, and execution.

This creates a new layer above AAS:

```text
AAS = body, files, tools, base workspace, memory substrate
A.A.S. Field Runtime = environment physics for architectural agents
```

The central product shift:

```text
Old model:
Human designs workflow -> agent executes graph

New model:
Human defines goal and values -> environment exposes moves -> agent navigates design field -> system executes safely
```

A.A.S. becomes a design world with action physics.

---

## 2. Design Problem

### 2.1 Why a graph is insufficient

A visual graph is useful for representing deterministic automation. It is less useful for agentic architectural design because the path is not known in advance.

A graph has these assumptions:

- Steps are known before execution.
- Dependencies are stable.
- The correct sequence can be encoded by the human.
- Agents are workers inside a predefined process.
- Parallelism is represented as branching structure.
- Failure recovery is another graph path.

Architectural design has different behavior:

- The useful next step changes after each discovery.
- The main problem is often unclear until a contradiction appears.
- Multiple design hypotheses should compete.
- Agents should critique and revise the process itself.
- Some ideas should die, merge, or become committed project truth.
- User intent evolves as artifacts become visible.

A graph can show what happened. It should not be the main way the agent thinks.

### 2.2 Why more memory categories are not enough

AAS already provides the foundation: agent body, world, workspace, and memory substrate. Adding more memory buckets does not solve the main problem. It can make the agent worse by forcing it to decide which memory tool to use, when to call it, and how to reconcile competing context fragments.

The problem is not lack of storage. The problem is lack of **environmental mediation**.

Agents should not manually browse every memory source. The environment should compile the relevant state into a small, task-specific brief and expose only meaningful next actions.

### 2.3 Core limitation to solve

Foundation models already contain broad world knowledge and can navigate many systems when given the right guidance. The bottleneck is not raw intelligence. The bottleneck is the agent's operating environment.

Current agent experience:

```text
Agent wakes up
Agent receives task
Agent sees many tools and files
Agent guesses what matters
Agent calls memory/tool/search
Agent produces output
Context degrades
Direction drifts
```

Target agent experience:

```text
Agent enters design field
Environment explains current situation
Environment exposes legal meaningful moves
Agent reasons among moves
System executes selected move
World state updates
Environment exposes new moves
```

---

## 3. Core Concept: Affordance Field

An **affordance** is a meaningful possible action presented by the environment.

The agent should not choose raw tools like `read_file`, `search_memory`, `call_rhino_compute`, or `generate_image`. The agent should choose architectural moves like:

- Generate 3 massing hypotheses.
- Ask user to confirm site assumption.
- Build section-first ground truth.
- Critique current concept.
- Commit courtyard scheme as design direction.
- Validate render against ground-truth model.
- Merge two branches into a hybrid proposal.

The system translates those moves into low-level operations.

### 3.1 Basic loop

```text
World state exists
Affordance Compiler reads world state
Compiler produces available moves
Context Distiller briefs agent
Agent selects move
Move Executor runs tools safely
World state updates
Critic evaluates result
New affordances appear
```

### 3.2 Why this is better

The affordance field gives agents freedom without chaos.

- Agent still reasons.
- Agent still chooses strategy.
- Agent can still propose unexpected paths.
- System keeps tool execution typed and safe.
- User can inspect and steer at the move level.
- Memory retrieval becomes hidden infrastructure, not agent burden.

---

## 4. System Name

The new orchestration layer should be called:

# A.A.S. Field Runtime

Alternate internal names:

- Affordance Field Runtime
- Design Field Runtime
- Agent Field Runtime
- AAS Field Engine

Recommended product language:

- **Field Runtime** for backend/runtime layer.
- **Situation Board** for UI layer.
- **Moves** for exposed agent actions.
- **Tensions** for unresolved design conflicts.
- **Branches** for competing hypotheses.
- **Commits** for project-truth decisions.

---

## 5. High-Level Architecture

```text
User
  -> A.A.S. Frontend
      -> Situation Board
      -> Chat
      -> Model
      -> Trace / Graph View
  -> A.A.S. Backend Control Plane
      -> SQL / Prisma
      -> Artifact Storage
      -> Event Stream
      -> Project State
  -> A.A.S. Field Runtime
      -> WorldState
      -> AffordanceCompiler
      -> ContextDistiller
      -> IntentGradient
      -> TensionEngine
      -> BranchEcology
      -> CommitmentLedger
      -> MoveExecutor
      -> Critic / Supervisor
  -> AAS
      -> Agents
      -> Workspace
      -> Memory substrate
      -> Tools
      -> Gateway
  -> External / Specialized Tools
      -> GPT Image V2
      -> Rhino Compute
      -> Segmentation
      -> Renderers
      -> Validators
```

### 5.1 Layer responsibilities

#### A.A.S. Frontend

Presents the user-facing operating environment: Situation Board, Chat, Model, artifacts, decisions, tensions, branches, moves, and execution trace.

#### Backend Control Plane

Owns product state, persistence, permissions, artifact records, run records, session records, and user-visible events.

#### Field Runtime

Creates the agent's operating physics. It decides what moves are available, how they are scored, what context is given to agents, how branches evolve, when decisions become project truth, and how execution maps to AAS/tool calls.

#### AAS

Provides base agent execution, files, memory substrate, workspace, tools, and gateway runtime.

#### External Tools

Perform specialized production work: image generation, geometry computation, segmentation, rendering, validation, and export.

---

## 6. Core Runtime Objects

## 6.1 WorldState

WorldState is the canonical state of the current design world. It is not simply memory. It is the currently active, structured representation of what the project is, what matters, what is unresolved, what exists, and what can happen next.

```ts
export interface WorldState {
  id: string
  projectId: string
  sessionId: string
  runId: string | null

  goal: GoalState
  currentIntent: IntentState
  projectState: ProjectState

  activeBranchId: string | null
  branches: Branch[]

  artifacts: ArtifactRef[]
  committedDecisions: Commit[]
  unresolvedTensions: Tension[]

  availableMoves: Affordance[]
  blockedMoves: BlockedMove[]

  activeConstraints: Constraint[]
  successMetrics: SuccessMetric[]

  recentEvents: RuntimeEvent[]
  openQuestions: Question[]
  riskRegister: Risk[]

  updatedAt: string
}
```

### 6.1.1 GoalState

```ts
export interface GoalState {
  userGoal: string
  normalizedGoal: string
  projectType: string | null
  desiredOutputs: string[]
  userValues: string[]
  nonGoals: string[]
  priorityStack: string[]
}
```

### 6.1.2 IntentState

```ts
export interface IntentState {
  phase:
    | 'intake'
    | 'research'
    | 'concept'
    | 'ground_truth'
    | 'development'
    | 'representation'
    | 'board_assembly'
    | 'validation'
    | 'delivery'

  focus: string
  activeQuestion: string | null
  currentTensionId: string | null
  desiredNextArtifact: string | null
}
```

### 6.1.3 ProjectState

```ts
export interface ProjectState {
  briefStatus: 'missing' | 'rough' | 'normalized' | 'approved'
  researchStatus: 'none' | 'partial' | 'sufficient' | 'stale'
  conceptStatus: 'none' | 'exploring' | 'selected' | 'committed'
  groundTruthStatus: 'none' | 'hypothesis' | 'model_created' | 'validated'
  boardStatus: 'none' | 'strategy' | 'draft' | 'qa' | 'final'
  modelStatus: 'none' | 'pending' | 'available' | 'outdated' | 'invalid'
}
```

---

## 6.2 Affordance

An affordance is an available meaningful move.

```ts
export interface Affordance {
  id: string
  label: string
  intent: string
  moveType: MoveType

  description: string
  preconditions: string[]
  expectedGain: ExpectedGain
  risk: RiskProfile
  cost: CostProfile

  requiredInputs: string[]
  resultingArtifacts: string[]
  requiredTools: string[]

  score: IntentScore
  blockingReason?: string

  recommendedAgentRole: string
  requiresUserApproval: boolean
  reversible: boolean

  createdAt: string
}
```

Example:

```json
{
  "id": "aff_003",
  "label": "Build section-first ground truth",
  "intent": "Resolve climate-driven spatial logic before plan generation",
  "moveType": "CREATE_ARTIFACT",
  "preconditions": ["Concept package exists", "Site/climate assumption exists"],
  "resultingArtifacts": ["section_anchor.md", "section_diagram.svg", "ground_truth_seed.json"],
  "requiredTools": ["reasoning_model", "diagram_renderer", "rhino_compute_optional"],
  "requiresUserApproval": false,
  "reversible": true
}
```

---

## 6.3 Move

A move is the agent-selected execution intent. The agent selects moves. The system maps moves to tools.

```ts
export type MoveType =
  | 'CREATE_ARTIFACT'
  | 'REFINE_ARTIFACT'
  | 'TEST_ASSUMPTION'
  | 'ASK_USER'
  | 'SPAWN_BRANCH'
  | 'DEVELOP_BRANCH'
  | 'CRITIQUE_BRANCH'
  | 'MERGE_BRANCH'
  | 'KILL_BRANCH'
  | 'VALIDATE'
  | 'COMMIT_DECISION'
  | 'REVERT_COMMIT'
  | 'REQUEST_TOOL_EXECUTION'
  | 'ESCALATE_RISK'

export interface Move {
  id: string
  affordanceId: string
  type: MoveType
  selectedByAgentId: string
  rationale: string
  expectedOutcome: string
  inputRefs: string[]
  targetRefs: string[]
  userApprovalStatus: 'not_required' | 'pending' | 'approved' | 'rejected'
  executionStatus: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
}
```

### 6.3.1 Move selection rule

The agent can select a recommended move or propose a new move.

If the agent proposes a new move, the Affordance Compiler must validate it:

```text
Agent proposes move
Compiler checks legality
Supervisor checks risk
User approval required if high-impact
MoveExecutor maps move to tools
```

---

## 6.4 IntentGradient

The IntentGradient scores possible moves against the current goal. It replaces graph edges as the primary directional mechanism.

```ts
export interface IntentScore {
  goalAlignment: number
  informationGain: number
  artifactProgress: number
  riskReduction: number
  designValue: number
  costEfficiency: number
  uncertaintyReduction: number
  userValueAlignment: number
  total: number
}
```

### 6.4.1 Scoring behavior

The scoring system should not pretend to be perfectly objective. It should be inspectable and overrideable.

Example scoring explanation:

```text
Move: Build section-first ground truth
Goal alignment: high
Information gain: medium
Artifact progress: high
Risk reduction: high
Design value: high
Cost: medium
Reason: current project has unresolved environmental and spatial tensions; section anchor can constrain plan, render, and model decisions.
```

### 6.4.2 Agent override

Agents can override the top-scored move, but must explain why.

```ts
export interface MoveOverride {
  selectedMoveId: string
  higherScoredMoveIds: string[]
  overrideReason: string
  acceptedBySupervisor: boolean
}
```

---

## 6.5 Tension

A tension is a structured design conflict. A.A.S. should treat design as tension resolution, not step completion.

```ts
export interface Tension {
  id: string
  conflict: string
  description: string
  affectedArtifacts: string[]
  affectedBranches: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_review' | 'resolved' | 'deferred'
  possibleResolutions: TensionResolution[]
  evidenceRefs: string[]
  createdByAgentId: string
  createdAt: string
}
```

Example:

```json
{
  "conflict": "Desert privacy vs panoramic openness",
  "affectedArtifacts": ["plan", "section", "hero_render"],
  "severity": "high",
  "possibleResolutions": [
    "Use inward courtyard with controlled horizon apertures",
    "Use elevated shade canopy with screened perimeter",
    "Use buried section with framed view cuts"
  ]
}
```

### 6.5.1 Tension Engine duties

The Tension Engine should:

- Detect contradictions.
- Track unresolved design conflicts.
- Link tensions to artifacts and branches.
- Generate moves that resolve tensions.
- Prevent finalization while critical tensions remain unresolved.

---

## 6.6 Branch

A branch is a competing design hypothesis.

```ts
export interface Branch {
  id: string
  label: string
  hypothesis: string
  status: 'active' | 'paused' | 'merged' | 'killed' | 'committed'

  parentBranchIds: string[]
  childBranchIds: string[]

  artifacts: ArtifactRef[]
  evidence: EvidenceRef[]
  weaknesses: string[]
  unresolvedTensions: string[]

  score: BranchScore
  nextRecommendedMoveId: string | null

  createdByAgentId: string
  createdAt: string
  updatedAt: string
}
```

Example branches:

```text
Branch A: Courtyard thermal-mass scheme
Branch B: Elevated shade canopy scheme
Branch C: Buried sectional scheme
```

### 6.6.1 BranchScore

```ts
export interface BranchScore {
  goalFit: number
  architecturalCoherence: number
  representationalStrength: number
  feasibility: number
  novelty: number
  userTasteFit: number
  groundTruthReadiness: number
  total: number
}
```

### 6.6.2 Branch lifecycle

```text
spawn -> develop -> critique -> compare -> kill / merge / commit
```

### 6.6.3 Why branches matter

Branch ecology uses the agent's computation advantage. Instead of forcing one early path, the system can develop several hypotheses in parallel, critique them, and select the best one.

This is closer to design studio behavior than a graph.

---

## 6.7 Commit

A commit is a decision that becomes project truth.

```ts
export interface Commit {
  id: string
  decision: string
  rationale: string
  evidenceRefs: string[]
  consequenceRefs: string[]
  affectedArtifacts: string[]
  affectedBranches: string[]
  reversible: boolean
  approvedBy: 'user' | 'supervisor' | 'system'
  approvalRef: string | null
  createdAt: string
}
```

### 6.7.1 Commitment rule

Agents can explore freely, but only committed decisions become canonical.

This creates decision physics:

```text
Speculation can branch.
Evidence can accumulate.
Critique can attack.
Only commits change project truth.
```

### 6.7.2 Example commit

```json
{
  "decision": "Use section-first ground truth as primary project anchor",
  "rationale": "The project is driven by climate, shade, and vertical light strategy; section better constrains these relationships than plan-first generation.",
  "affectedArtifacts": ["plan", "section", "massing_model", "hero_render"],
  "reversible": true,
  "approvedBy": "user"
}
```

---

## 6.8 ContextDistiller

The ContextDistiller turns WorldState into an Agent Brief. It hides memory complexity from the agent.

```text
WorldState + memory + artifacts + tools + recent events
  -> ContextDistiller
  -> Agent Brief
```

### 6.8.1 Agent Brief

```ts
export interface AgentBrief {
  agentId: string
  role: string
  currentGoal: string
  currentIntent: string
  activeBranch: Branch | null
  currentTension: Tension | null
  relevantCommits: Commit[]
  relevantArtifacts: ArtifactRef[]
  validMoves: Affordance[]
  blockedMoves: BlockedMove[]
  neededOutput: OutputContract
  warnings: string[]
}
```

### 6.8.2 Distillation rule

Agents should receive compact, relevant context. They should not be expected to call multiple memory tools unless the selected move explicitly requires deeper retrieval.

---

## 6.9 MoveExecutor

The MoveExecutor maps typed moves to AAS/tool operations.

```text
Move selected
  -> validate preconditions
  -> load required context
  -> choose tool chain
  -> execute through AAS
  -> capture artifacts
  -> update WorldState
  -> emit events
```

### 6.9.1 Example mapping

```text
Move: Build section-first ground truth
  -> read concept package
  -> read site/climate assumptions
  -> ask Design Development Agent for section logic
  -> call diagram renderer
  -> optionally call Rhino Compute
  -> write ground_truth_seed.json
  -> register artifacts
  -> update tensions
  -> generate next affordances
```

The agent chose the architectural move. The system handled plumbing.

---

## 6.10 Critic / Supervisor

The Critic and Supervisor are related but not identical.

### Supervisor

The Supervisor governs process integrity.

Responsibilities:

- Check move legality.
- Check safety and permissions.
- Enforce required approvals.
- Detect drift from goal.
- Detect unresolved critical tensions.
- Decide when branch merge/kill/commit is allowed.

### Critic

The Critic attacks design quality.

Responsibilities:

- Challenge weak concepts.
- Identify contradictions.
- Compare branches.
- Evaluate architectural coherence.
- Identify representational weakness.
- Produce critique artifacts.

---

## 7. Runtime Loop

## 7.1 Main loop

```text
1. User sets goal or updates goal.
2. Backend initializes or updates WorldState.
3. AffordanceCompiler generates available moves.
4. ContextDistiller prepares Agent Brief.
5. Agent selects move or proposes new move.
6. Supervisor validates move.
7. MoveExecutor executes move through AAS/tools.
8. Artifacts, tensions, branches, commits, and events update.
9. Critic evaluates result when needed.
10. AffordanceCompiler regenerates available moves.
11. User sees updated Situation Board.
```

## 7.2 Agent turn lifecycle

```text
prepare brief
present valid moves
agent selects/proposes move
validate move
execute move
record result
update world
emit next situation
```

## 7.3 User intervention lifecycle

```text
user sees situation
user approves/rejects move
user changes goal
user elevates tension
user commits branch
user freezes decision
user forces validation
world state updates
new affordances generated
```

---

## 8. UI Design: Field Navigator

The previous “Situation Board” framing is too dashboard-like. It risks becoming a stack of cards: useful data, weak interaction. The new UI should become a **Field Navigator**: a visual, spatial interface for seeing and manipulating the design field.

The Field Navigator is not a graph editor and not a dashboard. It is a 2.5D / 3D interactive design-space map where goals, tensions, branches, affordances, commits, agents, and artifacts appear as spatial entities in one navigable environment.

### 8.1 Core UI Principle

```text
Not cards.
Not fixed graph.
Not dashboard.

Use spatial field.
Use clusters.
Use force lines.
Use axes.
Use affordance wheel.
Use commit spine.
Use branch organisms.
```

The interface should communicate the whole system visually before text appears. Text is secondary: labels, tooltips, inspectors, confirmations.

### 8.2 Primary View: Design Field Canvas

The main screen becomes an interactive spatial canvas.

It should feel like a hybrid of:

- 3D node graph
- radar / tactical map
- architectural site model
- nervous system diagram
- constellation map
- Grasshopper logic view
- Blender node spatial clarity
- Unreal Blueprint readability
- game strategy interface

But it should not look like ordinary workflow automation software.

### 8.3 Visual Structure

```text
Center       = current project intent / active design problem
Inner orbit  = active tensions and active branches
Middle field = affordances / possible moves
Outer field  = artifacts, references, agents, tools
Bottom spine = committed decisions / project truth
Depth axis   = speculation -> validation -> commitment
```

### 8.4 Field Axes

The field should have visible axes. These axes give the agent system spatial meaning.

Recommended axes:

#### X Axis — Design Direction

```text
Conceptual / speculative  <->  Technical / validated
```

Shows whether a node is early thinking or grounded production.

#### Y Axis — Project Impact

```text
Minor local effect  <->  Major global effect
```

Shows whether a move changes one artifact or the whole project direction.

#### Z / Depth Axis — Commitment State

```text
Uncommitted  ->  Candidate  ->  Validated  ->  Committed
```

This is most important. Project truth should literally live deeper / lower / more locked into the field.

Alternative depth metaphor:

```text
Floating = speculative
Mid-air = active candidate
Docked = validated
Bolted to spine = committed
```

### 8.5 The Commit Spine

At bottom of the field sits a horizontal or slightly curved **Commit Spine**.

This is the project truth rail.

Committed decisions attach to it like hardware modules. Once attached, they emit constraint lines upward into the field.

Example commits:

- Section-first ground truth
- Southern California desert assumption
- Courtyard thermal-mass branch selected
- Board must include plan, section, render, diagram

Visual behavior:

- Commit nodes are heavier, darker, bolted, less floating.
- They have screw / latch / lock visual language.
- They emit constraint beams to affected branches/artifacts.
- Reversible commits show a small release latch.
- User-approved commits have stronger hardware lock state.

### 8.6 The Affordance Wheel

The Affordance Wheel is the main action control.

It appears around the selected object, not as a static menu. User selects a tension, branch, artifact, or goal, then wheel appears around it.

Wheel segments are moves:

```text
Create
Refine
Critique
Validate
Branch
Merge
Commit
Ask
```

Each segment has:

- icon
- risk color
- cost tick marks
- expected-gain pulse
- approval lock if needed
- agent avatar / role marker

The wheel is not decorative. It is the user-facing version of available affordances.

Example: select tension “privacy vs panoramic openness.” Wheel shows:

```text
Resolve with courtyard
Resolve with screened canopy
Resolve with buried section
Spawn 3 alternatives
Ask user priority
Validate against current model
Commit resolution
```

### 8.7 Affordance Particles / Move Nodes

Available moves exist as small orbiting nodes around the active problem.

They are pulled by the IntentGradient.

Higher-scored moves sit closer to center or glow with stronger pulse. Riskier moves wobble, sit off-axis, or have warning bands.

Move node states:

```text
Available     = visible orbit node
Recommended   = closest / brightest node
Blocked       = ghosted node with broken line
Executing     = moving along path to target
Completed     = leaves artifact trail
Failed        = red fracture / retry affordance appears
```

### 8.8 Branch Clusters

Branches should appear as clusters, not cards.

Each branch is a semi-autonomous design organism:

```text
Branch nucleus = hypothesis
Attached nodes = artifacts
Red lines      = weaknesses / unresolved tensions
Green/cyan     = evidence / strengths
Score ring     = branch health
```

Example branches:

```text
A: Courtyard thermal-mass scheme
B: Elevated shade canopy scheme
C: Buried sectional scheme
```

Each branch cluster can be expanded, collapsed, compared, killed, merged, or committed.

### 8.9 Branch Comparison Mode

User can drag two or three branch clusters into a comparison zone.

The UI overlays:

- shared tensions
- unique strengths
- unresolved risks
- artifact completeness
- ground-truth readiness
- representation strength

Merge is a gesture:

```text
drag Branch A toward Branch B
system previews hybrid branch
Affordance Wheel shows: Merge / Compare / Cancel
```

### 8.10 Tension Nodes

Tensions are not list items. They are red/amber stress nodes in the field.

A tension node pulls on affected artifacts and branches with visible stress lines.

Example:

```text
Desert privacy vs panoramic openness
```

This node connects to:

- plan
- section
- render
- branch A
- branch B

Severity shown by line vibration, color, and node size.

Resolved tensions shrink and attach to the commit spine as resolved constraints.

### 8.11 Artifact Constellations

Artifacts should cluster by type and relation.

```text
Research cluster
Concept cluster
Ground-truth cluster
Model cluster
Drawing cluster
Render cluster
Diagram cluster
Board cluster
QA cluster
```

Artifacts are visual thumbnails when possible. Text files become small terminal/document plates. Model artifacts become wireframe miniatures. Image artifacts become dim thumbnails.

Artifact lineage is visible:

```text
commit -> ground truth -> plan -> section -> render -> board
```

### 8.12 Agent Presence

Agents should not dominate the field. They should appear as cursors / probes / drones moving through the field.

Agent visual states:

```text
Idle        = docked near role cluster
Thinking    = orbiting selected problem
Executing   = moving along move path
Blocked     = pulsing amber
Critiquing  = red scan cone
Validating  = green scan grid
```

This gives empathy to agent activity without turning UI into chat spam.

### 8.13 Current Intent Core

At the center of the field is the **Intent Core**.

It shows what the system is trying to solve now.

Example:

```text
Current Intent:
Select ground-truth anchor for desert artist retreat.
```

But text is minimal. Most meaning comes from objects pulled toward the center:

- active tension
- active branches
- top affordances
- required artifacts
- blocked moves

### 8.14 Manipulation Gestures

User should manipulate system spatially.

Important gestures:

```text
Select object            -> inspector + affordance wheel
Drag move to object      -> propose execution target
Drag branch to spine     -> request commit
Drag branch to branch    -> preview merge
Drag tension to branch   -> assign branch to resolve tension
Pin artifact             -> preserve as reference
Lock commit              -> freeze decision
Pull node outward        -> branch / isolate
Drop node into archive   -> kill / defer
Scrub commit spine       -> replay project evolution
```

### 8.15 Inspector Panel

Right panel still exists, but it is secondary. It appears only when object selected.

Inspector shows exact text/data:

- selected node details
- rationale
- scores
- linked artifacts
- execution log
- approval state
- raw JSON if needed

The main interface remains visual. Inspector is for precision.

### 8.16 Modes Inside Field Navigator

The Field Navigator should support view modes, not separate dashboards.

```text
Field View      = all objects as spatial system
Branch View     = compare branches
Tension View    = stress map
Commit View     = project truth spine
Artifact View   = artifact lineage map
Agent View      = agent activity / handoffs
Trace View      = graph-like execution history
```

Trace View preserves graph utility without making graph the main design metaphor.

### 8.17 Visual Encoding System

#### Shape

```text
Circle       = affordance / move
Hexagon      = agent
Diamond      = tension
Rectangle    = artifact
Heavy plate  = commit
Cluster hull = branch
```

#### Motion

```text
Orbiting      = possible / pending
Traveling     = executing
Docked        = committed / stable
Vibrating     = conflict / risk
Pulsing       = recommended / active
Ghosted       = blocked / unavailable
```

#### Line Types

```text
Solid cyan     = dependency / support
Dashed cyan    = possible path
Amber line     = risk / uncertainty
Red line       = conflict
Green line     = validation
Thick locked   = committed constraint
```

#### Depth

```text
High / floating = speculative
Middle          = candidate
Low / docked    = validated
Bolted spine    = committed truth
```

### 8.18 Layout Against Current UI

Current UI has left project/session shell, center graph, right inspector. Keep this skeleton.

Change center from flat pipeline graph to Field Navigator.

```text
Left sidebar   = projects, sessions, modes
Top bar        = active project, run state, field mode, save/run controls
Center         = 2.5D Field Navigator
Right panel    = object inspector / tools / files / terminal
Bottom bar     = system status + mini timeline + commit spine preview
```

### 8.19 Why this preserves graph power

Graph is powerful because it shows relation, dependency, flow, and hierarchy.

Field Navigator keeps those strengths but adds:

- uncertainty
- commitment depth
- branch competition
- tension stress
- affordance availability
- agent activity
- design evolution
- spatial manipulation

Graph shows fixed structure.

Field shows living design dynamics.

---

## 9. Relationship to Chat Mode

Chat remains important, but it should not be the only interface.

Chat is good for:

- Explaining reasoning
- Asking user questions
- Presenting options
- Receiving corrections
- Conversational steering

Situation Board is good for:

- Seeing system state
- Comparing branches
- Inspecting tensions
- Reviewing moves
- Approving decisions
- Managing artifacts

### 9.1 Chat + Situation Board behavior

When an agent posts in chat, the Situation Board should update.

When a user clicks a move in Situation Board, chat should show the agent reasoning and execution status.

Chat and Situation Board should be two views of one world state.

---

## 10. Relationship to Model Mode

Model Mode remains the ground-truth validation environment.

The Field Runtime should treat model state as part of WorldState.

### 10.1 Model affordances

Examples:

- Generate massing model from committed branch.
- Cut floor plan from current model.
- Cut section through active tension zone.
- Validate render perspective against model.
- Compare model area against program target.
- Rebuild model after branch commit.

### 10.2 Rhino Compute role

Rhino Compute is not directly exposed as an agent tool choice in ordinary reasoning. It is called by MoveExecutor when a selected move requires geometry computation.

---

## 11. Data Persistence Model

The backend should persist Field Runtime objects in SQL/Prisma.

### 11.1 Core tables

```text
projects
sessions
world_states
affordances
moves
tensions
branches
commits
artifacts
artifact_links
runtime_events
agent_briefs
move_executions
branch_scores
intent_scores
approvals
```

### 11.2 WorldState persistence

WorldState can be stored as both normalized tables and JSON snapshots.

Recommended approach:

- Normalize core objects: branches, tensions, commits, artifacts, moves.
- Store periodic `world_state_snapshots` for replay/debug.
- Event-source major changes through `runtime_events`.

### 11.3 Prisma model sketch

```prisma
model WorldStateSnapshot {
  id        String   @id @default(cuid())
  projectId String
  sessionId String
  runId     String?
  json      Json
  createdAt DateTime @default(now())
}

model AffordanceRecord {
  id        String   @id
  projectId String
  sessionId String
  label     String
  moveType  String
  intent    String
  scoreJson Json
  payloadJson Json
  status    String
  createdAt DateTime @default(now())
}

model MoveRecord {
  id        String   @id
  projectId String
  sessionId String
  affordanceId String?
  type      String
  rationale String
  status    String
  payloadJson Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model TensionRecord {
  id        String   @id
  projectId String
  sessionId String
  conflict  String
  severity  String
  status    String
  payloadJson Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BranchRecord {
  id        String   @id
  projectId String
  sessionId String
  label     String
  hypothesis String
  status    String
  scoreJson Json
  payloadJson Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CommitRecord {
  id        String   @id
  projectId String
  sessionId String
  decision  String
  rationale String
  approvedBy String
  reversible Boolean
  payloadJson Json
  createdAt DateTime @default(now())
}
```

---

## 12. API Surface

### 12.1 World State

```http
GET    /api/projects/:projectId/sessions/:sessionId/world
POST   /api/projects/:projectId/sessions/:sessionId/world/recompute
GET    /api/projects/:projectId/sessions/:sessionId/world/snapshots
```

### 12.2 Affordances

```http
GET    /api/projects/:projectId/sessions/:sessionId/affordances
POST   /api/projects/:projectId/sessions/:sessionId/affordances/recompute
POST   /api/affordances/:affordanceId/approve
POST   /api/affordances/:affordanceId/reject
```

### 12.3 Moves

```http
POST   /api/projects/:projectId/sessions/:sessionId/moves
GET    /api/moves/:moveId
POST   /api/moves/:moveId/execute
POST   /api/moves/:moveId/cancel
POST   /api/moves/:moveId/retry
```

### 12.4 Tensions

```http
GET    /api/projects/:projectId/sessions/:sessionId/tensions
POST   /api/projects/:projectId/sessions/:sessionId/tensions
PATCH  /api/tensions/:tensionId
POST   /api/tensions/:tensionId/resolve
POST   /api/tensions/:tensionId/defer
```

### 12.5 Branches

```http
GET    /api/projects/:projectId/sessions/:sessionId/branches
POST   /api/projects/:projectId/sessions/:sessionId/branches
POST   /api/branches/:branchId/develop
POST   /api/branches/:branchId/critique
POST   /api/branches/:branchId/kill
POST   /api/branches/:branchId/merge
POST   /api/branches/:branchId/commit
```

### 12.6 Commits

```http
GET    /api/projects/:projectId/sessions/:sessionId/commits
POST   /api/projects/:projectId/sessions/:sessionId/commits
POST   /api/commits/:commitId/revert
```

### 12.7 Agent Briefs

```http
POST   /api/projects/:projectId/sessions/:sessionId/agent-briefs
GET    /api/agent-briefs/:briefId
```

---

## 13. Event Model

A.A.S. should emit stable product events.

```text
aas.world.updated
aas.affordances.generated
aas.move.proposed
aas.move.selected
aas.move.started
aas.move.completed
aas.move.failed
aas.tension.created
aas.tension.resolved
aas.branch.spawned
aas.branch.developed
aas.branch.critiqued
aas.branch.killed
aas.branch.merged
aas.branch.committed
aas.commit.created
aas.commit.reverted
aas.artifact.created
aas.supervisor.warning
aas.user.approval.required
```

Example:

```json
{
  "type": "aas.affordances.generated",
  "projectId": "proj_001",
  "sessionId": "sess_001",
  "count": 5,
  "topMoveId": "aff_003"
}
```

---

## 14. Agent Roles in Field Runtime

### 14.1 Affordance Compiler Agent / Service

Generates available moves from current WorldState.

Can be partly deterministic and partly model-driven.

### 14.2 Context Distiller

Compiles relevant context into Agent Briefs.

### 14.3 Planner Agent

No longer creates static graph. Creates or revises move strategy.

### 14.4 Research Agent

Finds missing external or internal information only when current affordances require it.

### 14.5 Concept Agent

Creates branches and identifies design tensions.

### 14.6 Design Development Agent

Develops selected branches into coherent artifact plans.

### 14.7 Model Agent

Works with geometry, Rhino Compute, model validation, and drawing cuts.

### 14.8 Representation Agent

Creates renders, diagrams, board visual strategies, and image prompts.

### 14.9 Critic Agent

Attacks branches, artifacts, and commits before they become project truth.

### 14.10 Supervisor Agent

Governs legality, approval, drift, risk, and finalization.

---

## 15. Interaction Patterns

## 15.1 Starting a project

```text
User enters prompt
System normalizes goal
WorldState initialized
AffordanceCompiler generates first moves
Situation Board shows options
Agent selects or asks user to approve first move
```

Example first moves:

```text
A1: Normalize brief and infer assumptions
A2: Ask one blocking clarification
A3: Generate three concept branches
A4: Run precedent scan
A5: Define required board deliverables
```

## 15.2 Developing concept branches

```text
Concept Agent receives brief
System exposes branch-generation move
Agent spawns 3 branches
Critic critiques branches
IntentGradient scores branches
User reviews branch cards
Best branch committed or branches merged
```

## 15.3 Resolving design tension

```text
Tension detected
Tension card appears
AffordanceCompiler generates resolution moves
Agent develops alternatives
Critic evaluates
User or supervisor commits resolution
Affected artifacts marked for update
```

## 15.4 Creating ground truth

```text
Committed concept exists
Compiler exposes ground-truth moves
Agent selects plan-first / section-first / massing-first / model-first
MoveExecutor calls Rhino Compute or artifact generator
Ground-truth artifact created
Model Mode updates
```

## 15.5 Producing final board

```text
Required artifacts exist
Critical tensions resolved
Commit ledger stable
Compiler exposes board assembly move
Representation Agent composes board
QA validates against commitments and ground truth
Export created
```

---

## 16. Relationship to GPT Image V2

GPT Image V2 should be accessed through moves, not raw prompts.

### 16.1 Correct pattern

```text
Move: Generate three atmosphere studies for committed branch
  -> gather branch state
  -> gather commits
  -> gather visual constraints
  -> create prompt package
  -> call GPT Image V2
  -> register images as artifacts
  -> critique images
  -> expose selection moves
```

### 16.2 Image generation affordances

Examples:

- Generate visual strategy probe.
- Generate render based on current ground-truth model.
- Generate material atmosphere study.
- Generate board layout options.
- Refine selected render for consistency.
- Segment generated board for QA.

### 16.3 Rule

Image outputs can influence visual direction, but they do not become project truth unless committed and validated.

---

## 17. Safety, Governance, and Control

### 17.1 Tool safety

Agents select moves, not arbitrary tools. MoveExecutor enforces permissions.

### 17.2 User approval requirements

Require user approval for:

- Committing major design direction.
- Killing high-value branches.
- Reverting user-approved decisions.
- Finalizing board.
- Running expensive generation batches.
- Overwriting important artifacts.

### 17.3 Supervisor approval requirements

Require supervisor approval for:

- New move type proposed by agent.
- Tool execution with high cost/risk.
- Contradiction between move and committed decision.
- Final output with unresolved critical tension.

### 17.4 Reversibility

Every major move should declare whether it is reversible.

Commits should be revertible when possible, but revert must create a new event rather than deleting history.

---

## 18. Implementation Roadmap

## Phase 1 — Field Runtime Schema

- Add WorldState model.
- Add Affordance model.
- Add Move model.
- Add Tension model.
- Add Branch model.
- Add Commit model.
- Add event types.

## Phase 2 — Situation Board UI

- Replace Script-first graph view with Situation Board.
- Show goal, intent, tensions, branches, moves, commits, artifacts.
- Keep graph as trace/debug view.

## Phase 3 — Affordance Compiler MVP

- Deterministic compiler rules for first phases.
- Generate 3–7 valid moves from WorldState.
- Add scoring explanation.
- Add move approval/execute controls.

## Phase 4 — Context Distiller MVP

- Generate Agent Brief from WorldState.
- Hide memory/tool complexity.
- Include only relevant commits, artifacts, tensions, and valid moves.

## Phase 5 — MoveExecutor MVP

- Map typed moves to AAS tasks.
- Execute through existing agents/tools.
- Register artifacts.
- Update WorldState.

## Phase 6 — Branch Ecology

- Spawn branches.
- Score branches.
- Critique branches.
- Kill / merge / commit branches.

## Phase 7 — Commitment Ledger

- Commit major decisions.
- Link commits to artifacts and branches.
- Enforce commits in downstream context.
- Add revert mechanics.

## Phase 8 — Tension Engine

- Detect contradictions manually first.
- Add agent-generated tensions.
- Add tension resolution moves.
- Block finalization on critical unresolved tensions.

## Phase 9 — Model + Image Integration

- Add model-based affordances.
- Add GPT Image V2 affordances.
- Add QA moves for segmentation and consistency.

## Phase 10 — Full Agent Field Runtime

- Hybrid deterministic/model compiler.
- Supervisor governance.
- Rich branch evolution.
- Replayable field history.
- Post-training data generation from move traces.

---

## 19. Post-Training Strategy

Do not post-train agents to generate static graphs as the primary skill.

Train agents to operate inside the A.A.S. Field Runtime.

### 19.1 Training targets

Agents should learn to:

- Read Agent Briefs.
- Select appropriate moves.
- Propose new legal moves.
- Explain overrides.
- Create useful branches.
- Identify design tensions.
- Critique branches.
- Decide when to commit.
- Respect committed decisions.
- Use artifacts as evidence.
- Recover from failed moves.
- Avoid unnecessary tool calls.
- Ask targeted clarifying questions.

### 19.2 Training data format

Training traces should look like:

```json
{
  "worldStateSummary": "...",
  "agentBrief": "...",
  "availableMoves": [...],
  "selectedMove": "...",
  "rationale": "...",
  "executionResult": "...",
  "worldStateDelta": "...",
  "criticFeedback": "..."
}
```

This is better than training on graph generation because the agent learns how to navigate an environment rather than how to draw a brittle workflow.

---

## 20. Minimal Viable Version

The smallest useful version of A.A.S. Field Runtime needs only five things:

```text
WorldState
AffordanceCompiler
MoveExecutor
Situation Board
Commitment Ledger
```

Tensions and branches can be added next, but the concept becomes real once the agent chooses moves instead of tools.

### 20.1 MVP flow

```text
User prompt
  -> WorldState initialized
  -> Compiler creates 5 moves
  -> Agent selects move
  -> Executor runs AAS task
  -> Artifact created
  -> Commit or next move generated
```

### 20.2 MVP move types

Start with:

```text
CREATE_ARTIFACT
REFINE_ARTIFACT
ASK_USER
VALIDATE
COMMIT_DECISION
```

Then add:

```text
SPAWN_BRANCH
CRITIQUE_BRANCH
MERGE_BRANCH
KILL_BRANCH
```

---

## 21. Final Design Position

A.A.S. should not be a graph editor for agent workflows.

A.A.S. should be a design field where agents act through meaningful, typed, environment-generated moves.

The graph is not deleted. It becomes trace, replay, and debugging infrastructure.

The primary architecture is:

```text
WorldState
  -> AffordanceCompiler
  -> IntentGradient
  -> ContextDistiller
  -> Agent selects Move
  -> MoveExecutor
  -> Branch / Tension / Commit updates
  -> WorldState
```

The primary user interface is:

```text
Situation Board
  -> Goal
  -> Current Intent
  -> Tensions
  -> Branches
  -> Moves
  -> Commits
  -> Artifacts
```

The primary design philosophy is:

```text
Do not make agent navigate tool maze.
Do not make human predict full workflow.
Make environment expose meaningful next moves.
Let agents reason inside bounded design physics.
Let decisions become truth only through commitment.
Let branches evolve, compete, die, merge, and commit.
```

This is the new orchestration layer A.A.S. should build above AAS: not workflow automation, but architectural world dynamics.

Yes. Hermes can replace AAS better than expected.

Not as “AAS controls raw agents.” Better:

```text
AAS Field Runtime = design intelligence + UI + state
Hermes Kanban = durable multi-agent execution fabric
Hermes Profiles = specialist agent bodies
Hermes Memory/Skills = agent learning substrate
AAS UI = live field visualization over Hermes task/event state
```

Hermes latest direction already fits this: durable Kanban for multiple named agents, profile-based independent agents, worker processes with identity, dispatcher, heartbeat/reclaim/retry, and stronger memory/skill self-improvement loop. ([Hermes Agent][1])

## Best architecture

```text
AAS Field Runtime
  -> WorldState
  -> AffordanceCompiler
  -> IntentGradient
  -> TensionEngine
  -> BranchEcology
  -> CommitmentLedger
  -> MoveCompiler

MoveCompiler
  -> creates Hermes Kanban tasks
  -> assigns Hermes profiles
  -> links dependencies
  -> watches task state
  -> ingests comments/logs/artifacts
  -> updates AAS Field UI

Hermes
  -> profiles execute tasks
  -> Kanban coordinates work
  -> memory/skills improve agents
  -> dashboard/CLI remain available
```

AAS not replace Hermes orchestration. AAS **sits above it**.

Hermes does worker execution. AAS does design-field semantics.

## Key shift

AAS move:

```text
"Resolve privacy vs panoramic openness through 3 branch studies"
```

Compiles into Hermes Kanban:

```text
Task 101: Research desert privacy/view precedents -> profile aas-research
Task 102: Generate courtyard branch -> profile aas-concept
Task 103: Generate screened-canopy branch -> profile aas-concept
Task 104: Generate buried-section branch -> profile aas-concept
Task 105: Critique three branches -> profile aas-critic
Task 106: Recommend commit candidate -> profile aas-supervisor
```

Hermes already supports tasks, comments, links, completion/blocking, heartbeat, dispatcher, and per-worker profile spawning through Kanban. Docs say every task is stored in `~/.hermes/kanban.db`, handoffs are readable/writable rows, and workers are full OS processes with own identity. ([Hermes Agent][1])

## Profiles become AAS agent cast

Hermes profile = AAS specialist agent.

Create profiles:

```text
aas-research
aas-concept
aas-dd
aas-model
aas-render
aas-diagram
aas-critic
aas-supervisor
aas-curator
```

Hermes profiles are isolated homes with their own config, API keys, `SOUL.md`, memories, sessions, skills, cron jobs, and state DB. Good for specialist agents without memory pollution. ([Hermes Agent][2])

AAS owns profile templates:

```text
profiles/
  aas-research/
    SOUL.md
    config.yaml
    skills/
  aas-concept/
  aas-model/
  aas-critic/
```

Hermes profile distributions may help package whole agents as git repos: personality, skills, cron, MCP connections, config. Good for shipping AAS agent packs. ([Hermes Agent][3])

## Kanban becomes execution substrate

Do not duplicate Kanban.

Use it as AAS task runtime.

AAS maps:

```text
Affordance -> Move -> Kanban Task Group
Branch -> Kanban epic / task family
Tension -> task label + blocking reason
Commit -> AAS ledger, with linked Kanban completion evidence
Artifact -> AAS artifact DB + Hermes task attachment/comment
Agent -> Hermes profile
```

Hermes Kanban has both model-facing tools and human/automation CLI/dashboard surfaces, all backed by same DB layer. Agents use `kanban_*` tools; users/scripts use `hermes kanban ...`, slash commands, or dashboard. ([Hermes Agent][1])

## AAS-Hermes bridge

Need one service:

# `aas-hermes-bridge`

Responsibilities:

```text
1. Create Hermes profiles from AAS agent definitions.
2. Compile AAS moves into Kanban tasks.
3. Assign tasks to profiles.
4. Link task dependencies.
5. Start / monitor Hermes dispatcher.
6. Tail logs and task comments.
7. Convert Kanban events into AAS Field events.
8. Register artifacts into AAS DB.
9. Update Field Navigator live.
```

Bridge talks to Hermes three ways:

```text
CLI        = simplest MVP
SQLite     = live state read from kanban.db
Logs       = stream worker output
Optional API/plugin = later cleaner integration
```

## Live updates to UI

MVP live path:

```text
Hermes kanban.db
+ ~/.hermes/kanban/logs/<task>.log
+ AAS artifact folder
  -> aas-hermes-bridge watcher
  -> AAS event bus
  -> WebSocket/SSE
  -> Field Navigator
```

Hermes dispatcher spawns workers and redirects output to task logs under `~/.hermes/kanban/logs/<id>.log` per GitHub issue text / implementation notes. Kanban also has CLI verbs like `tail`, `watch`, `runs`, `log`, `heartbeat`, `dispatch`, and `daemon`, useful for live UI integration. ([GitHub][4])

AAS UI maps updates like:

```text
Kanban task ready      -> move node available
Kanban task running    -> agent probe moving
Kanban heartbeat       -> pulse animation
Kanban comment         -> field annotation / chat line
Kanban block           -> blocked affordance / tension spike
Kanban complete        -> artifact trail + next affordances
Kanban retry           -> flicker/recovery animation
```

## AAS should not command Hermes too low-level

Bad:

```text
AAS tells Hermes exactly every shell command.
```

Good:

```text
AAS gives task brief + context bundle + output contract.
Hermes profile decides how to work.
AAS validates result.
```

Use Hermes strength: autonomous agents with learning loop, skills, cross-session recall, profiles, tools, and Kanban. Docs describe Hermes as self-improving with memory, skills, cross-session recall, and user modeling. ([Hermes Agent][5])

## Context handoff

Each Kanban task gets an AAS task packet.

```json
{
  "aasMoveId": "move_042",
  "worldStateSnapshot": "world_2026_05_10_2350",
  "profile": "aas-concept",
  "role": "Concept Agent",
  "goal": "Resolve active design tension through branch studies",
  "activeTension": "desert privacy vs panoramic openness",
  "committedDecisions": ["Southern California desert", "small artist retreat"],
  "allowedOutputs": ["branch_proposal.md", "branch_score.json"],
  "artifactWritePath": "/aas/projects/desert-retreat/runs/run-01/artifacts/",
  "completionContract": {
    "mustCreate": ["3 branch hypotheses", "strengths", "weaknesses", "recommended next move"]
  }
}
```

Hermes worker reads this from task description or attached file.

Worker writes output to AAS artifact folder and comments path back to Kanban.

AAS bridge registers artifact.

## Memory boundary

Important: do not let Hermes profile memory become AAS truth.

Hermes memory = agent learning / skill improvement.

AAS truth = WorldState + Commit Ledger + Artifact DB.

```text
Hermes remembers how agent works.
AAS remembers what project is.
```

That avoids profile memory drift corrupting project truth.

Hermes v0.12 release says Curator grades/prunes/consolidates skill library and the self-improvement loop was upgraded for memory/skills updates. Good, but AAS should treat that as agent capability layer, not canonical project state. ([GitHub][6])

## Updated AAS stack

```text
Frontend
  Field Navigator
  Chat
  Model
  Trace

Backend
  AAS DB
  WorldState
  Commit Ledger
  Artifact Registry
  Event Bus

Field Runtime
  AffordanceCompiler
  MoveCompiler
  IntentGradient
  TensionEngine
  BranchEcology
  Supervisor

Hermes Bridge
  Profile Manager
  Kanban Adapter
  Log Watcher
  Artifact Ingest
  Event Translator

Hermes Agent
  Profiles
  Kanban
  Dispatcher
  Skills
  Memory
  Tools
```

## Main integration objects

### `HermesProfileBinding`

```ts
type HermesProfileBinding = {
  aasAgentId: string
  profileName: string
  role: "research" | "concept" | "critic" | "model" | "render" | "supervisor"
  hermesHome: string
  soulPath: string
  allowedMoveTypes: MoveType[]
  artifactRoot: string
}
```

### `KanbanTaskBinding`

```ts
type KanbanTaskBinding = {
  aasMoveId: string
  kanbanTaskId: string
  branchId?: string
  tensionId?: string
  profileName: string
  status: "todo" | "ready" | "running" | "blocked" | "done" | "failed"
  logPath?: string
  artifactRefs: string[]
}
```

### `AASMoveToKanbanPlan`

```ts
type AASMoveToKanbanPlan = {
  moveId: string
  taskGroupName: string
  tasks: {
    title: string
    profile: string
    dependsOn: string[]
    briefPath: string
    expectedArtifacts: string[]
  }[]
}
```

## Control model

AAS controls **task topology**, not agent internals.

```text
AAS can:
- create task
- assign profile
- link dependency
- block/unblock
- cancel/archive
- inspect logs
- ingest outputs
- approve commit

Hermes can:
- execute task
- spawn worker process
- use tools
- write comments
- complete/block task
- update skills/memory
```

## UI mapping

Your Field Navigator becomes live front-end over Hermes execution.

```text
Affordance node     -> not yet compiled
Move path           -> compiled into Kanban task group
Agent drone         -> Hermes profile worker
Branch cluster      -> Kanban task family + artifacts
Tension node        -> task blockers/comments
Commit spine        -> AAS commits from completed evidence
Trace view          -> Kanban dependency graph
```

Kanban board still exists, but hidden behind Field UI or available as debug panel.

## Implementation plan

### Phase 1: CLI bridge

Use `hermes kanban` commands.

```text
AAS move -> write task brief file -> hermes kanban create -> hermes kanban assign/link -> hermes kanban dispatch
```

Fast. Dirty. Works.

### Phase 2: DB watcher

Read `~/.hermes/kanban.db`.

```text
poll or SQLite update hook
task state -> AAS events
comments -> chat/log events
```

### Phase 3: log/artifact watcher

Watch:

```text
~/.hermes/kanban/logs/
AAS project artifact dirs
```

Stream into UI.

### Phase 4: profile pack manager

Generate Hermes profiles from AAS agent definitions.

```text
aas profile sync
  -> create/update Hermes profile
  -> write SOUL.md
  -> install skills
  -> configure MCP/tools
```

### Phase 5: direct Hermes plugin/API

Replace shell bridge with native plugin or API server if Hermes exposes stable integration point.

## Main risk

Hermes Kanban may be shared globally or profile-aware depending version/config. There is at least a recent issue about `kanban.db` resolving under profile home and isolating boards, which could break multi-profile shared Kanban if misconfigured. Need pin Hermes version and verify Kanban DB path before architecture depends on shared board. ([GitHub][7])

## Recommendation

Yes, replace AAS with Hermes Agent.

But do it like this:

```text
AAS Field Runtime = brain of design world
Hermes Kanban = nervous system for work dispatch
Hermes Profiles = bodies of specialist agents
Hermes Memory/Skills = agent learning
AAS DB = project truth
AAS UI = field visualization
```

Do not fight Hermes by building another orchestrator. Let Hermes run agents. Let AAS define **what work means architecturally**.

Best final architecture:

```text
AAS Affordance Field
  compiles design moves
  into Hermes Kanban work
  assigned to Hermes profiles
  watched through live bridge
  visualized as Field Navigator
  committed into AAS truth ledger
```

This is cleaner than AAS version. Hermes already gives multi-agent durability. AAS becomes higher-level design engine.

[1]: https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban "Kanban (Multi-Agent Board) | Hermes Agent"
[2]: https://hermes-agent.nousresearch.com/docs/user-guide/profiles?utm_source=chatgpt.com "Profiles: Running Multiple Agents - Hermes Agent"
[3]: https://hermes-agent.nousresearch.com/docs/user-guide/profile-distributions?utm_source=chatgpt.com "Profile Distributions: Share a Whole Agent - Hermes Agent"
[4]: https://github.com/NousResearch/hermes-agent/issues/16102?utm_source=chatgpt.com "review the Kanban — multi-profile collaboration board (PR ..."
[5]: https://hermes-agent.nousresearch.com/docs/ "Hermes Agent Documentation | Hermes Agent"
[6]: https://github.com/NousResearch/hermes-agent/releases "Releases · NousResearch/hermes-agent · GitHub"
[7]: https://github.com/NousResearch/hermes-agent/issues/19036?utm_source=chatgpt.com "Kanban database is profile-aware, breaking multi-agent ..."

Need think 4 layers. Hermes connect to frontend not one magic thing.

## 1. Hermes native surfaces

Hermes itself exposes user surfaces:

```text
CLI / TUI
Dashboard
Messaging gateways
MCP server mode
Kanban DB
Logs
Config/profile files
```

Docs describe Hermes as terminal, messaging, IDE-capable agent framework; Kanban tasks stored in `~/.hermes/kanban.db`; workers full OS processes with identity. ([Hermes Agent][1])

So frontend can connect through several paths.

## 2. Best AAS integration path

For AAS UI, use **backend bridge**, not frontend direct-to-Hermes.

```text
AAS Frontend
  -> AAS Backend API / WebSocket
    -> aas-hermes-bridge
      -> Hermes CLI / Kanban DB / logs / profiles
        -> Hermes agents
```

Frontend never talks straight to Hermes. Browser should not touch local filesystem, profile secrets, Kanban DB, or agent process control.

## 3. Connection methods

### Option A — CLI bridge

Most practical MVP.

AAS backend runs commands:

```bash
hermes profile create aas-concept
hermes -p aas-concept kanban ...
hermes kanban ...
hermes kanban dispatch
```

Use CLI to create tasks, assign profiles, dispatch workers, inspect status.

Good:

```text
fast
stable enough
matches current Hermes usage
no plugin needed
```

Bad:

```text
shell parsing
version fragility
less clean than API
```

### Option B — SQLite/Kanban DB adapter

Hermes Kanban persists tasks in `~/.hermes/kanban.db`. AAS bridge can read task state from SQLite and watch changes. ([Hermes Agent][2])

Good:

```text
great live UI
durable state
easy polling
```

Bad:

```text
write direct to DB risky
schema may change
```

Use DB mostly read-only unless Hermes docs bless writes.

### Option C — Log watcher

Hermes workers write process/task logs. AAS can tail logs and stream to UI.

```text
Hermes logs -> bridge -> SSE/WebSocket -> Field Navigator
```

Good:

```text
live agent feeling
simple
```

Bad:

```text
logs not structured unless you enforce format
```

### Option D — MCP server mode

Hermes v0.6 release notes mention MCP server mode. ([GitHub][3])

MCP usually means other clients can call Hermes tools through Model Context Protocol. Useful if AAS backend wants Hermes as tool server.

But for AAS orchestration, MCP alone probably not enough. You still need Kanban/profile/task state.

Best use:

```text
AAS backend calls Hermes MCP for tool-like operations
Kanban DB/log bridge handles multi-agent execution state
```

### Option E — Hermes plugin / skill

Hermes has skills/plugins ecosystem and many built-in/community skills. ([Hermes Agent][4])

AAS can ship a Hermes skill/plugin:

```text
aas-field-runtime skill
```

It tells Hermes agents how to read AAS task packets, write artifacts, emit structured events, follow output contracts.

Good:

```text
agent behavior aligned
less prompt copying
portable profile pack
```

But plugin does not replace backend bridge. Plugin runs inside Hermes agent context. AAS still needs backend to create tasks, watch state, update UI.

### Option F — Direct API

Only use if Hermes exposes stable HTTP/WebSocket API for Kanban/profile control. I did not see official stable API in docs from search result. Treat as future option, not assumption.

## Best answer

Use **hybrid**:

```text
Control: AAS backend -> Hermes CLI
State:   AAS backend reads Hermes Kanban DB
Live:    AAS backend tails Hermes logs + task comments
Behavior: AAS installs Hermes profiles/skills/config
UI:      Frontend only talks to AAS backend via API + WebSocket
```

## Concrete architecture

```text
[React / Next Frontend]
  API:
    POST /api/moves/:id/execute
    GET  /api/world
    WS   /api/events

[AAS Backend]
  - WorldState
  - AffordanceCompiler
  - MoveCompiler
  - CommitLedger
  - ArtifactRegistry
  - HermesBridge

[HermesBridge]
  - ProfileManager
  - KanbanAdapter
  - DispatcherController
  - LogWatcher
  - ArtifactIngestor
  - EventTranslator

[Hermes]
  - profiles
  - kanban.db
  - worker processes
  - skills/memory
  - tools
```

## Flow example

User clicks **Execute Move** in Field Navigator.

```text
1. Frontend POST /api/moves/move_42/execute
2. AAS backend validates move
3. MoveCompiler creates Hermes task packet
4. HermesBridge creates Kanban task(s)
5. HermesBridge assigns profiles
6. Hermes dispatcher starts workers
7. LogWatcher streams output
8. KanbanAdapter observes task status
9. ArtifactIngestor registers outputs
10. AAS WorldState updates
11. Frontend receives WebSocket events
12. Field Navigator animates agents/moves/artifacts
```

## What is config vs code?

Use config for stable mapping:

```yaml
hermes:
  binary: "hermes"
  kanban_db: "~/.hermes/kanban.db"
  logs_dir: "~/.hermes/kanban/logs"
  profiles:
    research: "aas-research"
    concept: "aas-concept"
    critic: "aas-critic"
    model: "aas-model"
```

Use code for orchestration:

```ts
class HermesBridge {
  createTask(packet) {}
  assignTask(taskId, profile) {}
  dispatch() {}
  watchKanban() {}
  tailLogs(taskId) {}
  ingestArtifacts(taskId) {}
}
```

Use Hermes skill/profile files for agent behavior:

```text
~/.hermes/profiles/aas-concept/SOUL.md
~/.hermes/profiles/aas-concept/skills/aas-field-runtime/
~/.hermes/profiles/aas-concept/config.yaml
```

Hermes config uses `config.yaml`, `.env`, and CLI args with precedence. ([Hermes Agent][5])

## What I would build first

```text
Do not start with MCP.
Do not start with plugin.
Start with backend bridge.
```

MVP:

```text
AAS Backend
  -> shell out to hermes CLI
  -> poll kanban.db
  -> tail logs
  -> stream events to frontend
```

Then add:

```text
Hermes profile pack
AAS skill/plugin inside Hermes
MCP/direct API later if stable
```

## Final

Hermes connects to AAS frontend **indirectly**.

```text
Frontend does not connect to Hermes.
Frontend connects to AAS backend.
AAS backend commands Hermes and translates Hermes state into UI events.
```

Best practical stack:

```text
CLI for commands.
Kanban DB for state.
Logs for live stream.
Profiles/config for agent identity.
Skills/plugin for AAS behavior.
MCP optional later for tool-style integration.
```

[1]: https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/autonomous-ai-agents/autonomous-ai-agents-hermes-agent?utm_source=chatgpt.com "Configure, extend, or contribute to Hermes Agent"
[2]: https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban?utm_source=chatgpt.com "Kanban (Multi-Agent Board) | Hermes Agent"
[3]: https://github.com/NousResearch/hermes-agent/releases?utm_source=chatgpt.com "Releases · NousResearch/hermes-agent"
[4]: https://hermes-agent.nousresearch.com/docs/skills/?utm_source=chatgpt.com "Skills Hub | Hermes Agent"
[5]: https://hermes-agent.nousresearch.com/docs/user-guide/configuration?utm_source=chatgpt.com "Configuration | Hermes Agent"

No. **Frontend should never run CLI commands directly.**

Browser cannot safely do that. Browser no shell access. Also security bad.

## What “bridge” means

**Bridge = small backend service that translates AAS actions into Hermes actions.**

```text
Frontend button click
  -> AAS backend API
  -> Hermes Bridge
  -> Hermes CLI / DB / logs / config
  -> Hermes agents run
```

Bridge is adapter.

Like:

```text
AAS speaks: "execute move_42"
Hermes speaks: "create kanban task, assign profile, dispatch worker"
Bridge translates between them.
```

## What MVP means

**MVP = minimum viable product.**

Smallest version that proves idea works.

For AAS + Hermes MVP:

```text
User clicks Execute Move
Hermes agent runs task
UI shows live status
Artifact appears back in AAS
```

No full polish. No perfect plugin. Just working loop.

## What CLI bridge means

CLI = command line interface.

Example human command:

```bash
hermes kanban create "Generate 3 massing options"
```

A **CLI bridge** means AAS backend runs that command for you.

Frontend does this:

```ts
await fetch("/api/moves/move_42/execute", { method: "POST" })
```

Backend does this:

```ts
await execFile("hermes", [
  "kanban",
  "create",
  "Generate 3 massing options"
])
```

So:

```text
Frontend does API call.
Backend runs CLI command.
Hermes receives task.
```

## Why not frontend -> CLI

Bad:

```text
React UI -> hermes CLI
```

Because browser cannot access terminal normally. Also exposes local machine control.

Good:

```text
React UI -> AAS backend -> hermes CLI
```

Backend is trusted local server.

## Simple architecture

```text
[Frontend]
  click Execute Move

[AAS Backend]
  receives request
  validates move
  creates task packet
  calls Hermes CLI

[Hermes]
  creates Kanban task
  assigns profile
  runs agent

[AAS Backend]
  watches Hermes task/logs
  sends WebSocket update

[Frontend]
  animates Field Navigator
```

## What bridge contains

```ts
class HermesBridge {
  createTask(title, briefPath) {}
  assignTask(taskId, profileName) {}
  dispatchTask(taskId) {}
  getTaskStatus(taskId) {}
  watchLogs(taskId) {}
}
```

It is just TypeScript/Node code inside AAS backend.

## Config vs hardcoded

Do not hardcode paths everywhere.

Use config:

```yaml
hermes:
  binary: "hermes"
  kanbanDb: "~/.hermes/kanban.db"
  logsDir: "~/.hermes/kanban/logs"
  profiles:
    research: "aas-research"
    concept: "aas-concept"
    critic: "aas-critic"
```

Backend reads config. Bridge uses it.

## Most practical first version

```text
1. Frontend calls AAS API.
2. AAS backend writes task brief file.
3. AAS backend runs hermes CLI command.
4. AAS backend polls Hermes Kanban DB for status.
5. AAS backend tails Hermes logs.
6. AAS backend streams events to frontend.
```

That is CLI bridge MVP.

## Later cleaner version

Later maybe:

```text
AAS backend -> Hermes HTTP API
```

or

```text
AAS backend -> Hermes MCP server
```

or

```text
Hermes plugin sends events directly to AAS
```

But first build backend bridge. Simple. Testable. No frontend shell access.

Key answer: **system does not “know” next move. It estimates useful moves under uncertainty.**

Game world static. Design world unknown. So affordance engine must be **search + optimization + uncertainty**, not rule lookup.

## Core math frame

State:

```text
x_t = current design world
```

Move/operator:

```text
a ∈ A
```

Transition:

```text
x_{t+1} = T(x_t, a)
```

Value:

```text
J(x) = design value of state
```

Affordance score:

```text
Score(a | x_t) =
E[J(T(x_t, a)) - J(x_t)]
+ β · InformationGain(a)
+ γ · Novelty(a)
- λ · Risk(a)
- μ · Cost(a)
- ρ · ConstraintViolation(a)
```

Then expose top-K moves.

```text
Affordances = topK_a Score(a | x_t)
```

That is real core.

## Big truth

Without LLM, system needs **operators**.

It cannot invent infinite moves from nothing.

So define move grammar:

```text
CREATE_ARTIFACT
REFINE_ARTIFACT
TEST_ASSUMPTION
SPAWN_BRANCH
MERGE_BRANCH
VALIDATE
COMMIT_DECISION
ASK_USER
```

Each move type has preconditions/effects.

Like PDDL / planning domain.

```ts
Operator {
  name
  preconditions(x): boolean
  simulate(x): x'
  expectedGain(x): number
  cost(x): number
  risk(x): number
}
```

So system does not search all possible design. It searches possible **transformations**.

## Design world state

Need hybrid state:

```ts
WorldState {
  goals
  constraints
  artifacts
  branches
  tensions
  commits
  uncertainty
  modelState
  userPreferences
}
```

Represent as graph:

```text
nodes = artifacts / commits / tensions / branches / agents
edges = dependency / conflict / evidence / derivation / constraint
```

Then affordance engine acts on graph.

## Tension math

Tension = constraint conflict.

Example:

```text
privacy vs panoramic openness
```

Represent each design value as objective:

```text
f_privacy(x)
f_view(x)
```

Tension severity:

```text
Tension(x) = max(0, target_privacy - f_privacy(x))
           + max(0, target_view - f_view(x))
           + conflict_penalty(f_privacy, f_view)
```

Or generally:

```text
E_tension(x) = Σ_i w_i · violation_i(x)
```

Moves that reduce tension get high score:

```text
ΔTension = E_tension(x_t) - E_tension(x_{t+1})
```

Good move lowers energy.

## Intent Gradient

Intent Gradient = direction of improvement in objective space.

Design has vector objectives:

```text
F(x) = [
  concept_strength,
  coherence,
  novelty,
  feasibility,
  user_fit,
  ground_truth_readiness,
  representation_quality,
  unresolved_tension_penalty
]
```

Scalar utility:

```text
J(x) = w · F(x)
```

Weights come from user goal + committed decisions.

Move score uses expected utility gain:

```text
E[ΔJ(a)] = E[J(T(x, a)) - J(x)]
```

This is “next move” math.

## Unknown design space problem

Because design space unknown, use **surrogate models**.

System does not need perfect simulator. It estimates.

Options:

```text
Bayesian optimization
Monte Carlo Tree Search
Evolutionary search
Quality-diversity search
Constraint solving
Graph planning
```

Best combo for AAS:

```text
Symbolic operators + MAP-Elites + MCTS + Bayesian scoring
```

## Branch Ecology math

Use evolutionary search.

Branch = candidate design state.

```text
population P = {branch_1, branch_2, ...}
```

Generate mutations:

```text
branch' = mutate(branch, operator)
```

Score branches:

```text
fitness(branch) = J(x_branch)
```

But not only highest fitness. Need diversity.

Use novelty:

```text
Novelty(x) = average distance to k nearest previous designs
```

Distance can be:

```text
d(x_i, x_j) =
α · geometry_distance
+ β · program_distance
+ γ · concept_embedding_distance
+ δ · artifact_difference
```

Then expose moves that improve both quality and diversity.

This avoids boring convergence.

## Quality-Diversity / MAP-Elites

This important.

AAS should not optimize one best solution. It should keep diverse good solutions.

Define behavior dimensions:

```text
thermal_mass_level
openness_level
sectional_depth
courtyardness
structural_expression
program_compactness
```

MAP-Elites stores best branch per region:

```text
archive[cell] = best design found in that behavior zone
```

Then affordances can say:

```text
Explore underdeveloped region: high openness + high privacy
Develop strongest current cell
Merge two high-performing cells
Kill low-performing duplicate
```

This is real creative search.

## Information Gain

Sometimes best next move is not best output. It is best question/test.

Use uncertainty.

Let θ = unknown project variables.

```text
θ = site facts, user preference, feasibility, model validity
```

Information gain:

```text
IG(a) = H(p(θ | D)) - E[H(p(θ | D, outcome(a)))]
```

Ask user / run precedent scan / validate model gets high score when uncertainty blocks progress.

So “ask user” appears only when info gain > cost.

## Constraint solver layer

Hard constraints:

```text
must have bedroom
must have studio
must fit site
must produce board
must respect commits
```

Soft constraints:

```text
strong desert atmosphere
low impact
good view
privacy
thermal comfort
```

Affordance legal set:

```text
LegalMoves(x) = { a | hard_constraints(T(x,a)) satisfied }
```

If move violates commit, blocked.

```text
if violates(commit): blocked
```

## Affordance generation algorithm

```text
1. Read WorldState x.
2. Generate candidate moves from operator library.
3. Filter by preconditions.
4. Simulate/estimate result x' for each move.
5. Score expected value gain.
6. Add novelty + information gain.
7. Subtract risk/cost/constraint penalties.
8. Select top-K diverse moves.
9. Explain why each move appears.
```

Pseudo:

```ts
function generateAffordances(x: WorldState): Affordance[] {
  const candidates = operators
    .filter(op => op.preconditions(x))
    .flatMap(op => op.instantiate(x))

  const scored = candidates.map(a => {
    const distribution = simulateOutcomes(x, a)
    return {
      move: a,
      score:
        expectedDeltaUtility(x, distribution)
        + beta * informationGain(x, a)
        + gamma * novelty(x, a)
        - lambda * risk(x, a)
        - mu * cost(x, a)
        - rho * constraintPenalty(x, a)
    }
  })

  return diverseTopK(scored, 7)
}
```

## Where creativity comes from without LLM

Not from magic language.

From:

```text
stochastic branching
mutation operators
recombination
novelty search
quality-diversity archive
multi-objective tension resolution
uncertainty-driven experiments
```

Examples of mutation operators:

```text
invert courtyard orientation
increase sectional depth
split program into two volumes
rotate mass toward view
bury private zone
raise roof canopy
thicken thermal wall
carve light slot
add shaded outdoor workspace
```

This is design grammar.

## Need design grammar

For architecture, operators should be domain-specific.

Example operator set:

```text
Massing:
- split volume
- stack volume
- rotate volume
- carve courtyard
- lift canopy
- bury mass
- thicken wall

Plan:
- cluster rooms
- separate public/private
- add threshold
- shorten circulation
- orient room to view

Section:
- raise roof
- step floor
- carve light well
- add thermal buffer
- create shaded void

Representation:
- generate plan
- generate section
- render atmosphere
- diagram climate logic
- compose board
```

This is where AAS becomes architectural, not generic agent system.

## What LLM still useful for

LLM not required for scoring. But useful for:

```text
naming moves
summarizing rationale
generating new operator candidates
interpreting vague user goals
writing design critique
```

Math engine should own ranking.

LLM can propose. Math engine filters.

Best hybrid:

```text
LLM proposes candidate moves
Affordance Engine scores/selects
Supervisor validates
MoveExecutor executes
```

Without LLM:

```text
operator library + search still works
less semantic creativity
more procedural creativity
```

## Final model

AAS Affordance Engine =

```text
State graph
+ design grammar operators
+ objective functions
+ constraint penalties
+ uncertainty model
+ novelty search
+ quality-diversity archive
+ branch evolution
= next moves
```

Not static game rules. More like **active search over unknown design landscape**.

Best phrase:

```text
Affordance is not known action.
Affordance is high-expected-value experiment.
```

So system exposes next moves by asking:

```text
Which legal actions most improve value,
reduce uncertainty,
resolve tension,
increase design diversity,
and advance artifacts,
with acceptable cost/risk?
```

That is real math.

Yes. Base move types hard-coded at first. But **move library should evolve**.

Need split:

```text
Move Type = stable primitive
Move Pattern = learned reusable strategy
Move Instance = one concrete action now
```

## 1. Three layers

### Layer A — Hard-coded primitives

Small fixed set. Like instruction set.

```ts
type MoveType =
  | "CREATE_ARTIFACT"
  | "REFINE_ARTIFACT"
  | "VALIDATE"
  | "ASK_USER"
  | "SPAWN_BRANCH"
  | "MERGE_BRANCH"
  | "COMMIT_DECISION"
  | "REVERT_DECISION"
```

These should stay stable.

Why? System needs safe execution, UI mapping, logging, permissions.

### Layer B — Move patterns

This is growing library.

Examples:

```text
"Generate 3 concept branches from active tension"
"Resolve privacy/view conflict through section study"
"Convert committed branch into ground-truth model seed"
"Critique render against plan/section consistency"
"Merge two branches by preserving strongest constraints"
```

These are not hard-coded forever. Agents can create these.

### Layer C — Move instances

Concrete move now:

```text
Generate 3 branch studies for desert privacy vs panoramic openness.
```

Instance uses pattern + current WorldState.

## 2. Move library schema

Store moves as reusable operators.

```ts
interface MovePattern {
  id: string
  name: string
  description: string

  moveType: MoveType
  domain: "architecture" | "representation" | "model" | "research" | "qa"

  preconditions: Predicate[]
  inputs: InputSpec[]
  outputs: OutputSpec[]
  effects: EffectSpec[]

  scoringHints: ScoringHints
  riskProfile: RiskProfile
  costModel: CostModel

  executionTemplate: ExecutionTemplate
  validationTests: ValidationTest[]

  examples: MoveExample[]
  successStats: SuccessStats

  status: "proposed" | "sandbox" | "validated" | "stable" | "deprecated"
  version: string
}
```

This is key. Move is not just prompt. Move is **typed operator with tests**.

## 3. Hard-coded vs learned

Hard-code:

```text
move type
permission model
execution lifecycle
artifact registry
validation gates
commit rules
```

Learn/grow:

```text
domain-specific move patterns
preconditions
expected effects
scoring weights
tool chains
examples
failure cases
```

So system stable outside, adaptive inside.

## 4. How agents create new moves

Agent cannot directly add stable move.

Flow:

```text
Agent observes repeated useful behavior
Agent proposes MovePattern
System stores as proposed
Sandbox runs pattern on test cases
Critic evaluates
Supervisor approves
Pattern promoted to library
Stats update over time
```

Like skill learning.

## 5. Move generation pipeline

### Step 1 — Trace successful runs

Every move execution logs:

```json
{
  "worldBefore": "...",
  "selectedMove": "...",
  "toolsUsed": "...",
  "artifactsCreated": "...",
  "worldAfter": "...",
  "scoreDelta": 0.31,
  "userAccepted": true,
  "failureModes": []
}
```

Need before/after. No before/after = no learning.

### Step 2 — Mine repeated patterns

Detect sequences that work.

Example repeated sequence:

```text
tension found
spawn 3 branches
critique branches
merge strongest two
commit hybrid
```

System abstracts into candidate pattern:

```text
"Tension-driven branch tournament"
```

### Step 3 — Generalize

Turn specific move into template.

Specific:

```text
Resolve desert privacy/view with courtyard, canopy, buried section.
```

General:

```text
Resolve [active_tension] by spawning [k] design branches using contrasting strategies.
```

### Step 4 — Define preconditions/effects

Preconditions:

```text
active_tension exists
concept phase active
no committed branch yet
```

Effects:

```text
creates branch set
creates critique artifact
updates branch scores
may create commit candidate
```

### Step 5 — Validate

Run on saved worlds / synthetic worlds.

Pass if:

```text
schema valid
artifacts produced
world state improves
no commit violation
critic score acceptable
```

### Step 6 — Promote

```text
proposed -> sandbox -> validated -> stable
```

## 6. Need simulation environment

Like robotics, yes. But design simulation is not physics only. Need **WorldState replay sandbox**.

Create dataset of design situations:

```text
world_snapshots/
  early_brief_missing_site.json
  concept_with_tension.json
  branch_comparison_ready.json
  ground_truth_missing.json
  board_needs_qa.json
```

Move pattern can be tested against these.

Simulation output:

```text
before state
candidate move
estimated after state
actual agent/tool result if run
score delta
validation result
```

This becomes move gym.

## 7. Move pattern lifecycle

```text
DISCOVER
  repeated useful behavior found

PROPOSE
  agent writes MovePattern draft

SANDBOX
  run against test worlds

CRITIQUE
  critic checks usefulness, overlap, risk

VALIDATE
  compare against baseline moves

PROMOTE
  add to active library

MONITOR
  collect live stats

PRUNE
  remove weak / redundant moves
```

## 8. Standardization plan

Need move DSL. Not prose.

### Move pattern file

```yaml
id: move.tension.branch_tournament.v1
name: Tension Branch Tournament
moveType: SPAWN_BRANCH
domain: architecture

preconditions:
  - exists: world.unresolvedTensions.active
  - equals: world.projectState.conceptStatus
    value: exploring
  - not_exists: world.branches.committed

inputs:
  - activeTension
  - normalizedGoal
  - relevantCommits

outputs:
  - type: BranchSet
    count: 3
  - type: CritiqueReport
  - type: BranchScoreTable

effects:
  - creates: branches
  - updates: tensions
  - creates_affordances:
      - CRITIQUE_BRANCH
      - MERGE_BRANCH
      - COMMIT_DECISION

scoring:
  informationGain: high
  designDiversity: high
  cost: medium
  risk: low

execution:
  strategy: hermes_kanban_task_group
  profiles:
    - aas-concept
    - aas-critic
  artifactContract: branch_tournament.schema.json

validation:
  - schema_valid
  - branch_count_at_least_3
  - each_branch_has_strengths_weaknesses
  - no_commit_modified
```

This is standard library format.

## 9. Predicate library

Moves need machine-readable preconditions.

Start simple. Use JSONLogic or CEL.

Example:

```json
{
  "and": [
    { "exists": "world.unresolvedTensions[?status=='open']" },
    { "eq": ["world.projectState.conceptStatus", "exploring"] }
  ]
}
```

Do not let every move invent custom code. Use predicate DSL.

## 10. Effect library

Effects also typed.

```ts
type Effect =
  | { type: "CREATE_ARTIFACT"; artifactType: string }
  | { type: "CREATE_BRANCH"; count?: number }
  | { type: "UPDATE_TENSION"; status?: string }
  | { type: "PROPOSE_COMMIT" }
  | { type: "CREATE_AFFORDANCE"; moveType: MoveType }
```

This makes simulation possible.

## 11. Execution templates

A pattern can execute through Hermes.

```yaml
execution:
  kind: kanban_group
  tasks:
    - title: "Create branch alternatives"
      profile: "aas-concept"
    - title: "Critique branch alternatives"
      profile: "aas-critic"
      dependsOn: ["Create branch alternatives"]
```

Same move pattern can map to different engines later.

## 12. Move discovery methods

### A. Human-authored seed library

You create first 30–50 move patterns.

Needed. No blank slate.

Categories:

```text
Brief moves
Research moves
Concept moves
Tension moves
Branch moves
Ground-truth moves
Model moves
Drawing moves
Render moves
Board moves
QA moves
Commit moves
```

### B. Agent-proposed moves

Agent says:

```text
I used this sequence 5 times. Create reusable move?
```

### C. Trace mining

System finds common successful sequences.

Use process mining:

```text
event logs -> frequent sequence mining -> candidate move macro
```

### D. Evolutionary mutation

System mutates existing move patterns:

```text
branch count 3 -> 5
critic before develop -> critic after develop
section-first -> plan-first
```

Test variants in sandbox.

### E. User-created move

In UI, user can save gesture as move:

```text
select tension -> spawn branches -> compare -> commit
Save as protocol move
```

## 13. Real math for growing library

Each move pattern has posterior success estimate.

```text
p(success | move, state_features)
```

Use bandit learning.

Score move pattern:

```text
UCB(move) = mean_reward + c * sqrt(log(N) / n_move)
```

This balances:

```text
use proven move
try under-tested move
```

Reward:

```text
reward =
Δutility
+ user_acceptance
+ artifact_quality
+ tension_reduction
- cost
- failure_penalty
```

Move library grows from evidence, not vibes.

## 14. Move usefulness metrics

Track:

```ts
SuccessStats {
  timesUsed
  successRate
  avgUtilityGain
  avgTensionReduction
  avgUserAcceptance
  avgCost
  avgRuntime
  failureModes
  bestWorldContexts
  worstWorldContexts
}
```

Then library can prune weak moves.

## 15. Avoid too many moves

Need curator.

Move library can explode. Add **Move Curator**.

Curator jobs:

```text
deduplicate similar moves
merge variants
deprecate low-value moves
promote stable moves
cluster moves by phase
compress move descriptions
update examples
```

Similarity:

```text
same preconditions + same effects + same outputs = duplicate
```

## 16. Move hierarchy

Use hierarchy:

```text
Primitive Move Type
  -> Domain Move Pattern
    -> Project-Specific Move Variant
      -> Move Instance
```

Example:

```text
SPAWN_BRANCH
  -> Tension Branch Tournament
    -> Desert Climate Branch Tournament
      -> Spawn 3 privacy/view branches now
```

## 17. UI for move library

Do not show giant library to user.

Show only contextual moves.

But have library editor:

```text
Move Library
  Stable
  Sandbox
  Proposed
  Deprecated

Move detail:
  preconditions
  effects
  examples
  success stats
  traces
  tests
```

## 18. Initial seed plan

Build v0 library with 40 moves.

### Intake

```text
Normalize brief
Extract constraints
Infer assumptions
Ask blocking question
Define success metrics
```

### Research

```text
Run precedent scan
Extract site/climate assumptions
Create material strategy
Create program matrix
```

### Concept

```text
Spawn concept branches
Create concept statement
Identify design tensions
Select ground-truth anchor
```

### Branch

```text
Develop branch
Critique branch
Compare branches
Merge branches
Kill weak branch
Commit branch
```

### Ground truth

```text
Create plan anchor
Create section anchor
Create massing anchor
Generate Rhino model seed
Validate model against commits
```

### Representation

```text
Generate drawing list
Generate render prompts
Generate diagram plan
Create board strategy
```

### QA

```text
Check artifact completeness
Check plan-section consistency
Check render-ground truth consistency
Check board hierarchy
```

### Commit

```text
Propose commit
Approve commit
Revert commit
Freeze artifact
```

## 19. How agent updates library safely

Agent can write proposal:

```yaml
status: proposed
```

Cannot directly write stable.

Promotion requires:

```text
schema validation
sandbox tests
critic review
supervisor approval
minimum performance
no duplicate conflict
```

This is like package registry.

## 20. Final architecture

```text
Move Types = hard-coded instruction set
Move Patterns = growing learned library
Move Instances = contextual actions
Move Curator = keeps library sane
Move Sandbox = tests patterns
Move Stats = evidence
Move DSL = standard format
```

Best plan:

```text
1. Define 8–12 primitive move types.
2. Define YAML/JSON move pattern schema.
3. Seed 40 architectural move patterns by hand.
4. Log every move execution with before/after WorldState.
5. Build sandbox using saved WorldState snapshots.
6. Let agents propose new MovePatterns.
7. Validate proposals in sandbox.
8. Promote useful moves.
9. Use bandit scoring to select moves.
10. Curator prunes/merges library.
```

Final truth:

```text
Do not let AI invent arbitrary action every time.
Do not freeze all actions forever.
Give it stable primitives + evolvable patterns + evidence-based promotion.
```

That gives real growth without chaos.

Hard-coded primitives come from **state mutations**, not from agent vibes.

Ask:

```text
What kinds of changes can happen to WorldState?
```

Primitive = smallest safe action class that changes WorldState in known way.

## Rule

Do not start from “what agent might do.”

Start from database/world mutations:

```text
create
modify
test
compare
select
commit
revert
ask
spawn
merge
delete/defer
```

Then turn into primitives.

## Good primitive test

A primitive is good if:

```text
1. UI can show it.
2. Backend can permission it.
3. System can log it.
4. System can validate it.
5. It changes WorldState in typed way.
6. Many domain moves can reuse it.
```

Bad primitive:

```text
"Design better courtyard"
```

Too specific. Too semantic.

Good primitive:

```text
REFINE_ARTIFACT
```

Then pattern says:

```text
Refine courtyard plan using active privacy/view tension.
```

## Derive primitives from WorldState objects

AAS WorldState has:

```text
Goal
Intent
Artifact
Tension
Branch
Commit
Question
Validation
Agent Task
```

Each object needs operations.

### Goal operations

```text
SET_GOAL
REFINE_GOAL
```

But maybe combine into:

```text
UPDATE_INTENT
```

### Artifact operations

```text
CREATE_ARTIFACT
REFINE_ARTIFACT
VALIDATE_ARTIFACT
FREEZE_ARTIFACT
```

### Tension operations

```text
CREATE_TENSION
RESOLVE_TENSION
DEFER_TENSION
```

But can reduce:

```text
RAISE_TENSION
RESOLVE_TENSION
```

### Branch operations

```text
SPAWN_BRANCH
DEVELOP_BRANCH
COMPARE_BRANCH
MERGE_BRANCH
KILL_BRANCH
```

### Commit operations

```text
PROPOSE_COMMIT
COMMIT_DECISION
REVERT_COMMIT
```

### Question operations

```text
ASK_USER
ANSWER_QUESTION
```

Usually user answers outside agent primitive, so keep:

```text
ASK_USER
```

### Validation operations

```text
VALIDATE
```

### Execution operations

```text
RUN_TOOL
```

But hide from agent unless needed. Better:

```text
REQUEST_EXECUTION
```

## Minimal primitive set

Start with 10.

```ts
type MoveType =
  | "UPDATE_INTENT"
  | "CREATE_ARTIFACT"
  | "REFINE_ARTIFACT"
  | "VALIDATE"
  | "RAISE_TENSION"
  | "RESOLVE_TENSION"
  | "SPAWN_BRANCH"
  | "MERGE_BRANCH"
  | "COMMIT_DECISION"
  | "ASK_USER"
```

This enough for MVP.

## Better full v1 set

```ts
type MoveType =
  | "UPDATE_INTENT"

  | "CREATE_ARTIFACT"
  | "REFINE_ARTIFACT"
  | "FREEZE_ARTIFACT"

  | "RAISE_TENSION"
  | "RESOLVE_TENSION"
  | "DEFER_TENSION"

  | "SPAWN_BRANCH"
  | "DEVELOP_BRANCH"
  | "COMPARE_BRANCHES"
  | "MERGE_BRANCHES"
  | "KILL_BRANCH"

  | "VALIDATE"
  | "ASK_USER"

  | "PROPOSE_COMMIT"
  | "COMMIT_DECISION"
  | "REVERT_COMMIT"

  | "REQUEST_EXECUTION"
```

18 primitives. Good upper bound.

Do not exceed ~20 at first.

## How to know if primitive too specific

If primitive mentions architecture noun, too specific.

Bad primitives:

```text
CREATE_FLOOR_PLAN
GENERATE_COURTYARD
MAKE_SECTION
DESIGN_MASSING
```

These are **move patterns**, not primitives.

Good mapping:

```text
CREATE_ARTIFACT + artifactType=floor_plan
CREATE_ARTIFACT + artifactType=section
CREATE_ARTIFACT + artifactType=massing_model
```

## Primitive anatomy

Each primitive needs contract.

```ts
interface MovePrimitive {
  type: MoveType
  allowedTargets: WorldObjectType[]
  requiredInputs: string[]
  possibleOutputs: string[]
  permissionLevel: "safe" | "approval" | "dangerous"
  reversible: boolean
  worldDeltaSchema: object
}
```

Example:

```ts
{
  type: "COMMIT_DECISION",
  allowedTargets: ["Branch", "TensionResolution", "Artifact"],
  requiredInputs: ["rationale", "evidenceRefs", "affectedObjects"],
  possibleOutputs: ["Commit"],
  permissionLevel: "approval",
  reversible: true,
  worldDeltaSchema: "CommitDelta"
}
```

## Primitive = typed world delta

Define by delta.

```ts
type WorldDelta =
  | { kind: "ArtifactCreated"; artifactId: string }
  | { kind: "ArtifactRefined"; artifactId: string; revisionId: string }
  | { kind: "TensionRaised"; tensionId: string }
  | { kind: "BranchSpawned"; branchIds: string[] }
  | { kind: "CommitCreated"; commitId: string }
```

Then primitive is valid only if it emits known delta.

This keeps system sane.

## Selection method

Make table:

| World object    | Needed mutation      | Primitive       |
| --------------- | -------------------- | --------------- |
| Goal            | change direction     | UPDATE_INTENT   |
| Artifact        | make new output      | CREATE_ARTIFACT |
| Artifact        | improve output       | REFINE_ARTIFACT |
| Artifact/Branch | check quality        | VALIDATE        |
| Tension         | detect conflict      | RAISE_TENSION   |
| Tension         | solve conflict       | RESOLVE_TENSION |
| Branch          | create alternative   | SPAWN_BRANCH    |
| Branch          | improve alternative  | DEVELOP_BRANCH  |
| Branch          | combine alternatives | MERGE_BRANCHES  |
| Decision        | make truth           | COMMIT_DECISION |
| Unknown         | need human info      | ASK_USER        |

That is how primitives emerge.

## Design rule

Primitives should be:

```text
domain-agnostic
state-changing
permissionable
composable
few
stable
```

Patterns should be:

```text
domain-specific
creative
learned
many
evolvable
```

## Example

Primitive:

```text
SPAWN_BRANCH
```

Patterns:

```text
Spawn 3 massing branches
Spawn 3 climate strategy branches
Spawn 3 plan organization branches
Spawn 3 board layout branches
```

Instance:

```text
Spawn 3 branches resolving privacy/view tension for desert retreat.
```

## Practical plan

1. List WorldState objects.
2. For each object, list legal mutations.
3. Merge similar mutations.
4. Remove domain nouns.
5. Keep only actions needing different permissions/UI/execution lifecycle.
6. Define input/output schema for each.
7. Test against 20 real AAS scenarios.
8. If two primitives always share same schema/lifecycle, merge.
9. If one primitive has too many special cases, split.

## Final primitive set I recommend

```ts
type MoveType =
  | "UPDATE_INTENT"
  | "CREATE_ARTIFACT"
  | "REFINE_ARTIFACT"
  | "VALIDATE"
  | "RAISE_TENSION"
  | "RESOLVE_TENSION"
  | "SPAWN_BRANCH"
  | "DEVELOP_BRANCH"
  | "COMPARE_BRANCHES"
  | "MERGE_BRANCHES"
  | "KILL_BRANCH"
  | "ASK_USER"
  | "PROPOSE_COMMIT"
  | "COMMIT_DECISION"
  | "REVERT_COMMIT"
  | "REQUEST_EXECUTION"
```

Start smaller if needed:

```text
CREATE_ARTIFACT
REFINE_ARTIFACT
VALIDATE
SPAWN_BRANCH
MERGE_BRANCHES
COMMIT_DECISION
ASK_USER
```

Best mental model:

```text
Primitive = verb in AAS physics.
Pattern = learned design tactic.
Instance = current move.
```

Yes. Exactly.

Primitives are **system verbs**, not architectural design verbs.

They define what an agent is allowed to do inside AAS/Hermes:

```text
create thing
revise thing
test thing
compare things
branch path
merge paths
ask human
commit truth
revert truth
run execution
```

They are closer to **software engineering + runtime physics** than architecture.

Architecture lives one layer above, in **move patterns**.

Example:

```text
Primitive:
SPAWN_BRANCH

Architectural move pattern:
Spawn 3 spatial strategies for privacy/view tension.

Concrete instance:
Generate courtyard, screened-canopy, and buried-section branches for desert artist retreat.
```

So stack becomes:

```text
Primitive = stable AAS operation
Pattern = reusable architectural tactic
Instance = current contextual move
Hermes task = execution packet
Agent output = artifact/world delta
```

Why this matters:

```text
Primitives give safety, logging, permissions, UI affordance, validation.
Patterns give domain intelligence.
Instances give project specificity.
Hermes executes.
AAS records truth.
```

So yes: primitives are not the “design intelligence.” They are the **small control vocabulary** that lets design intelligence move safely through the system.

Design intelligence sits **above primitives** and **below final execution**.

```text
Primitives = what system can do
Design intelligence = what move is worth doing, why, and in what design direction
Hermes = who/what executes it
```

## Main design-intelligence layers

### 1. Design State Model

This is the representation of architecture as computable design state.

```text
program
site
climate
spatial logic
formal logic
material logic
circulation
views
privacy
structure
representation goals
ground-truth model state
```

Without this, affordances are generic.

This layer answers:

```text
What kind of architectural problem is this?
What design variables matter?
What is currently unresolved?
```

### 2. Design Objective Model

This defines what “better” means.

Example objectives:

```text
spatial coherence
concept strength
program fit
environmental response
view quality
privacy gradient
constructability
representation clarity
board narrative strength
ground-truth consistency
```

This layer gives the Intent Gradient its meaning.

```text
Move good if it improves design objectives.
```

### 3. Tension Engine

This is huge. Design intelligence often appears as conflict detection.

```text
privacy vs openness
thermal mass vs lightness
iconic form vs buildability
compact plan vs rich spatial sequence
image atmosphere vs drawing consistency
```

Tension Engine answers:

```text
Where is design pressure?
What contradiction blocks progress?
What move could resolve it?
```

This is more “architectural” than primitives.

### 4. Move Pattern Library

This is where reusable design tactics live.

Not:

```text
CREATE_ARTIFACT
```

But:

```text
Create section-first anchor when climate and vertical light drive concept.
Spawn courtyard/canopy/buried branches for desert privacy-view conflict.
Use plan parti to stabilize render generation.
Generate diagram set from committed concept tensions.
```

This is the core learned design intelligence.

Primitives are verbs.
Move patterns are **architectural strategies**.

### 5. Affordance Compiler

This is the “designer brain” of the system.

It combines:

```text
WorldState
+ design objectives
+ tensions
+ move pattern library
+ branch scores
+ uncertainty
+ constraints
+ artifact gaps
```

Then produces moves.

It asks:

```text
Given this design state, what architectural tactic has highest expected value now?
```

### 6. Branch Ecology

This is design exploration intelligence.

It knows not to collapse early into one answer.

```text
spawn alternatives
develop each enough to compare
critique
score
merge
kill
commit
```

This layer creates creative range.

### 7. Critic / Evaluator

This is taste + discipline.

It evaluates:

```text
Is this concept weak?
Is the section doing real work?
Does plan contradict render?
Is this just image style with no architecture?
Does board communicate the idea?
```

Critic converts vague design quality into evaluable signals.

### 8. Commitment Logic

This decides when exploration becomes truth.

Design intelligence is not only generating options. It is knowing when to commit.

```text
branch has enough evidence
critical tensions resolved
ground truth stable
user values satisfied
downstream artifacts can proceed
```

## Clean stack

```text
AAS/Hermes infrastructure
  primitives
  tasks
  profiles
  logs
  artifacts

Affordance system
  WorldState
  primitives
  move execution
  scoring

Design intelligence
  design state model
  objective model
  tension engine
  architectural move patterns
  branch ecology
  critic/evaluator
  commitment logic

Agents
  produce artifacts
  propose patterns
  critique outputs
  execute Hermes tasks
```

## Most important answer

The design intelligence is **not one component**.

It is the combination of:

```text
Design ontology
+ objective functions
+ tension detection
+ architectural move patterns
+ branch search
+ critic scoring
+ commit rules
```

But if naming one place:

**Design intelligence lives in the Affordance Compiler and Move Pattern Library.**

The compiler decides **which tactic applies now**.
The library defines **what architectural tactics exist**.

Affordance Compiler should be **hybrid**.

Not fully hardcoded. Not fully LLM.

```text id="9wuvga"
Hardcoded skeleton
+ configurable rules
+ learned move patterns
+ statistical scoring
+ optional LLM proposal
= Affordance Compiler
```

## What is hardcoded

Hardcode **compiler pipeline**, not design content.

```text id="n9gpa9"
1. Read WorldState
2. Detect current phase
3. Find valid move patterns
4. Instantiate candidate moves
5. Filter illegal moves
6. Score moves
7. Diversify top moves
8. Explain why shown
9. Send to UI
```

Also hardcode:

```text id="k07ccg"
primitive move types
permission gates
schema validation
commit protection
execution lifecycle
event logging
```

These must be stable.

## What is not hardcoded

Do not hardcode every design move.

These should be data-driven / learned:

```text id="yjobke"
architectural move patterns
preconditions
objective weights
scoring hints
phase-specific tactics
examples
failure modes
tool chains
```

Example pattern file:

```yaml id="fsb1w8"
id: move.concept.tension_branch_tournament.v1
name: Tension Branch Tournament
primitive: SPAWN_BRANCH
phase: concept

when:
  - exists: active_tension
  - not_exists: committed_branch
  - artifact_status: concept != committed

creates:
  - branch_set
  - critique_prompt
  - comparison_matrix

score:
  information_gain: 0.8
  design_diversity: 0.9
  cost: 0.45
  risk: 0.25
```

Compiler reads this. No code change.

## Compiler architecture

```text id="8oj94q"
WorldState
  -> Feature Extractor
  -> Pattern Matcher
  -> Move Instantiator
  -> Constraint Filter
  -> Scoring Engine
  -> Diversity Selector
  -> Affordance Output
```

### 1. Feature Extractor

Turns WorldState into computable features.

```ts id="jvnycc"
features = {
  phase: "concept",
  hasActiveTension: true,
  hasCommittedBranch: false,
  artifactGaps: ["ground_truth", "section", "board_strategy"],
  uncertainty: { site: 0.6, userTaste: 0.4 },
  criticalTensions: 1,
  branchCount: 0,
  commitCount: 2
}
```

### 2. Pattern Matcher

Finds move patterns whose `when` clauses pass.

```text id="33gyl3"
if exists active_tension
and no committed_branch
and phase == concept
=> Tension Branch Tournament valid
```

### 3. Move Instantiator

Turns abstract pattern into concrete move.

Pattern:

```text id="51xldb"
Spawn branches for active tension
```

Instance:

```text id="0i20ls"
Spawn 3 branches resolving privacy vs panoramic openness.
```

### 4. Constraint Filter

Removes illegal/unsafe moves.

```text id="ihq95m"
violates committed decision -> remove or mark blocked
requires missing artifact -> block
requires user approval -> mark approval_required
too expensive -> downgrade
```

### 5. Scoring Engine

Scores expected usefulness.

```text id="3v6tfj"
score =
  0.30 * goalAlignment
+ 0.20 * tensionReduction
+ 0.15 * artifactProgress
+ 0.15 * informationGain
+ 0.10 * designDiversity
- 0.05 * risk
- 0.05 * cost
```

Weights configurable by phase/project.

### 6. Diversity Selector

Do not show 7 versions of same move.

Pick top moves across categories:

```text id="5ezauo"
1 exploration move
1 validation move
1 artifact move
1 user-question move if needed
1 commit move if ready
1 critique move
```

## Pseudocode

```ts id="e09zma"
function compileAffordances(world: WorldState): Affordance[] {
  const features = extractFeatures(world)

  const candidatePatterns = moveLibrary.filter(pattern =>
    evaluatePredicate(pattern.when, features, world)
  )

  const candidates = candidatePatterns.flatMap(pattern =>
    instantiatePattern(pattern, world, features)
  )

  const legal = candidates.map(move =>
    applyConstraints(move, world)
  )

  const scored = legal.map(move => ({
    ...move,
    score: scoreMove(move, world, features)
  }))

  const selected = selectDiverseTopK(scored, {
    k: 7,
    minCategories: ["explore", "validate", "create", "commit"]
  })

  return selected.map(explainAffordance)
}
```

## Does it need LLM?

No for core loop.

LLM optional in two places:

```text id="0dmc81"
1. propose new move pattern
2. write human-readable rationale
```

Core compiler can be deterministic/statistical.

Best design:

```text id="ybvwjj"
Rules generate safe candidates.
Math ranks candidates.
LLM proposes extra candidates.
Supervisor filters LLM candidates.
```

## Example

WorldState:

```text id="zzcvu0"
Phase: concept
Goal: desert artist retreat board
Active tension: privacy vs panoramic openness
Committed: Southern California desert
No branch committed
No ground truth model
```

Compiler outputs:

```text id="hwq8ll"
1. Spawn 3 branch strategies for privacy/view tension
2. Ask user whether privacy or view is higher priority
3. Build section-first ground-truth anchor
4. Run precedent scan for desert courtyard houses
5. Generate visual strategy probe
6. Critique current concept assumptions
7. Commit SoCal desert climate assumptions
```

Why these appear:

```text id="jr7fm6"
active tension exists
branch count is zero
ground truth missing
site assumption affects all downstream artifacts
concept phase needs alternatives before commit
```

## Compiler itself: hardcoded or not?

Answer:

```text id="p5gm52"
Compiler engine = hardcoded.
Move library = data-driven.
Scoring weights = configurable/learned.
Move proposals = agent-generatable.
Promotion = validated before active.
```

Like game engine:

```text id="x9g0ln"
Physics engine hardcoded.
Level content data-driven.
Player strategies emergent.
```

AAS:

```text id="fmeeq6"
Affordance compiler hardcoded.
Architectural tactics data-driven.
Design intelligence emerges from patterns + scoring + agents.
```

## Build order

1. Hardcode compiler pipeline.
2. Create predicate DSL.
3. Create move pattern schema.
4. Seed 30–50 patterns.
5. Implement scorer.
6. Log every move result.
7. Add Move Curator later.
8. Let agents propose new patterns into sandbox.

## Final

Affordance Compiler should be **hardcoded as infrastructure**, but **not hardcoded as design brain**.

Design brain lives in:

```text id="qrsdec"
move pattern library
objective model
tension model
branch scoring
learned success stats
agent proposals
```

Compiler just turns those into next visible moves.

Correct. **LLM weights do not learn during AAS run.**

So “agent learning” means **system-level learning**, not model-weight learning.

```text
LLM learning = pretrain / finetune / RL changes weights
AAS learning = memory + skills + move stats + patterns + policies change outside weights
```

## What learns in AAS

### 1. WorldState learns project truth

Not model learning. State update.

```text
user says site = Mojave
commit created
all future moves constrained by Mojave
```

This is **project learning**.

### 2. Move Library learns tactics

System records which move patterns work.

```text
Tension Branch Tournament used 20 times
success rate 75%
best when active_tension exists + no committed branch
weak when ground_truth already committed
```

This is **policy learning**.

### 3. Scorer learns weights

Affordance Compiler adjusts move scores from outcomes.

```text
move score predicted high
user rejected output
lower future score in similar contexts
```

This can use bandits / Bayesian updates.

### 4. Agent profile learns preferences

Hermes profile memory/skills can store reusable behavior.

```text
User likes hardware UI, non-generic cyber, tactile modules
Research agent should make assumptions, not ask broad questions
```

This is **retrieval learning**, not weight learning.

### 5. Skill library learns procedures

Successful repeated sequences become saved skills/move patterns.

```text
privacy/view tension -> spawn 3 schemes -> critique -> merge -> commit
```

This becomes reusable procedure.

## Technical learning layers

```text
No weight update:
  Context memory
  Vector search
  Commit ledger
  Move stats
  Pattern library
  Skill files
  Preference profile
  Artifact lineage

Possible weight update later:
  finetune
  RLHF/RLAIF
  preference model
  reward model
```

## Real math learning

For move selection, use contextual bandit.

State features:

```text
x = phase, artifact gaps, active tensions, branch count, uncertainty, user prefs
```

Move pattern:

```text
a = candidate affordance
```

Reward after execution:

```text
r =
  Δdesign_score
+ user_acceptance
+ artifact_quality
+ tension_reduction
- cost
- failure_penalty
```

Learn expected reward:

```text
Q(x, a) = E[r | x, a]
```

Then compiler ranks:

```text
score(a) = Q(x,a) + exploration_bonus
```

Example UCB:

```text
score(a) = mean_reward(a) + c * sqrt(log(N) / n_a)
```

So system “learns” which moves work, without changing LLM.

## What Hermes memory means here

Hermes memory helps individual profiles behave better across sessions.

But AAS must keep boundary:

```text
Hermes memory = agent habit / skill / recall
AAS DB = project truth
```

Do not let profile memory silently define project state.

## Example

Agent runs move:

```text
SPAWN_BRANCH: Tension Branch Tournament
```

Output bad. User rejects.

AAS logs:

```json
{
  "movePattern": "tension_branch_tournament",
  "worldFeatures": {
    "phase": "concept",
    "branchCount": 0,
    "activeTension": "privacy_vs_openness"
  },
  "result": "rejected",
  "reward": -0.4,
  "failure": "branches too generic"
}
```

Move Curator updates pattern:

```text
Add requirement:
Each branch must have spatial mechanism + drawing anchor + weakness.
```

Next time agent receives stricter task packet.

No model weights changed. But system improved.

## So answer

Agent itself does not learn in biological/weight sense.

AAS learns by changing:

```text
what context agent receives
which moves are offered
how moves are scored
which patterns exist
which skills/profiles are loaded
which constraints become committed truth
```

Best wording:

```text
The LLM is fixed intelligence.
AAS is adaptive environment.
Learning happens in environment, not inside model weights.
```

That is correct technical framing.

Use **hard isolation + explicit inheritance**.

No global preference soup.

```text
Tenant
  -> Organization
    -> Project
      -> Session / Run
        -> Agent Task
```

Each layer has own preferences. Lower layer can inherit only through controlled rules.

## Core rule

```text
Preference never applies unless scoped.
```

Every preference record needs:

```ts
Preference {
  id
  tenantId
  scopeType: "user" | "team" | "project" | "session" | "agent"
  scopeId
  key
  value
  confidence
  source
  visibility
  expiresAt?
  createdBy
}
```

No preference without owner + scope.

## Preference hierarchy

When agent needs context, AAS builds profile stack:

```text
System defaults
+ organization standards
+ project brief
+ project commits
+ session choices
+ current user preferences
+ explicit prompt
```

Conflict rule:

```text
explicit prompt > session > project commits > user prefs > team prefs > defaults
```

Example:

```text
User A likes brutalist dark boards.
User B likes clean white academic boards.
Project commit says: "Use muted desert material palette."
Current prompt says: "Make this one minimal white."

Result:
current prompt wins for this run
project commit constrains material palette
User A/B prefs do not leak unless they are current actor or project-approved
```

## Separate “user preference” from “project truth”

This is biggest protection.

```text
User preference = personal taste
Project commit = accepted design fact
```

Bad:

```text
User likes neon cyber UI -> all projects become neon
```

Good:

```text
User preference stored under user scope.
Only becomes project truth if committed into project.
```

## Agent context compiler

Agents never read raw preference DB.

ContextDistiller compiles allowed preferences.

```text
request(userId, projectId, sessionId, agentId)
  -> load only authorized scopes
  -> resolve conflicts
  -> redact private prefs
  -> produce Agent Brief
```

Agent sees:

```text
For this run:
- Use project-approved desert palette.
- Current user prefers concise critique.
- Do not assume other users' private tastes.
```

Not whole database.

## Multi-user project pattern

Need project-level decisions.

When multiple users collaborate:

```text
User preference -> proposal
Team/project approval -> project commit
Project commit -> shared truth
```

Example:

```text
User A: prefers section-heavy presentation.
System: stores as User A preference.
Team approves: "This board should be section-driven."
System: creates Project Commit.
Now all agents use it.
```

## Prevent preference bleeding

### 1. Namespacing

All memory keys include tenant/project/user scope.

```text
tenant:t1/project:p9/user:u3/preferences/style
tenant:t1/project:p9/commits/design_direction
```

### 2. Retrieval filters

Vector search must filter by scope before similarity search.

Wrong:

```text
search("user style preferences")
```

Right:

```text
search(query, filter={tenantId, allowedScopes})
```

### 3. No global vector memory

Avoid one shared vector DB collection unless strict metadata filters enforced.

Safer:

```text
collection per tenant
namespace per project/user
```

### 4. Context manifests

Every Agent Brief includes source manifest.

```json
{
  "contextSources": [
    {"type": "project_commit", "id": "commit_12"},
    {"type": "user_pref", "userId": "u7", "id": "pref_44"}
  ]
}
```

So leaks auditable.

### 5. Preference promotion gate

Only explicit user/team approval promotes preference:

```text
personal preference -> project convention -> project commit
```

Never automatic.

### 6. Ephemeral run preferences

User can say:

```text
for this run only, make it more experimental
```

Store under session/run scope with expiry.

## Hermes-specific boundary

Hermes profiles can have memory. Dangerous if shared.

Use one of three models:

### Best: project-scoped Hermes profiles

```text
aas-concept__project_p123
aas-critic__project_p123
```

Memory isolated per project.

### Cheaper: shared base profile + AAS brief injection

Hermes profile has generic skills only. AAS injects project/user context every task.

```text
Hermes memory = how to work
AAS brief = what project/user wants
```

### Avoid

```text
one aas-concept profile remembers all users/projects
```

That bleeds.

## Recommended Hermes setup

```text
Base profile templates:
  aas-research-base
  aas-concept-base
  aas-critic-base

Runtime project profiles:
  aas-research-p123
  aas-concept-p123
  aas-critic-p123
```

Project profiles inherit skills from base but keep memory/session local.

## Preference types

Classify preferences by portability.

```ts
PreferencePortability =
  | "private_user"      // never shared
  | "team_standard"     // shared inside org
  | "project_specific"  // project truth
  | "session_ephemeral" // current run only
  | "agent_skill"       // how agent works, not what user likes
```

This prevents mixing:

```text
user taste
project design facts
agent skill memory
```

## Conflict resolution

Use deterministic resolver.

```ts
resolvePreference(key, context) {
  candidates = loadAllowedPreferences(key, context)
  sort by precedence
  detect conflicts
  if high-impact conflict -> ask user/team
  return resolvedValue + sourceRefs
}
```

Conflict example:

```text
User A: "prefer minimal board"
User B: "prefer dense technical board"
```

If both active and no project commit:

```text
Affordance appears:
"Resolve board density preference conflict"
```

System does not silently choose.

## UI support

Add preference scope badges.

When agent uses preference, show:

```text
Using:
[Project Commit] Section-first narrative
[User Preference] terse text annotations
[Team Standard] A1 board format
```

User can click:

```text
apply to this run
apply to project
apply to team
make private
forget
```

## Learning rule

System can infer candidate preferences, but not apply globally.

```text
Observed: User rejected ornate boards 4 times.
Candidate preference: prefers restrained board hierarchy.
Scope: user-private.
Confidence: 0.72.
Status: inferred, not promoted.
```

Agent may use it only for that user, and ideally with confidence.

## Data model

```ts
interface PreferenceRecord {
  id: string
  tenantId: string
  scope: {
    type: "user" | "team" | "project" | "session" | "agent_profile"
    id: string
  }
  key: string
  value: unknown
  confidence: number
  source: "explicit" | "inferred" | "imported" | "commit"
  portability: "private_user" | "team_standard" | "project_specific" | "session_ephemeral" | "agent_skill"
  visibility: "private" | "project" | "team" | "org"
  createdBy: string
  allowedConsumers: string[]
  expiresAt?: string
}
```

## Final architecture

```text
Preference Store
  scoped + filtered

ContextDistiller
  resolves allowed prefs

Agent Brief
  contains only relevant scoped prefs

Commit Ledger
  project truth only

Hermes Profiles
  project-scoped or generic-only

Audit Log
  records what preference influenced output
```

Best principle:

```text
Preferences are private by default.
Project truth is explicit by commit.
Agent memory is procedural, not user taste.
Retrieval is scope-filtered before semantic.
```

That prevents bleeding.

Need **process memory**, not just move memory.

Move cannot rank alone. Move ranks inside **trajectory**.

```text
bad:
score(move | current_state)

better:
score(move | current_state, process_phase, trajectory, unresolved_debt, future_path)
```

## Core answer

Affordance system needs 3 extra layers:

```text
Process Grammar
Trajectory Memory
Elegance Metric
```

These make “right move at right time.”

---

# 1. Process Grammar

Design process has phases, but not rigid pipeline.

Use **soft phase state machine**.

```text
Intake
Research
Concept
Branching
Ground Truth
Development
Representation
Board Assembly
QA
Delivery
```

Each phase has:

```ts
Phase {
  name
  entryConditions
  exitConditions
  preferredMoveTypes
  discouragedMoveTypes
  requiredArtifacts
  unresolvedDebts
}
```

Example:

```yaml
phase: Concept
preferred:
  - RAISE_TENSION
  - SPAWN_BRANCH
  - COMPARE_BRANCHES
  - PROPOSE_COMMIT
discouraged:
  - FINAL_EXPORT
  - DETAILED_RENDER
exit:
  - concept_branch_committed
  - ground_truth_anchor_selected
```

This prevents dumb brute force.

In Concept phase, “generate final board” gets low score even if possible.

---

# 2. Trajectory Memory

System remembers path, not just current snapshot.

```ts
Trajectory {
  states: WorldStateSnapshot[]
  moves: MoveExecution[]
  decisions: Commit[]
  abandonedBranches: Branch[]
  failedMoves: Failure[]
  unresolvedDebts: DesignDebt[]
}
```

Move score depends on history:

```text
same move failed before? lower score
move repeats without new info? lower score
move resolves old debt? higher score
move opens too many loops? lower score
move unlocks future moves? higher score
```

So ranking becomes:

```text
Score(move) =
  local_value
+ trajectory_value
+ unlock_value
+ debt_reduction
+ elegance
- repetition_penalty
- premature_commit_penalty
- process_debt_penalty
```

---

# 3. Design Debt

Need track “unresolved obligations.”

Example debts:

```text
site assumption not confirmed
concept branch not critiqued
ground truth missing
render not checked against plan
board lacks hierarchy
too many branches open
```

Debt object:

```ts
DesignDebt {
  id
  type
  description
  severity
  createdByMove
  blocksPhases
  affectedArtifacts
  payoffIfResolved
}
```

Moves that reduce high-severity debt rank higher.

```text
Resolve major design debt > make shiny new artifact
```

This gives maturity.

---

# 4. Unlock Value

Right move often good because it unlocks next good moves.

Not just immediate reward.

Use planning horizon.

```text
Q(move) = immediate_gain + discounted_future_gain
```

Formula:

```text
Q(a_t) = r(x_t, a_t) + γ · max_a Q(x_{t+1}, a)
```

Approximate with shallow lookahead:

```text
simulate move
generate next affordances
estimate best next 3 moves
add unlock score
```

Example:

```text
Build section anchor
Immediate output: one artifact
Future unlocks: plan, model, render, QA
High unlock value
```

So it ranks above “generate pretty render.”

---

# 5. Move Dependency Graph, but internal

Do not expose fixed graph as UI. Use graph internally.

```text
move pattern -> produces artifact/effect -> enables other move patterns
```

Example:

```text
Commit ground-truth anchor
  enables:
    Generate plan
    Generate section
    Generate model
    Validate render
    Compose board
```

Move pattern stores:

```yaml
produces:
  - ground_truth_anchor
enables:
  - create_plan_from_anchor
  - create_section_from_anchor
  - validate_render_against_anchor
```

Compiler uses this to score unlocks.

Graph as **semantic dependency graph**, not user-authored workflow.

---

# 6. Elegance Metric

Elegance = doing more with less while increasing coherence.

Not vibe. Define mathematically.

A move is elegant if it:

```text
resolves multiple tensions
creates reusable ground truth
reduces complexity
increases coherence
unlocks many downstream moves
uses few resources
avoids redundant artifacts
```

Elegance score:

```text
Elegance(a) =
  α · tension_resolved_count
+ β · downstream_unlocks
+ γ · coherence_gain
+ δ · artifact_reuse
- ε · new_complexity
- ζ · cost
- η · fragmentation
```

In words:

```text
Elegant move compresses system.
Brute-force move expands mess.
```

## Example

Move A:

```text
Generate 10 renders
```

Looks productive, but:

```text
low elegance
high cost
low coherence
low unlock
```

Move B:

```text
Create section-first ground truth resolving light/privacy/thermal tension
```

High elegance:

```text
one artifact stabilizes many future artifacts
resolves multiple tensions
unlocks model, plan, render, board
```

---

# 7. Process Position Encoding

Every move pattern has phase-fit curve.

Not binary. Curve.

```text
fit(move, phase) ∈ [0,1]
```

Example:

```text
SPAWN_BRANCH:
Intake 0.2
Concept 1.0
Ground Truth 0.5
Board Assembly 0.1
Delivery 0.0
```

This gives timing intelligence.

---

# 8. Right move at right time formula

Full score:

```text
Score(a | x, τ) =
  w1 · ImmediateDesignGain
+ w2 · TensionReduction
+ w3 · InformationGain
+ w4 · ArtifactProgress
+ w5 · UnlockValue
+ w6 · PhaseFit
+ w7 · Elegance
- w8 · Cost
- w9 · Risk
- w10 · RepetitionPenalty
- w11 · PrematurityPenalty
- w12 · FragmentationPenalty
```

Where:

```text
x = current world state
τ = trajectory/process history
a = candidate move
```

This is not brute force one move. This is contextual ranking.

---

# 9. How agent sees it

Agent should not see all math.

Agent receives:

```text
Current process phase: Concept / selecting ground-truth anchor
Open debt: no branch critique, no ground-truth anchor
Top moves:
1. Critique current branches
   why: required before commit, reduces decision risk
2. Select ground-truth anchor
   why: unlocks model/drawing/render pipeline
3. Ask user about privacy vs view priority
   why: high information gain, low cost
```

Agent then chooses or proposes override.

---

# 10. Avoid isolated move memory

Move pattern stats must be conditional.

Bad:

```text
Move X success rate = 80%
```

Better:

```text
Move X success rate:
- Concept phase, active tension, no committed branch: 86%
- Board phase, ground truth missing: 22%
- After user rejection: 40%
```

Use contextual features.

```ts
MoveOutcome {
  movePatternId
  phase
  worldFeatures
  previousMoves
  openDebts
  branchCount
  artifactCoverage
  reward
}
```

Model learns:

```text
move works when context matches
```

Not globally.

---

# 11. Need “process landmarks”

Landmarks are milestones that orient ranking.

```text
normalized brief
research sufficient
concept branches generated
branch critiqued
branch committed
ground truth anchor committed
model available
drawing set coherent
board draft complete
QA passed
```

Each landmark changes affordance ranking.

Move can have:

```yaml
best_before:
  - branch_committed
best_after:
  - active_tension_identified
requires_landmarks:
  - normalized_brief
```

---

# 12. Elegance in UI

In Field Navigator, elegance visible.

Show move as:

```text
thin line = low impact
thick smooth arc = elegant unlock path
many messy jagged lines = fragmentation
```

Elegant move visually:

```text
one move pulls several red tensions into one blue commit path
```

Brute force visually:

```text
many scattered artifact nodes, no coherence gain
```

---

# 13. Compiler pipeline update

```text
1. Extract current world features.
2. Determine soft phase distribution.
3. Load trajectory memory.
4. Detect design debts.
5. Generate candidate moves from pattern library.
6. Filter illegal moves.
7. Estimate immediate gain.
8. Estimate future unlocks.
9. Compute phase fit.
10. Compute elegance.
11. Apply contextual outcome stats.
12. Select diverse top-K.
13. Present ranked moves with rationale.
```

Pseudo:

```ts
function rankMove(a, world, trajectory) {
  return (
    gain(a, world)
    + tensionReduction(a, world)
    + infoGain(a, world)
    + artifactProgress(a, world)
    + unlockValue(a, world)
    + phaseFit(a, world.phase)
    + elegance(a, world, trajectory)
    + learnedContextualReward(a, world, trajectory)
    - cost(a)
    - risk(a)
    - repetitionPenalty(a, trajectory)
    - prematurityPenalty(a, world)
    - fragmentationPenalty(a, world)
  )
}
```

---

# 14. Direct answer

System remembers moves in relation to overall process by storing:

```text
trajectory
phase
landmarks
design debt
dependency graph
contextual outcome stats
```

System presents right move by ranking against:

```text
current phase
open tensions
missing landmarks
future unlocks
prior failures
current user goal
elegance score
```

System incorporates elegance by rewarding:

```text
few moves
high coherence
multi-tension resolution
artifact reuse
future unlocks
low fragmentation
strong commitment path
```

Best phrase:

```text
Affordance Compiler should not ask:
“What move is useful?”

It should ask:
“What move best advances this design trajectory with least fragmentation and greatest future leverage?”
```
Yes. That score too small. Good for MVP, not serious AAS.

Need **multi-layer score**, not one flat list.

Use hierarchy:

```text
TotalScore =
  ProcessScore
+ DesignScore
+ SearchScore
+ ExecutionScore
+ LearningScore
+ UserScore
+ EleganceScore
- Penalties
```

## Full scoring model

```text
Score(a | x, τ, u, L) =
  Wp · Process(a)
+ Wd · Design(a)
+ Ws · Search(a)
+ We · Execution(a)
+ Wu · UserAlignment(a)
+ Wl · LearningValue(a)
+ Wg · Governance(a)
+ Wel · Elegance(a)
- P(a)
```

Where:

```text
a = candidate move
x = current WorldState
τ = trajectory history
u = user / team / project preference context
L = move library outcome history
```

## 1. ProcessScore

Does move fit current design process?

```text
Process(a) =
  phase_fit
+ landmark_progress
+ dependency_readiness
+ design_debt_reduction
+ process_continuity
+ bottleneck_relief
+ handoff_quality
+ timing_quality
```

Variables:

```text
phase_fit
landmark_progress
exit_condition_progress
entry_condition_satisfaction
process_debt_reduction
blocked_path_unblocking
handoff_cleanliness
trajectory_continuity
non_redundancy
timing_quality
```

## 2. DesignScore

Does move improve architecture?

```text
Design(a) =
  concept_strength_gain
+ spatial_coherence_gain
+ program_fit_gain
+ site_response_gain
+ climate_response_gain
+ structural_logic_gain
+ material_logic_gain
+ circulation_clarity_gain
+ view_privacy_resolution
+ experiential_quality_gain
+ representation_clarity_gain
+ ground_truth_consistency_gain
```

Architecture-specific variables:

```text
concept_strength
spatial_coherence
programmatic_fit
site_specificity
climate_intelligence
thermal_logic
daylight_logic
view_quality
privacy_gradient
circulation_legibility
sectional_richness
massing_clarity
structural_plausibility
material_tectonic_fit
constructability
scale_consistency
drawing_consistency
render_consistency
board_narrative_strength
```

## 3. SearchScore

Does move improve exploration?

```text
Search(a) =
  information_gain
+ uncertainty_reduction
+ novelty_gain
+ diversity_contribution
+ hypothesis_discrimination
+ option_space_coverage
+ pareto_front_improvement
+ branch_health_gain
```

Variables:

```text
information_gain
uncertainty_reduction
expected_value_of_information
novelty
diversity
coverage
branch_discrimination
branch_survival_value
pareto_improvement
exploration_bonus
exploitation_value
regret_reduction
```

## 4. ExecutionScore

Can system execute move well now?

```text
Execution(a) =
  tool_readiness
+ input_completeness
+ artifact_availability
+ agent_capability_match
+ runtime_reliability
+ output_verifiability
+ recovery_ease
```

Variables:

```text
input_completeness
tool_availability
agent_profile_fit
expected_runtime
expected_token_cost
compute_cost
artifact_dependency_satisfaction
output_contract_clarity
validation_availability
failure_recoverability
parallelizability
cache_reuse
```

## 5. UserAlignmentScore

Does move respect people and preference scope?

```text
UserAlignment(a) =
  explicit_prompt_alignment
+ project_commit_alignment
+ current_user_preference_fit
+ team_standard_fit
+ approval_likelihood
+ collaboration_conflict_reduction
```

Variables:

```text
explicit_user_goal_fit
current_prompt_fit
project_commit_fit
user_preference_fit
team_standard_fit
stakeholder_alignment
approval_probability
preference_conflict_reduction
scope_safety
```

## 6. LearningScore

Will this move teach system useful thing?

```text
LearningValue(a) =
  move_pattern_learning_value
+ unknown_context_value
+ calibration_value
+ failure_diagnostic_value
+ reusable_trace_value
```

Variables:

```text
pattern_under_test_value
low_sample_bonus
calibration_gain
failure_mode_discovery
training_trace_quality
skill_improvement_potential
move_library_coverage
contextual_bandit_exploration_bonus
```

## 7. GovernanceScore

Does move preserve safety, truth, and control?

```text
Governance(a) =
  commit_consistency
+ reversibility
+ auditability
+ permission_fit
+ truth_preservation
+ scope_isolation
```

Variables:

```text
commit_consistency
permission_fit
approval_state
auditability
reversibility
scope_isolation
data_boundary_safety
truth_ledger_integrity
destructive_action_safety
```

## 8. EleganceScore

Elegance not small variable. It is its own system.

```text
Elegance(a) =
  leverage
+ compression
+ coherence_gain
+ multi_problem_resolution
+ reuse
+ simplicity
+ future_option_quality
- new_complexity
- fragmentation
- ornamental_output
```

Variables:

```text
leverage
minimum_action_sufficiency
constraint_compression
multi_tension_resolution
artifact_reuse
conceptual_coherence
structural_coherence
process_simplicity
downstream_unlock_density
future_option_quality
low_fragmentation
low_redundancy
low_noise
```

## 9. Penalties

Separate penalties. Do not bury them.

```text
P(a) =
  λ1 · hard_constraint_violation
+ λ2 · commit_violation
+ λ3 · premature_finalization
+ λ4 · redundancy
+ λ5 · unresolved_dependency
+ λ6 · hallucination_risk
+ λ7 · user_interruption_cost
+ λ8 · tool_failure_risk
+ λ9 · preference_bleed_risk
+ λ10 · overproduction
+ λ11 · context_pollution
+ λ12 · branch_explosion
```

More penalties:

```text
schema_risk
artifact_inconsistency_risk
model_ground_truth_drift
unvalidated_visual_generation
cost_overrun
latency_penalty
privacy_boundary_violation
irreversible_action_penalty
too_many_open_loops
```

## Better formula

```text
Score(a | x, τ, u, L) =

Wp · [
  phase_fit
  + landmark_progress
  + debt_reduction
  + dependency_readiness
  + timing_quality
]

+ Wd · [
  concept_strength_gain
  + spatial_coherence_gain
  + program_fit_gain
  + site_response_gain
  + climate_response_gain
  + ground_truth_consistency_gain
  + representation_clarity_gain
]

+ Ws · [
  information_gain
  + uncertainty_reduction
  + novelty
  + diversity
  + branch_discrimination
  + pareto_improvement
]

+ We · [
  input_completeness
  + agent_fit
  + tool_readiness
  + output_verifiability
  + recovery_ease
]

+ Wu · [
  prompt_alignment
  + project_commit_alignment
  + user_preference_fit
  + approval_probability
]

+ Wl · [
  move_learning_value
  + calibration_gain
  + trace_reusability
]

+ Wg · [
  auditability
  + reversibility
  + permission_fit
  + scope_safety
]

+ Wel · [
  leverage
  + compression
  + coherence_gain
  + multi_tension_resolution
  + downstream_unlock_density
  + simplicity
]

- [
  commit_violation
  + hard_constraint_violation
  + premature_finalization
  + fragmentation
  + redundancy
  + unresolved_dependency
  + hallucination_risk
  + preference_bleed_risk
  + cost
  + latency
]
```

## But do not use one fixed score everywhere

Different phases need different weights.

### Concept phase

```text
high:
novelty
branch_diversity
tension_discovery
concept_strength
information_gain

low:
final polish
render quality
export readiness
```

### Ground truth phase

```text
high:
coherence
constraint satisfaction
model readiness
drawing consistency
validation

low:
novelty
visual atmosphere
```

### Board assembly phase

```text
high:
representation clarity
artifact completeness
visual hierarchy
commit consistency
export readiness

low:
new concept branches
major design pivots
```

So weights are phase-conditioned:

```text
w_i = w_i(phase, project_type, user_goal)
```

## Real system implementation

Do not compute all 80 variables perfectly.

Use 3 tiers.

### Tier 1: deterministic measurable

```text
artifact exists?
dependency satisfied?
phase fit?
commit violation?
branch count?
open debt count?
cost?
```

### Tier 2: heuristic computed

```text
unlock count
coverage
redundancy
novelty via embedding distance
diversity
risk estimate
```

### Tier 3: evaluator/scorer model

```text
concept strength
spatial coherence
board narrative quality
aesthetic fit
architectural elegance
```

Could be LLM/evaluator later. But not required for MVP.

## Variable object schema

```ts
type ScoreBreakdown = {
  process: Record<string, number>
  design: Record<string, number>
  search: Record<string, number>
  execution: Record<string, number>
  user: Record<string, number>
  learning: Record<string, number>
  governance: Record<string, number>
  elegance: Record<string, number>
  penalties: Record<string, number>
  total: number
}
```

UI can show this as radar/field, not text blob.

## Key idea

Affordance ranking should not say:

```text
Move has score 0.74
```

It should say:

```text
This move is strong because:
- unlocks 6 downstream actions
- resolves 2 open tensions
- creates ground-truth anchor
- reduces design debt
- matches current phase
- low preference/conflict risk
```

## Final answer

Yes, expand score. But keep structure. Use **score families**, not giant flat formula.

Best AAS scoring model:

```text
Process
Design
Search
Execution
User
Learning
Governance
Elegance
Penalties
```

This gives enough variables without chaos.

By not asking agent to “understand 80 variables.”

System handles variables through **typed feature registry + effect models + evaluators + feedback loops**.

Agent sees small distilled set. Runtime tracks full set.

## Core idea

```text
Many variables exist.
Agent does not parse all.
System computes variables.
Move patterns declare expected effects.
Evaluators measure actual effects.
Learning updates effect model.
Compiler presents few relevant tradeoffs.
```

So intelligence split:

```text
Agent = proposes/executes design tactic
System = measures state change
Compiler = ranks next moves
Evaluator = scores design effects
Curator = updates move library
```

---

# 1. Feature Registry

All score variables must become registered features.

Not random names.

```ts
Feature {
  id
  family
  description
  type
  range
  measurementMethod
  source
  confidence
}
```

Example:

```yaml
id: design.privacy_gradient
family: Design
range: 0..1
measurementMethod: evaluator + plan analysis
source:
  - plan_artifact
  - section_artifact
  - user_commit
confidence: medium
```

Feature Registry tells system:

```text
what variable means
where data comes from
how to calculate it
how reliable it is
```

No registry = score soup.

---

# 2. Move Pattern declares effects

Each move pattern says which variables it likely affects.

```yaml
id: move.section_first_ground_truth
primitive: CREATE_ARTIFACT

expectedEffects:
  design.spatial_coherence: +0.25
  design.ground_truth_consistency: +0.40
  process.downstream_unlocks: +0.60
  search.novelty: -0.05
  execution.cost: +0.30

confidence:
  design.spatial_coherence: 0.6
  design.ground_truth_consistency: 0.8
```

This is not perfect. It is prior belief.

After execution, system measures actual delta.

```text
predicted effect -> actual effect -> update model
```

---

# 3. Actual effects measured by evaluators

After a move runs:

```text
WorldState before = x
WorldState after = x'
delta = features(x') - features(x)
```

Example:

```text
Move: create section-first anchor

Measured:
spatial_coherence +0.18
ground_truth_readiness +0.52
open_tensions -1
cost +0.22
branch_diversity -0.08
```

System learns:

```text
this move helps ground truth strongly
helps coherence moderately
reduces exploration diversity
```

---

# 4. Feature computation methods

Different variables measured different ways.

### Deterministic

```text
artifact exists?
branch count?
open tension count?
commit violation?
dependency satisfied?
```

Easy.

### Graph-derived

```text
unlock count
dependency centrality
artifact lineage depth
fragmentation
redundancy
```

Use graph algorithms.

### Geometry-derived

```text
area
view orientation
solar exposure
adjacency
circulation length
section depth
openness
privacy zones
```

Use Rhino/model analysis.

### Embedding-derived

```text
novelty
similarity
redundancy
concept drift
reference alignment
```

Use vector distance.

### Evaluator-derived

```text
concept strength
board narrative
spatial coherence
architectural elegance
```

Use critic model, rubric, or human score.

---

# 5. Causal graph, not flat score

Variables affect each other.

Use causal/effect graph.

```text
section_anchor
  -> ground_truth_readiness
  -> drawing_consistency
  -> render_consistency
  -> board_coherence

branch_count
  -> diversity
  -> comparison_quality
  -> decision_complexity
```

This lets system understand second-order effects.

Move does not only affect direct variable. It propagates.

```text
create ground truth
  directly improves model readiness
  indirectly improves render QA
  indirectly improves board assembly
```

---

# 6. Sparse effects

Most moves affect few variables.

Do not evaluate all 80 variables every time.

```text
Move pattern says touched features:
- spatial_coherence
- ground_truth_readiness
- unlock_value
- cost
```

Only those get high-resolution evaluation.

Other variables get cheap background update.

This keeps system practical.

---

# 7. Local relevant variable set

For each phase, compiler selects variable subset.

Concept phase:

```text
concept strength
novelty
branch diversity
tension discovery
user alignment
```

Ground truth phase:

```text
coherence
model readiness
constraint satisfaction
drawing consistency
```

Board phase:

```text
artifact completeness
visual hierarchy
narrative clarity
label quality
export readiness
```

So agent never faces 80 variables.

It sees maybe 5–9 relevant pressures.

---

# 8. Affordance Compiler pipeline

```text
1. Read WorldState.
2. Determine phase + active object.
3. Select relevant feature subset.
4. Generate move candidates.
5. Predict feature deltas for each move.
6. Estimate uncertainty.
7. Score tradeoffs.
8. Pick top diverse moves.
9. Distill rationale for agent.
```

Pseudo:

```ts
function compileAffordances(world) {
  const phase = inferPhase(world)
  const activeFeatures = selectFeatures(phase, world)

  const candidates = instantiateMovePatterns(world)

  return candidates.map(move => {
    const predictedDelta = effectModel.predict(move, world, activeFeatures)
    const uncertainty = effectModel.uncertainty(move, world)
    const score = utility(predictedDelta, world.weights) - risk(move)

    return { move, predictedDelta, uncertainty, score }
  })
}
```

---

# 9. Effect model learns

Start with hand-authored priors.

Then update with data.

```text
predicted_delta = MovePattern prior
actual_delta = evaluator after execution
error = actual_delta - predicted_delta
update effect model
```

Can use simple Bayesian update first.

```text
new_mean = old_mean + α(actual - old_mean)
```

Later use contextual model:

```text
Effect(move, context) -> feature_delta
```

Context features:

```text
phase
project type
artifact coverage
branch count
active tensions
user preference
agent profile
```

So system learns:

```text
section-first anchor works better in climate-driven projects
plan-first anchor works better in program-heavy projects
visual probe works better before branch commit, worse after ground truth
```

---

# 10. Fine-tuning design = closed-loop control

Fine-tuning not one giant move.

It is iterative control.

```text
desired feature target
current feature state
error vector
choose move that reduces error
execute
measure
repeat
```

Example:

```text
Target:
privacy_gradient >= 0.8
view_quality >= 0.7
spatial_coherence >= 0.75

Current:
privacy 0.45
view 0.82
coherence 0.52

System chooses:
increase privacy without killing view
```

Candidate moves:

```text
add screened threshold
rotate private volume
carve view slot
add courtyard wall
```

Score by projected error reduction.

Formula:

```text
error = target - current
move_score = -|| target - predicted_after ||
```

This is real fine-tuning.

---

# 11. Design variables need artifact hooks

Variable useless if no artifact can affect it.

For each feature define:

```yaml
feature: design.privacy_gradient
affectedBy:
  - plan
  - section
  - massing_model
  - facade_screen
  - render
measuredFrom:
  - plan_zoning
  - view_cones
  - openings
  - circulation
movePatterns:
  - add_threshold
  - rotate_volume
  - thicken_boundary
  - carve_aperture
```

This links variable → moves.

Now compiler knows which move can adjust what.

---

# 12. Agent presentation

Agent receives not full matrix.

Agent gets:

```text
Current design pressure:
privacy low, view strong, coherence medium.

Recommended move:
Refine section with screened threshold.

Why:
raises privacy with low view penalty;
also supports committed desert courtyard concept;
unlocks render consistency check.
```

Agent works creatively inside bounded target.

---

# 13. Design sensitivity matrix

Internally maintain matrix:

```text
M[move_pattern][feature] = expected effect
```

Example:

| Move               | Privacy |  View | Coherence |  Cost |
| ------------------ | ------: | ----: | --------: | ----: |
| add courtyard wall |   +0.30 | -0.10 |     +0.15 | +0.20 |
| rotate volume      |   +0.15 | +0.20 |     +0.05 | +0.10 |
| bury private zone  |   +0.40 | -0.05 |     +0.25 | +0.35 |

Compiler uses matrix.

After each result, update matrix.

This is how system knows “which moves affect which variables.”

---

# 14. Elegance as compression

Fine-tuning can become whack-a-mole.

Elegance avoids that.

Elegant move improves multiple targets with low side effects.

```text
Elegance = positive coupled gains - negative side effects - complexity added
```

Example:

```text
Add courtyard wall:
privacy +, thermal +, spatial identity +, view slight -
high elegance

Add random screen:
privacy +, concept coherence -, visual noise +
low elegance
```

System chooses move with better coupled gains.

---

# 15. Need evaluator contracts

Each artifact type has evaluator.

```text
PlanEvaluator
SectionEvaluator
ModelEvaluator
RenderEvaluator
BoardEvaluator
ConceptEvaluator
```

Each evaluator outputs features.

```ts
EvaluationResult {
  artifactId
  featureScores
  evidence
  confidence
  critique
}
```

So design quality becomes machine-readable enough.

---

# 16. Practical build order

Do not build 80-feature monster first.

Build this order:

```text
1. Define 12 core features.
2. Define 20 move patterns.
3. Create sensitivity matrix manually.
4. Build evaluators for 3 artifact types.
5. Log predicted vs actual deltas.
6. Update matrix from outcomes.
7. Expand features gradually.
```

Initial core features:

```text
goal_alignment
concept_strength
spatial_coherence
artifact_completeness
ground_truth_readiness
drawing_consistency
tension_reduction
branch_diversity
user_alignment
cost
risk
elegance
```

Enough.

---

# 17. Final answer

System parses many variables by making them **registered features**.

System knows move effects through:

```text
move pattern effect priors
sensitivity matrix
artifact evaluators
before/after deltas
contextual outcome learning
causal graph propagation
```

System fine-tunes designs through:

```text
target feature vector
current feature vector
error vector
candidate move prediction
execute
measure
update
repeat
```

Agent does not juggle variables.
Agent receives distilled design pressure and recommended moves.

Best phrase:

```text
The agent creates.
The system measures.
The compiler steers.
The evaluator teaches.
```

That is how many variables become usable, not chaos.
