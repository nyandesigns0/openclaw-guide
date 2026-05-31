# Chapter 3.3 - A.A.S. Agent Simulation Flowchart

## 3.3.0 Overview

This chapter maps a detailed A.A.S. simulation for how an agent would research, reason, curate, validate, and prepare a Pivot Door Sketch Contest 2026 concept and final presentation board.

### 3.3.1 Simulation Scope

**Scenario:** The operator asks A.A.S. to simulate how an agent would design for the FritsJurgens Pivot Door Sketch Contest 2026 and produce a final concept plus final presentation board. \
**A.A.S. Role:** A.A.S. owns the project truth, WorldState, ontology, affordances, moves, branches, tensions, evaluations, artifacts, approvals, and commitments. \
**Hermes Role:** Hermes receives scoped task packets from A.A.S. and executes bounded research, concept, model, representation, critique, and QA tasks through assigned profiles. \
**Contest Source Context:** The simulation uses the 2026 contest page and brief at `https://sketch.fritsjurgens.com/` and `https://sketch.fritsjurgens.com/FritsJurgens_Pivot_Door_Sketch_Contest_2026_Brief.pdf`. \
**Product Source Context:** The simulation uses FritsJurgens System M+, System Fx, and System One product pages as product-reality references for movement, hold positions, free swing, load range, visible components, floor plate, ceiling plate, top pivot, and bottom pivot logic. \
**Contest Requirements Captured:** The design must be an original pivot door sketch, must incorporate a FritsJurgens pivot system, must make the system clearly visible in the drawing, must be precise enough to be possible to produce, must include a sketch name, must include a detailed concept note, must be submitted as JPEG, PNG, or PDF, and must be judged within student or professional category. \
**Contest Dates Captured:** Entries opened on May 4, 2026, entries close on August 20, 2026, shortlist reveal is planned for mid September 2026, winners are planned for the first week of October 2026, and publication or feature is planned for January 2027. \
**Judging Signals Captured:** The official judging language emphasizes creativity, practicality, aesthetics, and innovation, so A.A.S. treats these as hard rubric families rather than generic inspiration.

### 3.3.2 Agent Operating Contract

**No Chat-Only Truth:** Chat can explain the run, but contest facts, product facts, decisions, artifacts, approvals, and final commitments must be registered in backend records. \
**No Unverified Brief Drift:** Contest requirements must be stored as Object and Boundary nodes with source references before they are used as rubric constraints. \
**No Generic Door Output:** Any branch that treats the pivot hinge as a normal hinge, hides the FritsJurgens system without explanation, or only decorates a conventional slab receives a generic-door penalty. \
**No Pure Fantasy Output:** Any branch that cannot explain weight, swing path, pivot offset, user interaction, material build-up, system choice, and visible pivot logic receives a feasibility penalty. \
**Human Steering Preserved:** The operator can approve, reject, override, annotate, or reopen branch choices, commit decisions, board direction, and final output readiness. \
**Submission Simulation Boundary:** A.A.S. can produce a submission-ready concept packet and board plan in this simulation, but final legal eligibility, account submission, and official terms acceptance remain operator responsibilities.

### 3.3.3 Comprehensive A.A.S. Flowchart

