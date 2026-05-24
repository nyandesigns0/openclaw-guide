# Chapter 3.1 - Introduction

## 3.1.0 Overview

A.A.S. is an Affordance-Oriented Agent Environment for architectural design. It is built as a Field Runtime above Hermes Agent: A.A.S. owns design intelligence and project truth, while Hermes provides durable multi-agent execution through profiles, Kanban tasks, workers, memory, skills, dispatcher, and logs.

### 3.1.1 What A.A.S. Is

**Architectural Agent Environment:** A.A.S. turns goals, values, references, critique, model state, feature state, and artifacts into a navigable design field. \
**Built on Hermes:** Hermes executes work through profile-based specialist agents and Kanban task groups. A.A.S. compiles architectural moves into Hermes task packets and watches execution state. \
**Field Runtime:** The runtime reads WorldState, generates affordances, scores expected effects, distills context, lets agents select moves, compiles moves into Hermes work, and updates the world. A.A.S. estimates useful moves under uncertainty rather than calculating fixed game moves from a static world. \
**Design Intelligence Layer:** A.A.S. combines five-node design ontology, objective functions, tension detection, move pattern library, branch search, evaluator scoring, process grammar, design debt, and commit rules. \
**Five-Node Ontology:** Architect Mode uses Object, Subject, Vector, Boundary, and Seed as fixed primary node types. Object is objective outside truth. Subject is subjective inside truth. Vector is pushing force. Boundary is restricting force. Seed is generated possibility. \
**Human-Steerable:** The operator reviews moves, feature pressures, branches, tensions, artifacts, commits, preferences, approvals, and Hermes task state at the level of architectural intent. \
**Local-First Product:** Project data, artifacts, WorldState snapshots, event history, profile bindings, and task bindings can run locally first, with clear upgrade paths for hosted or multi-user deployments.

### 3.1.2 Core Workflow

**Goal Intake:** The user enters a design goal, values, references, and constraints. The backend normalizes this into GoalState and initializes Object and Subject truth inside WorldState. \
**Ontology Derivation:** A.A.S. derives Vector and Boundary forces from Object and Subject inputs, then uses those forces to narrow generated Seed possibilities. \
**Feature Extraction:** The runtime extracts phase, active tensions, artifact gaps, branch health, preference context, feature state, process landmarks, design debt, and trajectory history. \
**Move Generation:** The AffordanceCompiler selects matching move patterns, instantiates candidate moves, filters illegal moves, predicts feature deltas, scores tradeoffs, and exposes a diverse top set. \
**Hermes Execution:** The MoveCompiler turns the selected move into a Hermes Kanban task group with assigned profiles, dependencies, task packet, output contract, and artifact write paths. \
**Branch Development:** Concept branches compete as design hypotheses. Agents develop, critique, compare, merge, kill, or commit them based on evidence, feature scores, and user values. \
**Tension Resolution:** The system tracks contradictions such as privacy versus openness, budget versus form, preference conflicts, or render ambition versus model truth. Critical unresolved tensions can block finalization. \
**Ground Truth and Representation:** Model, plan, section, massing, render, diagram, and board artifacts are generated through typed moves, evaluated, and validated against commits and constraints. \
**Learning Loop:** Predicted move effects are compared with evaluator-measured deltas. Move pattern stats, sensitivity matrices, and contextual rewards improve without treating model weights as having changed.

### 3.1.3 Primary Workspaces

**Chat:** The conversation workspace for explanations, clarifying questions, steering, feedback, approvals, move rationale, and agent status. Chat is not the source of truth; it submits typed backend commands and reads derived WorldState plus events. \
**Draw:** The board and visual composition workspace for references, sketches, plan and section layouts, material swatches, image bays, prompt notes, diagrams, board packages, and generated visual studies. \
**Model:** The spatial validation workspace for ground-truth geometry, model-derived drawings, section cuts, area checks, render consistency, and Rhino Compute-backed model operations. \
**Architect:** The high-level direction field where the user shapes Object, Subject, Vector, Boundary, and Seed nodes plus links, field modes, branches, snapshots, and the Agent Direction State that guides Chat, Draw, and Model work.

### 3.1.4 Design Philosophy

**Human Defines Goal and Values:** The user sets design intent, constraints, approvals, and taste direction. \
**Object and Subject Ground Direction:** Objective outside reality and subjective human reality both enter the design field before the system derives forces or concepts. \
**Vector and Boundary Shape Possibility:** Directional desires push the design while limits contain it. The design process narrows toward Seeds through both forces together. \
**Environment Exposes Moves:** The system converts current state into meaningful choices rather than forcing the user or agent to predict a full workflow. \
**Agent Creates, System Measures:** Agents produce design tactics and artifacts. The system measures feature deltas, evaluator results, tension reduction, debt reduction, and user acceptance. \
**Compiler Steers, Evaluator Teaches:** The compiler ranks next moves from patterns, features, trajectory, and scores. Evaluators teach the system whether predicted effects were correct. \
**Truth Requires Commitment:** Branches can speculate and artifacts can be provisional, but only commits become project truth. \
**Preferences Are Scoped:** User preferences, team standards, project commits, session instructions, and explicit prompts are separate layers with source manifests and conflict handling.

### 3.1.5 Architecture Commitments

**Field Runtime Over Pipeline Product:** A.A.S. is not a graph-first pipeline authoring product. Architect Mode is a direction workspace where a flat 2D design graph shapes agent judgment, design meaning, relationships, confidence, taste, tension, lineage, and output intent. \
**Hermes as Execution Fabric:** A.A.S. does not rebuild Kanban. It compiles moves into Hermes tasks and reads Hermes task, log, and artifact state through the A.A.S.-Hermes Bridge. \
**Field Runtime Schema:** The backend persists WorldState, five-node direction ontology, live subcategories, affordances, moves, move patterns, features, evaluations, tensions, branches, commits, preferences, artifacts, events, scores, approvals, and Hermes bindings. \
**Governed Move Pattern Library:** A.A.S. uses stable primitives and a governed architectural move pattern library. Agents may propose new patterns into sandbox and curator review, but they do not directly promote patterns into stable use. \
**Context Distillation:** Agents receive compact briefs with scoped preferences, feature pressures, relevant commits, artifacts, debts, warnings, source manifests, and output contracts. \
**Bridge-Mediated Execution:** The A.A.S.-Hermes Bridge owns task packets, profile bindings, Kanban task bindings, log watching, artifact watching, profile and skill pack support, and event translation. \
**Scoring and Learning:** A.A.S. uses Feature Registry entries, evaluator contracts, sensitivity matrices, process grammar, design debt, elegance scoring, contextual outcome learning, and curator governance to improve move selection without treating memory or model weights as project truth.
