# Executive summary

The user appears to work in a design/analysis context centered on architecture competitions, jury interpretation, and AI-assisted tooling for concept extraction, reporting, and design strategy. They repeatedly use the assistant as a thinking partner for: interpreting complex outputs, designing analysis systems, debugging product/report behavior, drafting implementation plans/prompts, and translating raw technical analysis into practical design direction. The most durable context is not personal biography but a working profile: they are building and refining systems like SemiChan/OpenClaw-related artifacts, care strongly about analytical usefulness, and repeatedly return to architecture-jury analysis, model interpretation, and productization of AI workflows.

The user’s likely working timezone is America/Los_Angeles based on project/system context used repeatedly in this workspace, but this should still be treated as environment context rather than a self-stated personal fact. The user consistently works across technical and design layers: APIs, clustering/vector analysis, prompts, reports, architecture competition strategy, and documentation.

---

# Explicit user facts

- Finding: The user is working on architecture-related analysis and competition-jury interpretation.
  - Confidence: High
  - Evidence: Repeated conversations revolve around architecture competitions, juror comments, design strategy, and extracting jury values from prior competition feedback.
  - Why it belongs in USER.md: This is core domain context that strongly affects how the assistant should frame examples, terminology, and support.

- Finding: The user is building or refining a system called SemiChan.
  - Confidence: High
  - Evidence: Repeated requests about SemiChan reports, architecture, AutoK, AutoSeed, concepts, axes, jurors, interpretation docs, prompts, and report evaluation.
  - Why it belongs in USER.md: This is an active recurring project and central working context.

- Finding: The user is also working with OpenClaw-related documentation/persona files such as SOUL.md and USER.md.
  - Confidence: High
  - Evidence: Repeated requests to extract behavior/context relevant to building SOUL.md and now USER.md for an OpenClaw agent.
  - Why it belongs in USER.md: This is a recurring project/tooling context directly relevant to future assistance.

- Finding: The user works with report outputs, uploaded PDFs, and structured analysis artifacts.
  - Confidence: High
  - Evidence: Many requests involve analyzing uploaded PDF reports, comparing runs, interpreting metrics, and turning them into docs or prompts.
  - Why it belongs in USER.md: This describes a stable pattern of assistant use.

- Finding: The user works with implementation planning and Cursor prompts.
  - Confidence: High
  - Evidence: Multiple requests asked for Cursor prompts, implementation plans, debugging plans, parameter playbooks, and technical documentation.
  - Why it belongs in USER.md: This helps the assistant know the user often wants deliverables that are ready to hand to coding agents/tools.

---

# Stable inferred user context

- Finding: Likely working timezone is America/Los_Angeles.
  - Confidence: Medium
  - Evidence: Project/system context repeatedly used America/Los_Angeles for dates/times during analysis and report interpretation.
  - Why it belongs in USER.md: Timezone is useful operational context, but should be marked as likely rather than explicitly self-stated.

- Finding: The user operates across both design and technical domains.
  - Confidence: High
  - Evidence: They move fluidly between architecture design strategy, jury interpretation, clustering/vector pipelines, API prompts, and system debugging.
  - Why it belongs in USER.md: This affects how explanations should bridge design language and technical reasoning.

- Finding: The user is likely productizing or preparing to productize SemiChan-like tooling.
  - Confidence: Medium
  - Evidence: Repeated concern with “shipping,” “finalizing,” “product-grade,” trust, reproducibility, report quality, and commercial/user-facing value.
  - Why it belongs in USER.md: This helps prioritize outputs toward product clarity, trust, and usability.

- Finding: The user likely works in a mixed environment using browser-based tools, uploaded documents, AI agents, and code assistants rather than purely local terminal workflows.
  - Confidence: High
  - Evidence: The user explicitly clarified they are not targeting terminal-only or Python-local workflows and wants systems that can work from mobile to hosted web product; repeated use of Cursor prompts and web/app artifacts.
  - Why it belongs in USER.md: This is stable environment/setup context.

---

# Recurring projects and interests

- Finding: SemiChan architectural analysis system.
  - Confidence: High
  - Evidence: The majority of the conversation centers on SemiChan’s clustering, concepts, axes, jurors, prompts, reports, and interpretation layers.
  - Why it belongs in USER.md: This is the most important recurring project.

- Finding: OpenClaw agent configuration files such as SOUL.md and USER.md.
  - Confidence: High
  - Evidence: Multiple explicit requests to build persona/profile docs for an OpenClaw agent.
  - Why it belongs in USER.md: It is a direct recurring meta-project.

- Finding: Architecture competition strategy and jury alignment.
  - Confidence: High
  - Evidence: Repeated requests for design direction, jury-facing synthesis, and how to create a design aligned with juror values.
  - Why it belongs in USER.md: This is a durable topic and use case for the assistant.