```mermaid
%%{init: {'flowchart': {'arrowMarkerSize': 1.5}}}%%
flowchart TD

%% =========================================================
%% AAS AGENT SIMULATION — PIVOT DOOR SKETCH CONTEST 2026
%% =========================================================

A0([USER GOAL: win / strongly place in FritsJurgens Pivot Door Sketch Contest 2026])
A1[Chat Workspace receives prompt]
A2[Backend Command: create_project_goal]
A3[GoalState normalized]
A4[Project created: Pivot Door Sketch Contest 2026]
A5[Session created: concept-to-board run]
A6[WorldState initialized]
A7[Runtime event: aas.world.created]
A8[Architect Mode opens direction field]

A0 --> A1 --> A2 --> A3 --> A4 --> A5 --> A6 --> A7 --> A8

%% =========================================================
%% SOURCE OF TRUTH
%% =========================================================

subgraph SOT[BACKEND SOURCE OF TRUTH]
S1[(Product Graph)]
S2[(Runtime Event Log)]
S3[(Artifact Registry)]
S4[(Commitment Ledger)]
S5[(Preference Store)]
S6[(Hermes Bindings)]
S7[(WorldState Snapshots)]
end

A6 --> S1
A6 --> S2
A6 --> S3
A6 --> S4
A6 --> S5
A6 --> S6
A6 --> S7

%% =========================================================
%% GOAL DECODE
%% =========================================================

subgraph GI[GOAL INTAKE / BRIEF DECODE]
GI1[Parse user intent]
GI2[Extract desired output: final concept + final presentation board]
GI3[Extract success target: contest-grade concept, not generic door]
GI4[Extract hidden constraints: sketch-first, FJ system visible, feasible, beautiful]
GI5[Extract deliverables: sketch set, concept note, product logic, board]
GI6[Detect unknowns: category, user style, submission format, board size]
GI7{Blocking unknown?}
GI8[Ask user only if needed]
GI9[Proceed with default simulation assumptions]
end

A8 --> GI1 --> GI2 --> GI3 --> GI4 --> GI5 --> GI6 --> GI7
GI7 -- yes --> GI8 --> GI9
GI7 -- no --> GI9

%% =========================================================
%% ONTOLOGY CREATION
%% =========================================================

subgraph ONT[ARCHITECT MODE ONTOLOGY: OBJECT + SUBJECT -> VECTOR + BOUNDARY -> SEED]
O0[Create Object nodes]
S0[Create Subject nodes]
V0[Derive Vector nodes]
B0[Derive Boundary nodes]
SE0[Generate Seed branch space]

O1[Object: contest brief]
O2[Object: FritsJurgens product systems]
O3[Object: pivot door mechanics]
O4[Object: submission deadline]
O5[Object: required visible pivot system]
O6[Object: judging criteria]
O7[Object: board deliverables]
O8[Object: precedent database]
O9[Object: material + fabrication facts]

SUB1[Subject: jury desire for novelty]
SUB2[Subject: brand taste: precision, movement, hidden engineering]
SUB3[Subject: user ambition: win / stand out]
SUB4[Subject: emotional target: first impression to final detail]
SUB5[Subject: sketch artistry]
SUB6[Subject: memorable story]

V1[Vector: make movement central]
V2[Vector: turn pivot into spatial experience]
V3[Vector: show product intelligently]
V4[Vector: balance poetic idea + feasibility]
V5[Vector: high sketch clarity]
V6[Vector: distinct use case]
V7[Vector: strong board narrative]

B1[Boundary: use FritsJurgens system]
B2[Boundary: system must be visible / explained]
B3[Boundary: concept must be buildable]
B4[Boundary: submit before deadline]
B5[Boundary: avoid pure AI fantasy]
B6[Boundary: readable concept note]
B7[Boundary: board must prove design, not decorate]
B8[Boundary: no uncommitted claims as truth]
end

GI9 --> O0
GI9 --> S0
O0 --> O1 & O2 & O3 & O4 & O5 & O6 & O7 & O8 & O9
S0 --> SUB1 & SUB2 & SUB3 & SUB4 & SUB5 & SUB6
O1 --> V0
O2 --> V0
O3 --> V0
SUB1 --> V0
SUB2 --> V0
SUB3 --> V0
SUB4 --> V0
V0 --> V1 & V2 & V3 & V4 & V5 & V6 & V7
O1 --> B0
O2 --> B0
O4 --> B0
O5 --> B0
O6 --> B0
B0 --> B1 & B2 & B3 & B4 & B5 & B6 & B7 & B8
V0 --> SE0
B0 --> SE0

%% =========================================================
%% WORLDSTATE BUILD
%% =========================================================

subgraph WS[WORLDSTATE COMPILER]
WS1[Compile direction graph]
WS2[Compile GoalState]
WS3[Compile IntentState: research phase]
WS4[Compile ProjectState: brief rough / research partial / concept none]
WS5[Compile active constraints]
WS6[Compile open questions]
WS7[Compile artifact gaps]
WS8[Compile risks]
WS9[Compile available move request]
end

SE0 --> WS1 --> WS2 --> WS3 --> WS4 --> WS5 --> WS6 --> WS7 --> WS8 --> WS9
WS9 --> S7

%% =========================================================
%% AFFORDANCE COMPILER
%% =========================================================

subgraph AC[AFFORDANCE COMPILER: GENERATE LEGAL MOVES]
AC1[Read WorldState]
AC2[Match move patterns]
AC3[Generate candidate moves]
AC4[Filter illegal / premature moves]
AC5[Score with IntentGradient]
AC6[Diversify top moves]
AC7[Expose 3-7 useful moves]
AC8[Create blocked moves with reasons]

M1[Move: research official brief]
M2[Move: research FJ systems]
M3[Move: research winners / brand taste]
M4[Move: create evaluation rubric]
M5[Move: spawn concept branches]
M6[Move: ask user category/style]
M7[Move: create board strategy]
end

WS9 --> AC1 --> AC2 --> AC3 --> AC4 --> AC5 --> AC6 --> AC7
AC4 --> AC8
AC7 --> M1 & M2 & M3 & M4 & M5 & M6 & M7

%% =========================================================
%% SUPERVISOR GATE 1
%% =========================================================

subgraph SG1[SUPERVISOR GATE: BEFORE EXECUTION]
SG1A[Check move legality]
SG1B[Check cost/risk]
SG1C[Check approval need]
SG1D[Check locked commits]
SG1E{Safe to execute?}
SG1F[Return blocked reason]
SG1G[Approve execution]
end

AC7 --> SG1A --> SG1B --> SG1C --> SG1D --> SG1E
SG1E -- no --> SG1F --> AC8
SG1E -- yes --> SG1G

%% =========================================================
%% CONTEXT DISTILLER / AGENT BRIEF
%% =========================================================

subgraph CD[CONTEXT DISTILLER]
CD1[Select relevant nodes]
CD2[Select relevant constraints]
CD3[Select relevant artifacts]
CD4[Select source manifest]
CD5[Select valid moves]
CD6[Include warnings]
CD7[Create Agent Brief]
CD8[Assign profiles]
end

SG1G --> CD1 --> CD2 --> CD3 --> CD4 --> CD5 --> CD6 --> CD7 --> CD8

%% =========================================================
%% HERMES TASK PACKETS
%% =========================================================

subgraph HERMES[AAS-HERMES BRIDGE / EXECUTION FABRIC]
HB1[MoveCompiler converts move to task group]
HB2[Create Kanban tasks]
HB3[Assign Research Agent]
HB4[Assign Concept Agent]
HB5[Assign Critic/Evaluator]
HB6[Assign Model Agent]
HB7[Assign Representation Agent]
HB8[Assign Supervisor]
HB9[Write output contracts]
HB10[Watch logs + artifacts]
end

CD8 --> HB1 --> HB2
HB2 --> HB3 & HB4 & HB5 & HB6 & HB7 & HB8
HB1 --> HB9 --> HB10

%% =========================================================
%% RESEARCH LANES
%% =========================================================

subgraph R[RESEARCH PHASE]
R0[Research Agent starts]
R1[Read contest page / brief]
R2[Extract hard requirements]
R3[Extract judging criteria]
R4[Extract dates / category / prize / format]
R5[Research FritsJurgens System M+]
R6[Research FritsJurgens System Fx]
R7[Research FritsJurgens System One]
R8[Research FJ brand language]
R9[Research Best Pivot Door winners]
R10[Research architectural pivot precedents]
R11[Research door use cases: entrance / interior / specialty]
R12[Research material systems: timber / glass / metal / stone / fabric / screen]
R13[Research movement typologies]
R14[Register research artifacts]
R15[Emit research summary]
end

HB3 --> R0
R0 --> R1 --> R2 --> R3 --> R4
R0 --> R5 --> R6 --> R7
R0 --> R8 --> R9
R0 --> R10 --> R11 --> R12 --> R13
R2 --> R14
R3 --> R14
R4 --> R14
R5 --> R14
R6 --> R14
R7 --> R14
R8 --> R14
R9 --> R14
R10 --> R14
R11 --> R14
R12 --> R14
R13 --> R14 --> R15

%% =========================================================
%% RESEARCH OUTPUTS INTO WORLDSTATE
%% =========================================================

subgraph RD[RESEARCH DATA PATCH]
RD1[AgentPatch: add Object nodes]
RD2[AgentPatch: add Boundary nodes]
RD3[AgentPatch: add Reference artifacts]
RD4[AgentPatch: add Product System matrix]
RD5[AgentPatch: add judging rubric]
RD6[Backend validates expected versions]
RD7[Write records + events]
RD8[Recompute WorldState]
end

R15 --> RD1 & RD2 & RD3 & RD4 & RD5
RD1 --> RD6
RD2 --> RD6
RD3 --> RD6
RD4 --> RD6
RD5 --> RD6
RD6 --> RD7 --> RD8 --> S1
RD7 --> S2
RD7 --> S3
RD8 --> S7

%% =========================================================
%% PRODUCT SYSTEM DECISION
%% =========================================================

subgraph PM[PRODUCT MECHANISM MATRIX]
PM1[Compare systems]
PM2{Door needs controlled heavy movement?}
PM3[Use System M+]
PM4{Door needs fixed positions / spatial partition?}
PM5[Use System Fx]
PM6{Door needs pure free-swing minimal pivot?}
PM7[Use System One]
PM8[Create system-use constraint]
PM9[Create product explanation note]
end

RD8 --> PM1 --> PM2
PM2 -- yes --> PM3 --> PM8
PM2 -- no --> PM4
PM4 -- yes --> PM5 --> PM8
PM4 -- no --> PM6
PM6 -- yes --> PM7 --> PM8
PM6 -- no --> PM1
PM8 --> PM9

%% =========================================================
%% RUBRIC BUILD
%% =========================================================

subgraph RUB[CONTEST EVALUATION RUBRIC]
RU1[Create scoring model]
RU2[Creativity score]
RU3[Practicality score]
RU4[Aesthetics score]
RU5[Innovation score]
RU6[FJ system integration score]
RU7[Movement experience score]
RU8[Sketch communication score]
RU9[Concept note clarity score]
RU10[Board narrative score]
RU11[Feasibility risk penalty]
RU12[Generic-door penalty]
RU13[AI-looking-work penalty]
RU14[Weighted rubric stored]
end

RD5 --> RU1
RU1 --> RU2 & RU3 & RU4 & RU5 & RU6 & RU7 & RU8 & RU9 & RU10 & RU11 & RU12 & RU13
RU2 --> RU14
RU3 --> RU14
RU4 --> RU14
RU5 --> RU14
RU6 --> RU14
RU7 --> RU14
RU8 --> RU14
RU9 --> RU14
RU10 --> RU14
RU11 --> RU14
RU12 --> RU14
RU13 --> RU14
RU14 --> S1

%% =========================================================
%% CONCEPT BRANCH SPAWN
%% =========================================================

subgraph CB[CONCEPT AGENT: SEED BRANCH GENERATION]
CB0[Context: Object + Subject + Vector + Boundary + Rubric]
CB1[Generate wide branch pool]
CB2[Branch A: Threshold Weather Instrument]
CB3[Branch B: Rotating Room / Door as Furniture]
CB4[Branch C: Public Ritual Gate]
CB5[Branch D: Light Clock Pivot]
CB6[Branch E: Acoustic Privacy Wing]
CB7[Branch F: Archive / Display Door]
CB8[Branch G: Climate Screen / Breathing Wall]
CB9[Attach product hypothesis to each branch]
CB10[Attach materials]
CB11[Attach use case]
CB12[Attach sketch composition idea]
CB13[Attach risks]
CB14[Register Seed nodes]
CB15[Runtime event: branches spawned]
end

RU14 --> CB0
PM9 --> CB0
CB0 --> CB1
CB1 --> CB2 & CB3 & CB4 & CB5 & CB6 & CB7 & CB8
CB2 --> CB9
CB3 --> CB9
CB4 --> CB9
CB5 --> CB9
CB6 --> CB9
CB7 --> CB9
CB8 --> CB9
CB9 --> CB10 --> CB11 --> CB12 --> CB13 --> CB14 --> CB15
CB15 --> S1
CB15 --> S2

%% =========================================================
%% BRANCH ENRICHMENT
%% =========================================================

subgraph BE[BRANCH ENRICHMENT LOOP]
BE1[For each branch: define story]
BE2[Define spatial context]
BE3[Define door movement sequence]
BE4[Define open/closed state]
BE5[Define hinge visibility]
BE6[Define product choice]
BE7[Define material build-up]
BE8[Define human interaction]
BE9[Define sketch views needed]
BE10[Define board narrative]
BE11[Define feasibility assumptions]
BE12[Create branch brief artifact]
end

CB14 --> BE1 --> BE2 --> BE3 --> BE4 --> BE5 --> BE6 --> BE7 --> BE8 --> BE9 --> BE10 --> BE11 --> BE12
BE12 --> S3

%% =========================================================
%% TENSION ENGINE
%% =========================================================

subgraph TE[TENSION ENGINE]
TE1[Scan branch contradictions]
TE2[Detect tension: novelty vs buildability]
TE3[Detect tension: hidden hinge vs visible system requirement]
TE4[Detect tension: sketch beauty vs technical clarity]
TE5[Detect tension: poetic story vs product explanation]
TE6[Detect tension: door as object vs door as architecture]
TE7[Detect tension: movement drama vs practical use]
TE8[Create tension records]
TE9[Link tensions to branches]
TE10[Generate resolution affordances]
end

BE12 --> TE1
TE1 --> TE2 & TE3 & TE4 & TE5 & TE6 & TE7
TE2 --> TE8
TE3 --> TE8
TE4 --> TE8
TE5 --> TE8
TE6 --> TE8
TE7 --> TE8
TE8 --> TE9 --> TE10
TE8 --> S1
TE8 --> S2

%% =========================================================
%% CRITIC / EVALUATOR PASS 1
%% =========================================================

subgraph EV1[CRITIC + EVALUATOR PASS 1]
EV1A[Read branch briefs]
EV1B[Score each branch against rubric]
EV1C[Check system integration]
EV1D[Check feasibility]
EV1E[Check originality]
EV1F[Check sketchability]
EV1G[Check board potential]
EV1H[Check emotional hook]
EV1I[Apply penalties]
EV1J[Write evaluation artifact]
EV1K[Recommend kill / refine / keep]
end

TE10 --> EV1A
EV1A --> EV1B --> EV1C --> EV1D --> EV1E --> EV1F --> EV1G --> EV1H --> EV1I --> EV1J --> EV1K
EV1J --> S3
EV1K --> S1

%% =========================================================
%% BRANCH CURATION
%% =========================================================

subgraph CUR[CURATE TOP BRANCHES]
CUR1[Sort by total score]
CUR2[Preserve diversity]
CUR3[Reject generic concepts]
CUR4[Reject unbuildable concepts]
CUR5[Keep top 3]
CUR6[Archive weak branches as history]
CUR7[Create top-3 comparison]
CUR8[Ask user approval if needed]
CUR9{User wants override?}
CUR10[Apply override]
CUR11[Proceed with top 3]
end

EV1K --> CUR1 --> CUR2 --> CUR3 --> CUR4 --> CUR5
CUR5 --> CUR7 --> CUR8 --> CUR9
CUR9 -- yes --> CUR10 --> CUR11
CUR9 -- no --> CUR11
CUR3 --> CUR6
CUR4 --> CUR6
CUR6 --> S1
CUR7 --> S3

%% =========================================================
%% TOP 3 DEVELOPMENT
%% =========================================================

subgraph DEV3[DEVELOP TOP 3]
D31[Develop Branch 1: narrative + use case]
D32[Develop Branch 1: system detail]
D33[Develop Branch 1: sketch package]
D34[Develop Branch 1: board thumbnail]

D41[Develop Branch 2: narrative + use case]
D42[Develop Branch 2: system detail]
D43[Develop Branch 2: sketch package]
D44[Develop Branch 2: board thumbnail]

D51[Develop Branch 3: narrative + use case]
D52[Develop Branch 3: system detail]
D53[Develop Branch 3: sketch package]
D54[Develop Branch 3: board thumbnail]

D60[Register developed branch artifacts]
end

CUR11 --> D31 --> D32 --> D33 --> D34 --> D60
CUR11 --> D41 --> D42 --> D43 --> D44 --> D60
CUR11 --> D51 --> D52 --> D53 --> D54 --> D60
D60 --> S3

%% =========================================================
%% MODEL / FEASIBILITY CHECK
%% =========================================================

subgraph MOD[MODEL MODE / FEASIBILITY CHECK]
MO1[Model Agent receives top 3]
MO2[Create simplified pivot geometry]
MO3[Check pivot offset]
MO4[Check swing path]
MO5[Check collision envelope]
MO6[Check door weight/material plausibility]
MO7[Check FJ system fit]
MO8[Check open/closed drawings]
MO9[Create diagrams: plan / elevation / sequence]
MO10[Register model-derived artifacts]
MO11[Flag invalid branch details]
end

D60 --> MO1
MO1 --> MO2 --> MO3 --> MO4 --> MO5 --> MO6 --> MO7 --> MO8 --> MO9 --> MO10
MO7 --> MO11
MO11 --> TE8
MO10 --> S3

%% =========================================================
%% CRITIC / EVALUATOR PASS 2
%% =========================================================

subgraph EV2[CRITIC + EVALUATOR PASS 2]
EV2A[Compare top 3 after feasibility]
EV2B[Score narrative clarity]
EV2C[Score movement originality]
EV2D[Score FJ integration]
EV2E[Score material intelligence]
EV2F[Score presentation potential]
EV2G[Score risk]
EV2H[Identify strongest concept]
EV2I[Write final comparison memo]
EV2J[Generate commit affordance]
end

MO10 --> EV2A --> EV2B --> EV2C --> EV2D --> EV2E --> EV2F --> EV2G --> EV2H --> EV2I --> EV2J
EV2I --> S3

%% =========================================================
%% COMMIT WINNING CONCEPT
%% =========================================================

subgraph COM[COMMITMENT LEDGER]
CO1[Supervisor checks critical tensions]
CO2{Critical unresolved tension?}
CO3[Return to resolution moves]
CO4[Prepare commit proposal]
CO5[Commit decision: selected concept]
CO6[Commit rationale]
CO7[Commit product system]
CO8[Commit material direction]
CO9[Commit board deliverables]
CO10[User approval]
CO11{Approved?}
CO12[Commit becomes project truth]
CO13[Rejected: return to branch compare]
end

EV2J --> CO1 --> CO2
CO2 -- yes --> CO3 --> TE10
CO2 -- no --> CO4 --> CO5 --> CO6 --> CO7 --> CO8 --> CO9 --> CO10 --> CO11
CO11 -- yes --> CO12 --> S4
CO11 -- no --> CO13 --> CUR7

%% =========================================================
%% WINNING CONCEPT PACKAGE
%% =========================================================

subgraph WCP[WINNING CONCEPT PRODUCTION PLAN]
W1[Generate final concept title]
W2[Generate one-sentence thesis]
W3[Generate 150-250 word concept note]
W4[Define inspiration]
W5[Define selected FJ system + why]
W6[Define materials]
W7[Define use context]
W8[Define movement sequence]
W9[Define construction logic]
W10[Define submission checklist]
W11[Create final concept packet]
end

CO12 --> W1 --> W2 --> W3 --> W4 --> W5 --> W6 --> W7 --> W8 --> W9 --> W10 --> W11
W11 --> S3

%% =========================================================
%% DRAW MODE BOARD PRODUCTION
%% =========================================================

subgraph DRAW[DRAW MODE: FINAL PRESENTATION BOARD]
DR0[Representation Agent enters Draw Mode]
DR1[Create board strategy]
DR2[Select board format]
DR3[Define visual hierarchy]
DR4[Hero sketch: door in architectural context]
DR5[Detail sketch: pivot system visible]
DR6[Plan diagram: swing path + pivot point]
DR7[Sequence diagram: closed / half-open / open]
DR8[Material diagram: layers + texture]
DR9[Use case vignette]
DR10[Concept note placement]
DR11[Product-system callout]
DR12[Annotations]
DR13[Margins / title / metadata]
DR14[Assemble board]
DR15[Register board draft]
end

W11 --> DR0 --> DR1 --> DR2 --> DR3
DR3 --> DR4 & DR5 & DR6 & DR7 & DR8 & DR9 & DR10 & DR11 & DR12 & DR13
DR4 --> DR14
DR5 --> DR14
DR6 --> DR14
DR7 --> DR14
DR8 --> DR14
DR9 --> DR14
DR10 --> DR14
DR11 --> DR14
DR12 --> DR14
DR13 --> DR14 --> DR15
DR15 --> S3

%% =========================================================
%% SKETCH ART DIRECTION
%% =========================================================

subgraph SK[SKETCH LANGUAGE CONTROL]
SK1[Check hand-sketch character]
SK2[Check line weight hierarchy]
SK3[Check perspective clarity]
SK4[Check technical readability]
SK5[Check no generic render look]
SK6[Check hinge/product shown]
SK7[Check human scale]
SK8[Check material tactility]
SK9[Check movement arrows]
SK10[Check annotations]
SK11[Update sketch art direction]
end

DR15 --> SK1 --> SK2 --> SK3 --> SK4 --> SK5 --> SK6 --> SK7 --> SK8 --> SK9 --> SK10 --> SK11
SK11 --> DR14

%% =========================================================
%% FINAL QA
%% =========================================================

subgraph QA[FINAL QA / VALIDATION GATES]
QA1[Supervisor starts final QA]
QA2[Check contest requirement coverage]
QA3[Check selected FJ system is named]
QA4[Check pivot system visible]
QA5[Check concept note answers inspiration]
QA6[Check concept note answers materials]
QA7[Check concept note answers use case]
QA8[Check feasibility proof exists]
QA9[Check board readability at thumbnail]
QA10[Check originality / generic penalty]
QA11[Check spelling / labels / dates]
QA12[Check file format assumptions]
QA13[Check no critical unresolved tensions]
QA14[Check artifact lineage]
QA15{Pass?}
QA16[Create fix affordances]
QA17[Approve final board]
end

DR15 --> QA1 --> QA2 --> QA3 --> QA4 --> QA5 --> QA6 --> QA7 --> QA8 --> QA9 --> QA10 --> QA11 --> QA12 --> QA13 --> QA14 --> QA15
QA15 -- no --> QA16 --> AC7
QA15 -- yes --> QA17

%% =========================================================
%% EXPORT / DELIVERY
%% =========================================================

subgraph EXP[EXPORT / DELIVERY]
EX1[Create final board export]
EX2[Create final concept note export]
EX3[Create source package]
EX4[Create submission checklist]
EX5[Create final WorldState snapshot]
EX6[Runtime event: aas.artifact.created]
EX7[Runtime event: aas.commit.created]
EX8[Runtime event: aas.delivery.ready]
EX9([FINAL OUTPUT: submission-ready concept + presentation board])
end

QA17 --> EX1 --> EX2 --> EX3 --> EX4 --> EX5 --> EX6 --> EX7 --> EX8 --> EX9
EX1 --> S3
EX2 --> S3
EX3 --> S3
EX5 --> S7
EX7 --> S4

%% =========================================================
%% LIVE UI FEEDBACK LOOPS
%% =========================================================

subgraph UI[FOUR WORKSPACE VISIBILITY]
UI1[Chat shows reasoning, questions, approvals]
UI2[Architect shows nodes, branches, tensions, commits]
UI3[Model shows pivot geometry, swing path, feasibility]
UI4[Draw shows board, sketches, annotations]
UI5[Inspector shows raw scores, links, artifacts, JSON]
UI6[Event stream shows move status]
end

S2 --> UI1
S1 --> UI2
S3 --> UI3
S3 --> UI4
S1 --> UI5
S2 --> UI6
UI1 --> A1
UI2 --> A8
UI3 --> MOD
UI4 --> DRAW

%% =========================================================
%% LEARNING LOOP
%% =========================================================

subgraph LL[LEARNING / PATTERN STATS]
LL1[Compare predicted move effect vs evaluator result]
LL2[Update move pattern stats]
LL3[Update sensitivity matrix]
LL4[Record branch failures]
LL5[Record successful concept signals]
LL6[Improve future affordance ranking]
LL7[No model weights treated as project truth]
end

EV1J --> LL1
EV2I --> LL1
QA17 --> LL1
LL1 --> LL2 --> LL3 --> LL4 --> LL5 --> LL6 --> LL7
LL6 --> AC5

%% =========================================================
%% RECOVERY LOOPS
%% =========================================================

subgraph REC[FAILURE / RECOVERY]
RE1{Research missing?}
RE2[Create research retry move]
RE3{Branch weak?}
RE4[Spawn new branch]
RE5{Model invalid?}
RE6[Refine geometry / material / system choice]
RE7{Board unclear?}
RE8[Recompose board hierarchy]
RE9{User rejects commit?}
RE10[Return to top-3 compare]
end

R15 --> RE1
RE1 -- yes --> RE2 --> HB3
EV1K --> RE3
RE3 -- yes --> RE4 --> CB1
MO11 --> RE5
RE5 -- yes --> RE6 --> DEV3
QA15 --> RE7
RE7 -- yes --> RE8 --> DRAW
CO11 --> RE9
RE9 -- yes --> RE10 --> CUR7

%% =========================================================
%% END
%% =========================================================

EX9 --> END([AAS STATE: delivered artifact package, committed concept, traceable decision history])
END --> S7

    style A0 fill:#7f1d1d,stroke:#fecaca,color:#ffffff,stroke-width:4px
    linkStyle 0,1,2,3,4,5,6,7 stroke:#818cf8,stroke-width:4px
    linkStyle 8,9,10,11,12,13,14,15,16 stroke:#818cf8,stroke-width:2px
```

