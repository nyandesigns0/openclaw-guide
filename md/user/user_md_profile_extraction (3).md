# USER.md evidence extraction

## Executive summary

The available evidence suggests a user working primarily in design, computational design, and architecture-adjacent technical workflows, with recurring use of simulation, modeling, and implementation-oriented tooling. The user appears to use the assistant as a high-leverage collaborator for technical architecture, scripting, debugging, and structured extraction of stable operating context. The clearest durable context is not biographical but operational: the user works on technically demanding design problems, values rigorous outputs, and often works within real-world performance and tooling constraints.

This extraction is grounded only in the prior chats visible in this project workspace and the current conversation context. It is not a complete audit of all past chats across every workspace.

## Explicit user facts

- Finding: The user works on architecture or architecture-adjacent design problems.
- Confidence: High
- Evidence: Prior project chat titles include architectural topics, and the visible technical request centers on a Grasshopper pedestrian simulation for a project, with spatial concepts like line of sight, doors, spaces, and circulation.
- Why it belongs in USER.md: This is core domain context that helps the assistant provide more relevant support.

- Finding: The user uses Grasshopper.
- Confidence: High
- Evidence: The user explicitly asked for a full script in GH Python, specified Grasshopper component inputs and outputs, and referenced timer hookup and component setup.
- Why it belongs in USER.md: This is a stable tooling fact directly useful for assistance.

- Finding: The user works with Rhino/Grasshopper scripting environments.
- Confidence: High
- Evidence: The conversation repeatedly references GH Python, RhinoCommon mesh behavior, Grasshopper timers, inputs, outputs, and runtime debugging.
- Why it belongs in USER.md: This is a recurring software environment and affects how code and setup instructions should be tailored.

- Finding: The user works on spatial simulation and experiential/circulation analysis.
- Confidence: High
- Evidence: The user requested a pedestrian/observer simulation focused on circulation, line of sight, distraction, dwell, entrances, exits, and visibility heatmaps.
- Why it belongs in USER.md: This is durable project-context information that improves future support.

- Finding: The user cares about performance constraints and low-end hardware viability.
- Confidence: High
- Evidence: The user explicitly required the simulation to run in real time on a low-end PC.
- Why it belongs in USER.md: This is a stable practical constraint that should shape recommendations.

- Finding: The user uses the assistant for technical implementation and debugging.
- Confidence: High
- Evidence: The visible interaction includes requests for full code generation, repeated runtime-error repair, and implementation-specific setup guidance.
- Why it belongs in USER.md: This is one of the clearest recurring task types.

## Stable inferred user context

- Finding: The user likely works in computational design or architectural design technology rather than purely conceptual architecture.
- Confidence: Medium
- Evidence: The user requests both theory and implementation, works in Grasshopper/Python, and frames design questions in terms of simulation systems and performance.
- Why it belongs in USER.md: This helps the assistant tune recommendations toward computational workflows.

- Finding: The user likely iterates inside live visual scripting environments and expects code to fit embedded tool constraints.
- Confidence: Medium
- Evidence: The user specified exact GH component signatures, timer behavior, and direct integration into the Grasshopper canvas.
- Why it belongs in USER.md: This is useful context for future code assistance.

- Finding: The user likely works on design research or advanced design development where experiential analysis matters.
- Confidence: Medium
- Evidence: The simulation scope emphasizes observer experience, visibility, movement, and behavioral affordances rather than only throughput or engineering code compliance.
- Why it belongs in USER.md: This indicates the kind of analytical framing the assistant should prioritize.

- Finding: The user likely prefers domain-aware support that bridges theory and implementation.
- Confidence: Medium
- Evidence: The user asked first for theory/models and then for executable implementation.
- Why it belongs in USER.md: This helps the assistant know what kind of context is useful.

## Recurring projects and interests

- Finding: Recurring interest in architecture and design theory.
- Confidence: Medium
- Evidence: Prior visible project chat titles include architecture-focused topics and conceptual prompts related to architectural thinking.
- Why it belongs in USER.md: This is a recurring domain anchor.

- Finding: Recurring interest in agent/assistant configuration documents like SOUL.md and USER.md.
- Confidence: High
- Evidence: Multiple visible prior project chats asked to extract evidence for SOUL.md, and the current request asks for USER.md.
- Why it belongs in USER.md: This reflects an ongoing project to build better persistent assistant context.

