# USER.md Evidence Extraction

## 1. Executive summary

This user appears to work across two recurring domains: **architecture / design competitions** and **AI-assisted product / tooling work** around analysis apps and agent behavior. They repeatedly use the assistant to help them **understand complex systems, improve report quality, translate analysis into design decisions, and generate implementation-ready prompts for tools like Cursor**. They care most about outputs that are **useful, decision-oriented, evidence-grounded, and easy to apply**.

No explicit name or pronouns were found in the prior chats reviewed. A likely working timezone is **UTC-07:00**, based on the project conversation context, but this should be treated as an assumption rather than a confirmed user-provided fact.

---

## 2. Explicit user facts

- Finding: No explicit personal name was found in the prior chats reviewed.
- Confidence: High
- Evidence: The visible prior chat prompts and project conversation excerpts contain no explicit self-identification by name.
- Why it belongs in USER.md: Prevents the assistant from inventing a name.

- Finding: No explicit preferred form of address was found.
- Confidence: High
- Evidence: The user gives task instructions directly but does not state “call me X” or equivalent.
- Why it belongs in USER.md: The assistant should avoid assuming a preferred name or title.

- Finding: No explicit pronouns were found.
- Confidence: High
- Evidence: No prior chat text explicitly states pronouns.
- Why it belongs in USER.md: The assistant should not infer pronouns.

- Finding: The user works repeatedly on architecture competition material.
- Confidence: High
- Evidence: Multiple project threads reference architecture topics, museum concepts, thesis work, competitions, and a design plan for the “Home of Shadow” competition.
- Why it belongs in USER.md: This is durable domain context that helps with future assistance.

- Finding: The user also works repeatedly on AI / software product tasks around an analysis app and agent behavior.
- Confidence: High
- Evidence: Repeated chats focus on understanding the SemiChan app, improving report pipelines, dimensionality logic, PDF export issues, and building SOUL.md / USER.md for an OpenClaw agent.
- Why it belongs in USER.md: This is stable work context.

- Finding: The user uses Cursor as a recurring implementation tool.
- Confidence: High
- Evidence: Repeated requests for “questions to ask Cursor,” “fix prompt for Cursor,” and prompts to use in Ask mode / Agent mode.
- Why it belongs in USER.md: Tool context helps the assistant produce usable outputs.

- Finding: The user works with report PDFs and app-generated analysis artifacts frequently.
- Confidence: High
- Evidence: Many repeated uploads and comparisons of analysis-report PDFs, plus questions about export, minimization, and report interpretation.
- Why it belongs in USER.md: The assistant should expect document-heavy analytical workflows.

---

## 3. Stable inferred user context

- Finding: Likely working timezone is UTC-07:00.
- Confidence: Medium
- Evidence: Project conversation context uses default timezone -0700 across prior chats.
- Why it belongs in USER.md: Timezone can help with scheduling assumptions, recency interpretation, and date framing.

- Finding: The user likely works in a mixed design + technical environment, moving between architectural ideas and code-level implementation.
- Confidence: High
- Evidence: Chats alternate between architecture competition strategy and deep debugging of clustering, dimensionality reduction, exports, and UI/report behavior.
- Why it belongs in USER.md: This helps the assistant pitch responses at the right cross-disciplinary level.

- Finding: The user likely has access to a local/dev codebase and can run or test app changes.
- Confidence: Medium
- Evidence: Repeated interactions involve code paths, Cursor prompts, implementation plans, build/export behavior, and logs from the running app.
- Why it belongs in USER.md: The assistant can safely provide implementation-oriented guidance.

- Finding: The user values outputs that bridge analysis into action.
- Confidence: High
- Evidence: Repeated requests to turn reports into design plans, action lists, prompts, and implementation steps.
- Why it belongs in USER.md: This is a stable collaboration context, not just a style preference.

---

## 4. Recurring projects and interests

- Finding: SemiChan / report-analysis app quality and behavior is a recurring project.
- Confidence: High
- Evidence: Long-running discussion of app documentation, clustering behavior, dimensions, labeling, report quality, export, and new tabs/features.
- Why it belongs in USER.md: This is clearly a durable project context.

- Finding: OpenClaw agent memory/persona files are a recurring interest.
- Confidence: High
- Evidence: Repeated requests to build SOUL.md and USER.md from prior chats.
- Why it belongs in USER.md: This is directly relevant to future agent support.

