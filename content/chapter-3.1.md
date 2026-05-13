# Chapter 3.1 - Introduction

## 3.1.0 Overview

A.A.S. is an Affordance-Oriented Agent Environment for architectural design. It is built as a Field Runtime above Hermes Agent: A.A.S. owns design intelligence and project truth, while Hermes provides durable multi-agent execution through profiles, Kanban tasks, workers, memory, skills, dispatcher, and logs.

### 3.1.1 What A.A.S. Is

**Architectural Agent Environment:** A.A.S. turns goals, values, references, critique, model state, feature state, and artifacts into a navigable design field. \
**Built on Hermes:** Hermes executes work through profile-based specialist agents and Kanban task groups. A.A.S. compiles architectural moves into Hermes task packets and watches execution state. \
**Field Runtime:** The runtime reads WorldState, generates affordances, scores expected effects, distills context, lets agents select moves, compiles moves into Hermes work, and updates the world. \
**Design Intelligence Layer:** A.A.S. combines design ontology, objective functions, tension detection, move pattern library, branch search, evaluator scoring, process grammar, design debt, and commit rules. \
**Human-Steerable:** The operator reviews moves, feature pressures, branches, tensions, artifacts, commits, preferences, approvals, and Hermes task state at the level of architectural intent. \
**Local-First Product:** Project data, artifacts, WorldState snapshots, event history, profile bindings, and task bindings can run locally first, with clear upgrade paths for hosted or multi-user deployments.

### 3.1.2 Core Workflow

**Goal Intake:** The user enters a design goal, values, references, and constraints. The backend normalizes this into GoalState and initializes WorldState. \
**Feature Extraction:** The runtime extracts phase, active tensions, artifact gaps, branch health, preference context, feature state, process landmarks, design debt, and trajectory history. \
**Move Generation:** The AffordanceCompiler selects matching move patterns, instantiates candidate moves, filters illegal moves, predicts feature deltas, scores tradeoffs, and exposes a diverse top set. \
**Hermes Execution:** The MoveCompiler turns the selected move into a Hermes Kanban task group with assigned profiles, dependencies, task packet, output contract, and artifact write paths. \
**Branch Development:** Concept branches compete as design hypotheses. Agents develop, critique, compare, merge, kill, or commit them based on evidence, feature scores, and user values. \
**Tension Resolution:** The system tracks contradictions such as privacy versus openness, budget versus form, preference conflicts, or render ambition versus model truth. Critical unresolved tensions can block finalization. \
**Ground Truth and Representation:** Model, plan, section, massing, render, diagram, and board artifacts are generated through typed moves, evaluated, and validated against commits and constraints. \
**Learning Loop:** Predicted move effects are compared with evaluator-measured deltas. Move pattern stats, sensitivity matrices, and contextual rewards improve without treating model weights as having changed.

### 3.1.3 Primary Modes

**Field Navigator:** The primary visual interface. It shows the design field as spatial clusters of goals, branches, tensions, affordances, commits, artifacts, agents, Hermes task state, feature pressures, and lineage. \
**Chat Mode:** A conversational view for explanations, clarifying questions, steering, and user feedback. Chat and the Field Navigator are two views of the same WorldState. \
**Model Mode:** The spatial validation environment for ground-truth geometry, model-derived drawings, section cuts, area checks, and render consistency. \
**Trace View:** A graph-like history of executed moves, Hermes task dependencies, logs, artifact lineage, feature deltas, approvals, and WorldState snapshots. \
**Move Library View:** An advanced surface for inspecting stable, sandbox, proposed, and deprecated move patterns, including effects, tests, examples, and success stats.

### 3.1.4 Design Philosophy

**Human Defines Goal and Values:** The user sets design intent, constraints, approvals, and taste direction. \
**Environment Exposes Moves:** The system converts current state into meaningful choices rather than forcing the user or agent to predict a full workflow. \
**Agent Creates, System Measures:** Agents produce design tactics and artifacts. The system measures feature deltas, evaluator results, tension reduction, debt reduction, and user acceptance. \
**Compiler Steers, Evaluator Teaches:** The compiler ranks next moves from patterns, features, trajectory, and scores. Evaluators teach the system whether predicted effects were correct. \
**Truth Requires Commitment:** Branches can speculate and artifacts can be provisional, but only commits become project truth. \
**Preferences Are Scoped:** User preferences, team standards, project commits, session instructions, and explicit prompts are separate layers with source manifests and conflict handling.

### 3.1.5 Current Implementation Direction

**Replace Graph-First Authoring:** The old pipeline graph becomes trace/replay infrastructure. The center of the product becomes the Field Navigator. \
**Use Hermes as Execution Fabric:** A.A.S. should not rebuild Kanban. It should compile moves into Hermes tasks and read Hermes task/log/artifact state through a bridge. \
**Add Field Runtime Schema:** The backend should persist WorldState, affordances, moves, move patterns, features, evaluations, tensions, branches, commits, preferences, artifacts, events, scores, approvals, and Hermes bindings. \
**Add Move Pattern Library:** Start with stable primitives and a seeded architectural move pattern library. Let agents propose new patterns into sandbox, not directly into stable use. \
**Add Context Distiller MVP:** Agents receive compact briefs with scoped preferences, feature pressures, relevant commits, artifacts, debts, and output contracts. \
**Add Hermes Bridge MVP:** Start with CLI/task packet integration, then add Kanban DB watcher, log/artifact watcher, profile pack manager, and later direct plugin/API integration. \
**Expand Into Scoring and Learning:** Add Feature Registry, evaluator contracts, sensitivity matrix, process grammar, design debt, elegance score, and contextual outcome learning.