- Finding: Recurring interest in custom simulation systems for design analysis.
- Confidence: High
- Evidence: The current thread is a detailed simulation design and implementation exercise tied to a spatial project.
- Why it belongs in USER.md: This is a durable problem type the assistant may be asked about again.

- Finding: Recurring interest in line-of-sight, circulation, and user-experience mapping in spatial environments.
- Confidence: High
- Evidence: These concepts were central to the simulation request and framed as especially important.
- Why it belongs in USER.md: This is substantive project-context information.

## Recurring constraints

- Finding: Low-end PC / real-time performance matters.
- Confidence: High
- Evidence: The user explicitly required processing efficiency and real-time simulation on a low-end PC.
- Why it belongs in USER.md: This affects future algorithm and tooling recommendations.

- Finding: Tooling constraints inside Grasshopper components matter.
- Confidence: High
- Evidence: The user required exact input/output signatures and implementation inside a GH Python component.
- Why it belongs in USER.md: This is a stable environment constraint.

- Finding: Recommendations should respect practical implementation limits of RhinoCommon/GH Python.
- Confidence: High
- Evidence: The debugging sequence surfaced version-specific and API-specific constraints that mattered to the user.
- Why it belongs in USER.md: This is relevant future assistance context.

- Finding: There is not enough evidence for budget, organizational admin limits, or broader enterprise constraints.
- Confidence: Low
- Evidence: The visible chats do not provide durable evidence for those categories.
- Why it belongs in USER.md: It should be explicitly left blank rather than invented.

## Working style and habits

- Finding: The user often starts with a conceptual or systems-level framing and then moves quickly to implementation.
- Confidence: High
- Evidence: The simulation request began with theory and model framing, then shifted into concrete GH Python implementation and debugging.
- Why it belongs in USER.md: This is a useful collaboration pattern.

- Finding: The user uses the assistant for iterative debugging in-context, not just one-shot answers.
- Confidence: High
- Evidence: The conversation includes multiple runtime errors, screenshots, and requests for full corrected code.
- Why it belongs in USER.md: This helps the assistant anticipate interactive repair workflows.

- Finding: The user likely benefits from outputs that are both operational and structurally organized.
- Confidence: Medium
- Evidence: The user requests structured extractions, schemas, headings, and explicit output formats for agent-profile documents.
- Why it belongs in USER.md: This is relevant to how to package future support.

- Finding: The user returns to meta-work about building persistent assistant context.
- Confidence: High
- Evidence: Multiple visible chats repeat the same evidence-extraction prompt for SOUL.md, and now USER.md is requested in the same style.
- Why it belongs in USER.md: This is a recurring project and usage pattern.

## Suggested USER.md fields

- Domain: Architecture / computational design / spatial simulation
- Primary tools: Grasshopper, GH Python, RhinoCommon / Rhino–Grasshopper ecosystem
- Typical assistant uses: technical implementation, debugging, systems design, structured profile/context extraction
- Recurring interests: circulation analysis, line-of-sight, observer experience, design theory, agent configuration
- Constraints: low-end PC, real-time performance, exact integration into Grasshopper components
- Collaboration notes: often moves from high-level framing to direct implementation; benefits from context that bridges theory and buildability

## Concise USER.md candidate

### Name
- Not explicitly stated in the visible evidence.

### What to call them
- Not explicitly stated in the visible evidence.

### Pronouns
- Not explicitly stated in the visible evidence.

### Timezone
- Not explicitly stated from user-provided facts in visible chats.

### Notes
- Works in architecture / computational design / spatial-analysis contexts.
- Uses Grasshopper and GH Python in Rhino-adjacent workflows.
- Often uses the assistant for implementation, debugging, and technically structured problem-solving.
- Frequently works on problems involving circulation, line of sight, spatial experience, and simulation.
- Cares about practical performance and low-end PC viability.

### Context
- Likely operates in computational design workflows where theory and implementation both matter.
- Often needs outputs that fit exact tool constraints, especially inside Grasshopper components.
- Returns to building persistent assistant context documents such as SOUL.md and USER.md.
- Benefits from support that connects conceptual framing to executable systems and real project constraints.

