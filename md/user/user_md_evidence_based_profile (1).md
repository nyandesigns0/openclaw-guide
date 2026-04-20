# USER.md Evidence-Based Profile

## 1. Executive summary

The user appears to be a **design-research practitioner working at the intersection of architecture, computational design, simulation, and visual communication**. They repeatedly use the assistant to help with **theoretical framing, systems architecture, Grasshopper/Rhino workflows, structured technical writing, and high-quality report creation**. Their recurring work centers on **building simulation/design frameworks**, especially **Sojourner**, and applying computational reasoning to architectural problems such as circulation, affordances, privacy, and wayfinding.

The most stable contextual pattern is that the user wants help that is **conceptually rigorous, practically useful, modular, and directly applicable to live projects**. They work iteratively, often moving from **high-level theory → framework → component plan → implementation → debugging → reporting**.

---

## 2. Explicit user facts

### Name
- Finding: No explicit personal name was stated in this conversation set.
- Confidence: High
- Evidence: No direct self-identification by name appeared in the available prior chats.
- Why it belongs in USER.md: Helps avoid inventing identity details.

### What to call them
- Finding: No explicit preferred form of address was stated.
- Confidence: High
- Evidence: The user did not provide a preferred name, title, or nickname.
- Why it belongs in USER.md: Useful to record absence of evidence so the assistant does not assume.

### Pronouns
- Finding: No explicit pronouns were stated.
- Confidence: High
- Evidence: No direct pronoun preference was provided.
- Why it belongs in USER.md: Avoids fabrication.

### Timezone or likely working timezone
- Finding: Likely working timezone is UTC-7 / Pacific-adjacent, but this is inferred from project metadata rather than user statement.
- Confidence: Medium
- Evidence: Project conversation metadata shows a default timezone of -0700.
- Why it belongs in USER.md: Useful for scheduling assumptions, but should be marked as inferred.

### Stable device / software environment
- Finding: The user explicitly works in **Rhino 7** and **Grasshopper**.
- Confidence: High
- Evidence: “I have rhino 7 and grasshopper running.”
- Why it belongs in USER.md: This is direct setup context that meaningfully affects assistance.

### Units preference
- Finding: Default project units should be **feet**.
- Confidence: High
- Evidence: “all default units must be in feet.”
- Why it belongs in USER.md: This is a stable working-context preference with direct implementation consequences.

---

## 3. Stable inferred user context

### Professional / practice domain
- Finding: The user works in or adjacent to **architecture, computational design, and design research**.
- Confidence: High
- Evidence: Repeated discussion of buildings, affordances, museums, city halls, bathrooms, circulation, architectural reports, Grasshopper components, and practice-facing design outputs.
- Why it belongs in USER.md: This is the clearest durable context for task interpretation.

### Design-research orientation
- Finding: The user treats design as a **research process**, not just production.
- Confidence: High
- Evidence: Repeated emphasis on ontology, methodology, theory, frameworks, validation, design-research thesis positioning, and metrics.
- Why it belongs in USER.md: The assistant should expect hybrid conceptual + practical requests.

### Practice-facing communication needs
- Finding: The user often needs outputs suitable for **architecture practice**, not purely academic audiences.
- Confidence: High
- Evidence: They explicitly chose “Practice” as the audience priority for the Sojourner report.
- Why it belongs in USER.md: Helps calibrate tone and formatting for deliverables.

### Preference for modular systems
- Finding: The user consistently thinks in **modular systems, components, layers, and swappable architectures**.
- Confidence: High
- Evidence: Repeated requests for palettes, tabs, component lists, stable contracts, split settings, and staged node-by-node builds.
- Why it belongs in USER.md: This is a recurring cognitive/work pattern, not just a style preference.

---

## 4. Recurring projects and interests

### Sojourner
- Finding: **Sojourner** is a major recurring project.
- Confidence: High
- Evidence: Extended multi-step development of Sojourner’s theory, architecture, reports, metrics, and Grasshopper prototype.
- Why it belongs in USER.md: Ongoing project context is highly reusable.

### Affordance-based design
- Finding: The user is strongly interested in **designing by affordances** rather than fixed functions.
- Confidence: High
- Evidence: Repeated exploration of affordances, threat to affordance, function abstraction, and form influencing behavior.
- Why it belongs in USER.md: This is a recurring conceptual lens across tasks.

### Pedestrian / circulation simulation
- Finding: The user repeatedly returns to **circulation, line of sight, distraction, wayfinding, privacy, and foot-traffic simulation**.
- Confidence: High
- Evidence: Repeated discussion of pedestrian sims, visibility, museums, city halls, bathrooms, and observer movement.
- Why it belongs in USER.md: Strong recurring topic cluster.

### Toilet / bathroom project
- Finding: The user has an ongoing **toilet project** tied to privacy, affordance, and form/composition validation.
- Confidence: High
- Evidence: “I’m trying to apply the concepts and simulations to the toilet project Kevin and I been working on.”
- Why it belongs in USER.md: Stable project context likely to recur.