### 3.3.4 Data Interpretation Notes

**Object Data:** Contest facts, product specifications, dates, formats, judging language, and mechanical realities enter A.A.S. as Object nodes because they are external facts the design must acknowledge. \
**Subject Data:** Jury desire, brand atmosphere, operator ambition, sketch character, and emotional target enter A.A.S. as Subject nodes because they describe human judgment and experience. \
**Vector Data:** Movement, visibility, spatial impact, technical clarity, and board readability become Vector nodes because they push the design toward a particular kind of outcome. \
**Boundary Data:** Contest rules, visible-system requirement, production plausibility, format assumptions, and anti-generic constraints become Boundary nodes because they contain the design field. \
**Seed Data:** Concept branches become Seed nodes only after Object, Subject, Vector, and Boundary pressure has shaped the search space.

### 3.3.5 Final Board Output Logic

**Concept Packet:** A.A.S. treats the title, thesis, concept note, inspiration, location, purpose, system selection, material logic, movement sequence, and required sketch views as structured output before board assembly begins. \
**Board Package:** Draw Mode assembles hero sketch, pivot detail, plan swing diagram, movement sequence, material build-up, human-scale vignette, concept note, product callout, annotations, margins, title, and metadata into a deterministic board package. \
**Validation:** Final QA blocks delivery unless contest requirements, visible FritsJurgens integration, feasibility proof, concept note content, board readability, file-format assumptions, and artifact lineage are all satisfied. \
**Traceability:** The delivered package remains linked to research sources, branch records, evaluator scores, model checks, user approvals, and final commitments so the final design can be explained instead of merely displayed.