- Finding: AI-assisted interpretation and reporting systems.
  - Confidence: High
  - Evidence: Repeated interest in concept labeling, summarization models, prompt design, evaluation metrics, and interpretation documentation.
  - Why it belongs in USER.md: This is a recurring assistant-supported activity.

---

# Recurring constraints

- Finding: The user cares about reproducibility, governance, and defensible selection standards.
  - Confidence: High
  - Evidence: Repeated emphasis on AutoK, AutoSeed, stability, validity, and avoiding arbitrary/random outputs.
  - Why it belongs in USER.md: This is a stable decision constraint for system design work.

- Finding: The user wants outputs that can work in hosted/browser product contexts, not only local technical setups.
  - Confidence: High
  - Evidence: The user explicitly rejected terminal/Python-local assumptions and emphasized mobile-to-desktop hosted usage.
  - Why it belongs in USER.md: This is an important environment/product constraint.

- Finding: The user is sensitive to report credibility and user trust.
  - Confidence: High
  - Evidence: Repeated focus on contradictions, trustworthiness, interpretability, and whether reports are “product-grade.”
  - Why it belongs in USER.md: This is a stable evaluation constraint.

- Finding: Low API/runtime cost is useful but secondary to quality and trust.
  - Confidence: Medium
  - Evidence: The user discussed small models, hosted products, and low-cost report generation, but repeatedly chose better quality when small models failed.
  - Why it belongs in USER.md: This helps when proposing tools/models.

---

# Working style and habits

- Finding: The user uses the assistant iteratively: first broad framing, then progressive narrowing and refinement.
  - Confidence: High
  - Evidence: Many threads proceed from simple explanation → deeper breakdown → implementation plan → prompt/doc artifact.
  - Why it belongs in USER.md: This helps the assistant anticipate collaboration rhythm.

- Finding: The user often works by comparing runs, seeds, reports, and parameter variants.
  - Confidence: High
  - Evidence: Repeated upload-and-compare workflows for multiple analysis reports and seeds.
  - Why it belongs in USER.md: This is a recurring task pattern.

- Finding: The user values practical outputs over purely conversational help.
  - Confidence: High
  - Evidence: Frequent requests for prompts, plans, docs, reports, and implementation-ready deliverables.
  - Why it belongs in USER.md: This shapes what kinds of responses are most helpful.

- Finding: The user frequently uses the assistant to translate technical system outputs into design strategy or report language.
  - Confidence: High
  - Evidence: Repeated requests for interpretation reports, jury-facing synthesis packs, design plans, and practical takeaways from raw metrics.
  - Why it belongs in USER.md: This is one of the clearest user-task patterns.

---

# Suggested USER.md fields

- Finding: Include current major projects and artifacts.
  - Confidence: High
  - Evidence: SemiChan and OpenClaw/SOUL.md/USER.md recur constantly.
  - Why it belongs in USER.md: These are the most useful context anchors.

- Finding: Include domain context: architecture competitions, jury analysis, AI/product tooling.
  - Confidence: High
  - Evidence: This domain recurs throughout the project conversations.
  - Why it belongs in USER.md: It helps the assistant pick relevant framing and examples.

- Finding: Include likely timezone and environment assumptions, clearly marked if inferred.
  - Confidence: Medium
  - Evidence: Repeated use of America/Los_Angeles in project context and browser/hosted-product constraints.
  - Why it belongs in USER.md: This is useful operational context.

- Finding: Include the main assistant use cases.
  - Confidence: High
  - Evidence: Interpretation, system design, report evaluation, prompt writing, implementation planning, and design strategy all recur.
  - Why it belongs in USER.md: This helps the assistant prioritize relevant help quickly.

---

# Concise USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated. Use neutral direct address unless they specify otherwise.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely America/Los_Angeles (inferred from repeated project context; treat as likely, not confirmed).

## Notes
- Works at the intersection of architecture, jury interpretation, and AI-assisted analysis/reporting.
- Building/refining SemiChan, especially around concepts, axes, jurors, prompts, reports, AutoK/AutoSeed, and interpretation layers.
- Also working on OpenClaw-related persona/context docs such as SOUL.md and USER.md.
- Frequently uses the assistant for report interpretation, implementation planning, Cursor prompts, prompt design, and turning raw technical outputs into design strategy.

## Context
- Strong recurring focus on architecture competition strategy and understanding what juries value.
- Regularly compares multiple report runs, seeds, and parameter settings.
- Likely working toward a browser/hosted product context, not local terminal-only workflows.
- Cares about reproducibility, trust, interpretability, and product-grade clarity.
- Prefers outputs that are directly usable: plans, prompts, docs, and strategy frameworks.