### Reports and design documents
- Finding: The user repeatedly uses the assistant to create **structured reports, academic-style documents, and polished presentation material**.
- Confidence: High
- Evidence: Repeated requests for reports, chapter structures, visual composition, formatted docs, and artifact generation.
- Why it belongs in USER.md: Useful for anticipating future deliverable types.

---

## 5. Recurring constraints

### Low-end / efficiency-sensitive computing
- Finding: The user wants simulation logic that can run on a **low-end PC / lightweight hardware budget**.
- Confidence: High
- Evidence: Repeated emphasis on real-time simulation “on a low end PC” and efficiency-focused logic.
- Why it belongs in USER.md: Important engineering constraint.

### Real-time responsiveness
- Finding: The user values systems that can run **in real time** inside Grasshopper.
- Confidence: High
- Evidence: Repeated requirement that code be processing-efficient and timer-driven in GH.
- Why it belongs in USER.md: This affects algorithm and implementation recommendations.

### Artifact usability over theoretical purity
- Finding: The user wants theory to remain **usable in live project work**.
- Confidence: High
- Evidence: Repeated push from theory to implementation to validation to report output.
- Why it belongs in USER.md: Guides how much abstraction is appropriate.

### Do not assume access to richer compiled plugin infrastructure first
- Finding: Early solutions should be buildable in **GhPython / one Grasshopper file** before scaling.
- Confidence: High
- Evidence: Requests to build a minimal version first, one file, one component chain, then extend.
- Why it belongs in USER.md: Important scoping constraint.

---

## 6. Working style and habits

### Iterative layering
- Finding: The user tends to work in a layered sequence: **concept → framework → architecture → implementation → debugging → presentation**.
- Confidence: High
- Evidence: This pattern repeated throughout Sojourner development and related requests.
- Why it belongs in USER.md: Helps the assistant meet the user where they are in the workflow.

### Stepwise build preference
- Finding: The user often prefers to **build one piece at a time**.
- Confidence: High
- Evidence: “We take one at a time,” repeated node-by-node requests, and debugging one error at a time.
- Why it belongs in USER.md: Useful for pacing responses.

### Heavy use of the assistant for debugging and architecture decisions
- Finding: The user uses the assistant not just for ideas, but for **debugging, refactoring, and component planning**.
- Confidence: High
- Evidence: Repeated error screenshots, fix requests, and architecture redesign prompts.
- Why it belongs in USER.md: Indicates a reliable task pattern.

### Wants outputs that are directly reusable
- Finding: The user prefers deliverables they can **drop into live workflows**.
- Confidence: High
- Evidence: Requests for buildable nodes, zip files, one-file GH structures, and formatted docs.
- Why it belongs in USER.md: The assistant should bias toward usable artifacts.

### Returns often to theory-practice translation
- Finding: The user repeatedly asks how abstract ideas become **metrics, code, components, and design decisions**.
- Confidence: High
- Evidence: Examples include discrete choice theory, affordance threat metrics, and typology vs spectrum defaults.
- Why it belongs in USER.md: Important recurring assistance pattern.

---

## 7. Suggested USER.md fields

### Name
- Finding: Not explicitly stated.
- Confidence: High
- Evidence: No name provided.
- Why it belongs in USER.md: Prevents assumptions.

### What to call them
- Finding: Not explicitly stated.
- Confidence: High
- Evidence: No preferred address given.
- Why it belongs in USER.md: Same as above.

### Pronouns
- Finding: Not explicitly stated.
- Confidence: High
- Evidence: No pronouns given.
- Why it belongs in USER.md: Same as above.

### Timezone
- Finding: Likely UTC-7 / Pacific-adjacent (inferred).
- Confidence: Medium
- Evidence: Project metadata default timezone -0700.
- Why it belongs in USER.md: Scheduling/logging assumptions.

### Notes
- Finding: Works in architecture / computational design / design research.
- Confidence: High
- Evidence: Repeated discussion topics and tools.
- Why it belongs in USER.md: Core context.

### Context
- Finding: Active projects include Sojourner and a toilet project; uses Rhino 7 + Grasshopper; defaults to feet; prefers modular systems; cares about practice-ready outputs and efficient simulation on constrained hardware.
- Confidence: High
- Evidence: Repeated throughout the conversation.
- Why it belongs in USER.md: This is the most reusable practical context.

---

# Concise USER.md Candidate

## Name
Not explicitly stated.

## What to call them
No preferred form of address explicitly stated.

## Pronouns
Not explicitly stated.

## Timezone
Likely UTC-7 / Pacific-adjacent (inferred from project metadata, not directly stated by user).

## Notes
- Works in architecture / computational design / design research.
- Uses Rhino 7 and Grasshopper.
- Default working units should be feet.
- Often develops modular simulation/design systems and practice-facing reports.

## Context
- Recurring project: **Sojourner**, a circulation / affordance / perception simulation framework.
- Recurring project: **toilet project** involving privacy, affordance, and spatial validation.
- Frequently asks for help with theory-to-implementation translation, Grasshopper component architecture, debugging, reporting, and visual/structured deliverables.
- Likely values efficient real-time workflows suitable for lower-end hardware and incremental build-up from minimal prototypes.

