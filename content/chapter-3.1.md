# Chapter 3.1 — Introduction

## 3.1.0 Overview

A.A.A. (Autonomous Architectural Agent) is a local-first architectural generation system built on top of OpenClaw that turns a design brief, reference assets, and revision feedback into structured intermediate artifacts and final reviewable presentation boards.

### 3.1.1 What A.A.A. Is

**Autonomous Architectural Agent:** A.A.A. is a multi-agent pipeline application purpose-built for architectural design workflows, from initial concept through final presentation board delivery. \
**Built on OpenClaw:** The system uses OpenClaw as its execution engine, leveraging the multi-agent runtime for orchestrating specialized worker agents such as researchers, concept designers, design critics, and board composers. \
**Local-First Product:** A.A.A. operates as a local-first monorepo application, meaning all data — projects, pipelines, sessions, artifacts, and state — lives on the operator's own machine with no mandatory cloud dependency. \
**Inspectable and Resumable:** Every step of the pipeline produces typed, reviewable outputs. The operator can pause at approval checkpoints, inspect intermediate artifacts, reject or revise, and resume without restarting the entire workflow. \
**Human-Steerable:** The system is designed around the principle that the human operator maintains control at every critical decision point, from concept direction to final board composition.

### 3.1.2 Core Workflow

**Initial Prompt:** The process begins when the user provides a design brief — a textual description of the architectural project, optionally accompanied by reference images, site context, or programmatic constraints. \
**Research and Compilation:** A dedicated Research Agent analyzes the prompt, determines the scope of investigation required, makes intelligent contextual assumptions (e.g., assuming a Southern California location if the brief implies it), asks the user proactive clarifying questions, and compiles a comprehensive research report. \
**Concept Development:** A Concept Agent takes the research report and establishes a ground truth for the project — a foundational 3D concept, floor plan, or section that ensures spatial consistency across all subsequent drawings and renderings. \
**Design Development:** Design Development (DD) agents take the established concept and develop it into final presentation components, leveraging advanced image generation models such as GPT Image V2 to produce renderings, diagrams, and architectural drawings. \
**Segmentation and Consistency:** Generated presentation boards are segmented into individual drawings (renderings, floor plans, elevations, sections, diagrams), and specialized sub-agents analyze each for coherence, checking that spatial relationships, scale, and design language remain consistent with the ground truth. \
**Deterministic Assembly:** A dedicated renderer consumes a structured board package and places content into exact regions, producing stable, repeatable PNG and PDF exports rather than relying on freeform end-to-end agent output.

### 3.1.3 Three Operational Modes

**Build Mode:** An infinite node-graph canvas where the operator designs, configures, and saves multi-agent execution pipelines — defining which agents run, in what order, with what instructions, and how data flows between them. \
**Chat Mode:** A group-chat interface where the operator interacts with all assigned pipeline agents in a conversational loop, triggering execution, receiving step-by-step results, and intervening with feedback or approvals. \
**Explore Mode:** A 3D viewer workspace backed by Rhino Compute, where the operator can visualize and validate the generated geometry that serves as the spatial ground truth for all downstream 2D deliverables.

### 3.1.4 Design Philosophy

**Backend is the Control Plane:** The backend is the product logic layer and the stable integration boundary. The frontend is a typed client shell, not an orchestrator. \
**Agents Produce Bounded Outputs:** Worker agents do not directly own product state. They produce bounded, typed, reviewable outputs that the backend validates, stores, and advances through the pipeline. \
**Structured Contracts Between Steps:** Pipeline stages communicate through structured data contracts, not unstructured prose. This ensures deterministic assembly and repeatable results. \
**Step-Local Recovery:** When failures occur, the system prefers retrying or resuming at the individual step level rather than resetting entire runs, preserving all prior valid work.

### 3.1.5 Current Implementation Status

**Working Local Control Plane:** A.A.A. currently operates as a functional local control plane with a polished operator shell and a simulated runtime, capable of running the full Build → Chat → Execute → Approve loop locally. \
**Simulated Execution:** The current pipeline executor runs within the backend process as a local simulation. Real OpenClaw controller dispatch, live worker agents, and TaskFlow-managed orchestration continuity remain future integration targets. \
**Schema Ahead of UI:** The backend database schema and API surface are materially ahead of the frontend. The persistence layer supports richer artifact, approval, event, and project-state workflows than the UI currently renders.