- Finding: Architecture competitions, especially concept development and jury interpretation, are recurring interests.
- Confidence: High
- Evidence: Multiple competition-related prompts, including “Home of Shadow,” museum concepts, thesis-related work, and design statements.
- Why it belongs in USER.md: The assistant can reuse this context in future design help.

- Finding: The user often wants to understand juror values and convert them into design strategy.
- Confidence: High
- Evidence: Repeated asks to interpret reports, understand juror values, and derive a design plan from analysis.
- Why it belongs in USER.md: This is a stable use case.

---

## 5. Recurring constraints

- Finding: The user often works through Cursor’s Ask mode vs Agent mode constraints.
- Confidence: High
- Evidence: Multiple prompts explicitly distinguish what Cursor can do in Ask mode versus Agent mode.
- Why it belongs in USER.md: The assistant should tailor prompts to the user’s current tooling limitations.

- Finding: The user works with generated reports that may be stale, cached, or export-mismatched, so provenance matters.
- Confidence: High
- Evidence: Repeated debugging around export timestamps, build IDs, final K, and whether the PDF matches the current analysis.
- Why it belongs in USER.md: The assistant should verify provenance and artifact freshness when helping.

- Finding: No explicit stable budget, device, or admin-access constraints were found.
- Confidence: High
- Evidence: Prior chats reviewed do not state fixed budget/device/admin limitations.
- Why it belongs in USER.md: Prevents the assistant from inventing constraints.

---

## 6. Working style and habits

- Finding: The user often iterates in tight loops: diagnose → compare → decide → generate implementation prompt.
- Confidence: High
- Evidence: Many conversations follow the pattern of comparing reports, asking what changed, then requesting a Cursor prompt or action plan.
- Why it belongs in USER.md: The assistant should support this workflow efficiently.

- Finding: The user frequently moves from high-level meaning to low-level implementation.
- Confidence: High
- Evidence: Conversations shift from “what does this mean?” to specific code-path, export, or UI implementation tasks.
- Why it belongs in USER.md: The assistant should be ready to operate across abstraction levels.

- Finding: The user often uses the assistant for document interpretation, design translation, debugging, and prompt generation.
- Confidence: High
- Evidence: Repeated use cases include report comparison, app understanding, architecture interpretation, design planning, and Cursor-ready prompts.
- Why it belongs in USER.md: This captures the practical way the assistant is used.

- Finding: The user cares most about outputs that are applicable, grounded, and decision-relevant.
- Confidence: High
- Evidence: Repeated requests ask not just for explanation, but for the best option, a plan, or the next action.
- Why it belongs in USER.md: This is central to how the assistant can be helpful.

---

## 7. Suggested USER.md fields

- Name: Not explicitly stated
- What to call them: No explicit preference found; use neutral direct address
- Pronouns: Not explicitly stated
- Timezone: Likely UTC-07:00 (assumption from project context)
- Professional domains: Architecture / design competitions; AI-assisted product and analysis tooling
- Recurring projects: SemiChan app, OpenClaw persona/profile files, architecture competition design strategy
- Recurring tools: Cursor, PDF reports, analysis dashboards, app/codebase workflows
- Recurring goals: Improve report quality, understand juror values, translate analysis into design action, produce implementation-ready prompts
- Recurring frustrations: Report/export mismatches, stale artifacts, fragmented concepts, unclear labels, under-explained systems
- Typical assistant tasks: Compare reports, interpret analysis, derive design plans, debug technical behavior, generate prompts/checklists

---

## Concise USER.md candidate

### Name
Not explicitly stated.

### What to call them
No explicit preference found. Use neutral direct address.

### Pronouns
Not explicitly stated.

### Timezone
Likely UTC-07:00 (assumption based on project conversation context, not explicitly user-stated).

### Notes
- Works across architecture/design competitions and AI-assisted software/product work.
- Frequently uses Cursor and wants tool-ready prompts for Ask mode / Agent mode.
- Often works from PDFs, app reports, logs, and exported artifacts.
- Cares about provenance and whether a report/export reflects the current build.

### Context
- Recurring projects include the SemiChan analysis app, OpenClaw memory/persona docs, and architecture competition design development.
- Often wants help interpreting jury/report data and converting it into concrete design or implementation plans.
- Typical useful outputs: comparisons, diagnosis, action lists, prompt drafts, implementation checklists, and design strategy translations.
- No stable budget/device/admin constraints were explicitly found in prior chats.

