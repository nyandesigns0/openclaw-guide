# Executive summary

The available prior-chat evidence supports a practical user profile centered on product/UI implementation, iterative front-end refinement, and agent/persona specification work. The user consistently uses the assistant for building and revising React-based interfaces, extracting behavior guidance for agent documents, and tightening outputs toward higher fidelity and stronger utility.

There is **strong evidence** that the user works repeatedly on web app and UI-building tasks, cares deeply about output quality and fidelity, and prefers collaboration that is fast, additive, and implementation-oriented. There is **limited explicit evidence** for personal identifiers such as name, pronouns, or explicit timezone, so those should remain unset unless directly provided elsewhere.

# Explicit user facts

- Finding: The user is building configuration/context files for an AAS agent, including `SOUL.md` and `USER.md`.
- Confidence: High
- Evidence: Repeated requests to “extract only information relevant to building SOUL.md for an AAS agent” and now “building USER.md for an AAS agent.”
- Why it belongs in USER.md: This is a recurring, durable project context that helps the assistant understand why profile extraction matters.

- Finding: The user works heavily on UI/web app implementation tasks.
- Confidence: High
- Evidence: Repeated budgeting app demo requests, reference-image-driven UI refinement, and code edits in React/TypeScript.
- Why it belongs in USER.md: This is core context about what the user uses the assistant for.

- Finding: The user uses the assistant for iterative refinement rather than one-shot generation.
- Confidence: High
- Evidence: Repeated follow-ups like “Too basic,” “More,” “Make it hybrid,” “Remove footer,” and “add this.”
- Why it belongs in USER.md: This is an enduring collaboration pattern that helps the assistant support them better.

# Stable inferred user context

- Finding: The user likely works in product engineering, frontend development, or design-oriented app prototyping.
- Confidence: Medium
- Evidence: Strong concentration of requests around React UI builds, pixel fidelity, component-level refinement, and agent instruction design.
- Why it belongs in USER.md: This is useful assistance context, even though it is an inference rather than an explicit statement.

- Finding: The user likely operates in a workflow where reference fidelity and visible polish matter.
- Confidence: Medium
- Evidence: Repeated requests for “pixel perfect” work and close matching to attached UI references.
- Why it belongs in USER.md: This helps the assistant prioritize design fidelity and finish level in future outputs.

- Finding: The user likely values tools and workflows that support rapid iteration.
- Confidence: Medium
- Evidence: Terse refinement commands and repeated pushes for additive improvement rather than long planning cycles.
- Why it belongs in USER.md: This is a stable pattern relevant to how the assistant should support their work.

- Finding: Likely working timezone is US Pacific.
- Confidence: Low
- Evidence: Project context shows timezone `-0700` for recent project conversations.
- Why it belongs in USER.md: Timezone can help with date/time interpretation, but this should be marked as an assumption unless explicitly confirmed.

# Recurring projects and interests

- Finding: Recurring interest in budgeting app design and financial UI patterns.
- Confidence: High
- Evidence: Multiple rounds of work on a budgeting app demo, including Rocket Money / YNAB-inspired layouts and hybrid budgeting interactions.
- Why it belongs in USER.md: This is an active project/theme the assistant should remember for continuity.

- Finding: Recurring work on agent persona/configuration documents.
- Confidence: High
- Evidence: Requests centered on extracting evidence for `SOUL.md` and `USER.md` for an AAS agent.
- Why it belongs in USER.md: This is a durable meta-project relevant to future assistance.

- Finding: Recurring interest in reference-driven product demos and interface polish.
- Confidence: High
- Evidence: The user repeatedly supplies screenshots and asks for outputs to match them more closely.
- Why it belongs in USER.md: This helps the assistant frame future UI work in the right context.

# Recurring tools, software, and platforms

- Finding: ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, and Lucide React are part of the user’s recurring implementation stack.
- Confidence: High
- Evidence: Project-level technology instructions explicitly require those tools and libraries.
- Why it belongs in USER.md: This is durable environment/setup context useful for future technical help.

- Finding: The user expects Vercel AI SDK for AI-related backend and middleware work.
- Confidence: High
- Evidence: Project-level technology instructions explicitly call for Vercel AI SDK.
- Why it belongs in USER.md: This is a stable stack preference that affects implementation choices.

- Finding: The user prefers context-based global state management.
- Confidence: High
- Evidence: Project instructions say “Use context for global state management.”
- Why it belongs in USER.md: This is a stable technical preference.

- Finding: The user prefers shell-command-based file operations.
- Confidence: High
- Evidence: Project instructions specify using shell commands like `mkdir -p` or `mv` to move, copy, delete, and edit files.
- Why it belongs in USER.md: This is a recurring workflow/environment preference.

# Recurring goals

- Finding: Build polished, reference-faithful demo experiences.
- Confidence: High
- Evidence: Repeated requests to move from basic output toward pixel-accurate layouts and richer feature sets.
- Why it belongs in USER.md: This captures the kind of outcome the user repeatedly seeks.

- Finding: Build agent guidance documents that accurately reflect durable preferences and working context.
- Confidence: High
- Evidence: Repeated extraction requests for SOUL.md and USER.md from prior chats.
- Why it belongs in USER.md: This is an explicit and ongoing goal.

- Finding: Preserve prior work while extending it iteratively.
- Confidence: High
- Evidence: “KEEP ADDING DO NOT REMOVE” and “Without removing anything existing…”
- Why it belongs in USER.md: This is both a working habit and an outcome preference.

# Recurring frustrations

- Finding: The user is frustrated by outputs that feel too basic or generic.
- Confidence: High
- Evidence: “Too basic,” “It still is very basic,” “More.”
- Why it belongs in USER.md: This is a recurring friction point that can help the assistant avoid repeated misses.

- Finding: The user is frustrated by outputs that drift too far toward the wrong reference style.
- Confidence: High
- Evidence: “Make it hybrid, not totally YNAB-style functionality.”
- Why it belongs in USER.md: This helps the assistant preserve the intended balance in future design work.

- Finding: The user is frustrated by removals or unnecessary rewrites during refinement.
- Confidence: High
- Evidence: “KEEP ADDING DO NOT REMOVE.”
- Why it belongs in USER.md: This is a repeated constraint that materially affects collaboration.

# Recurring decision criteria

- Finding: The user prioritizes fidelity to reference over novelty.
- Confidence: High
- Evidence: Multiple requests to match supplied screenshots and make the result “pixel perfect.”
- Why it belongs in USER.md: This is a stable evaluation criterion for outputs.

- Finding: The user values precision, polish, and completeness.
- Confidence: High
- Evidence: Repeated dissatisfaction with underdeveloped outputs and insistence on continued refinement.
- Why it belongs in USER.md: This is central to how the user judges output quality.

- Finding: The user values maintainable implementations, not just visual mimicry.
- Confidence: High
- Evidence: Project instructions call for comments, debugging messages, try/catch blocks, and minimal-disruption edits.
- Why it belongs in USER.md: This is a durable decision criterion in technical work.

# Working style and habits

- Finding: The user tends to work through terse iterative prompts rather than long explanations.
- Confidence: High
- Evidence: “More,” “Do it,” “Remove footer,” “Add this.”
- Why it belongs in USER.md: This is a reliable collaboration pattern.

- Finding: The user often uses the assistant as an implementation partner for live refinement.
- Confidence: High
- Evidence: Repeated code- and UI-editing loops with successive corrections.
- Why it belongs in USER.md: This is one of the clearest stable usage patterns.

- Finding: The user prefers the assistant to infer obvious next steps from context when sufficient information is already available.
- Confidence: Medium
- Evidence: Most follow-ups are terse directives, not elaborate restatements of context.
- Why it belongs in USER.md: This is useful for reducing friction in future collaboration.

# Recurring constraints

- Finding: The user has stable stack constraints around React, TypeScript, Tailwind, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, and Context.
- Confidence: High
- Evidence: Explicit project technology instructions.
- Why it belongs in USER.md: These are durable environment constraints.

- Finding: The user wants minimal-disruption changes during troubleshooting and refinement.
- Confidence: High
- Evidence: Project instruction: only minimum changes, be surgical, do not remove existing UI/styles/comments/connections.
- Why it belongs in USER.md: This is a stable workflow constraint.

- Finding: No reliable evidence of name, preferred form of address, or pronouns in the available prior chats.
- Confidence: High
- Evidence: No explicit self-identification is present in the available project conversation excerpts.
- Why it belongs in USER.md: Leaving unknown identity fields blank is more accurate than guessing.

# Suggested USER.md fields

- Finding: Name should remain unset unless explicitly provided.
- Confidence: High
- Evidence: No explicit name found.
- Why it belongs in USER.md: Prevents hallucinated personal details.

- Finding: What to call them can remain unset or default to neutral direct address.
- Confidence: High
- Evidence: No explicit preferred name or form of address found.
- Why it belongs in USER.md: Keeps the profile practical and accurate.

- Finding: Pronouns should remain unset unless explicitly provided.
- Confidence: High
- Evidence: No explicit pronouns found.
- Why it belongs in USER.md: Avoids unsupported assumptions.

- Finding: Notes should emphasize product/UI work, agent-config work, and reference-driven iteration.
- Confidence: High
- Evidence: Repeated project patterns across the available chats.
- Why it belongs in USER.md: This is the most useful enduring context for future support.

- Finding: Context should include the user’s preferred stack and additive refinement workflow.
- Confidence: High
- Evidence: Strong repeated evidence from project instructions and direct requests.
- Why it belongs in USER.md: This directly improves future assistance quality.

# USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated; use neutral direct address.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely US Pacific (`-0700`) based on project context; treat as provisional.

## Notes
- Works repeatedly on product/UI implementation and front-end refinement.
- Uses the assistant for iterative building, code edits, reference-matching, and agent-document extraction.
- Strongly prefers additive refinement over rewrites.
- Cares most about fidelity, polish, precision, and maintainability.

## Context
- Active themes include budgeting app UI demos and AAS agent docs (`SOUL.md`, `USER.md`).
- Preferred implementation stack includes ReactJS, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, Lucide React, Vercel AI SDK, and Context for global state.
- Prefers shell-command-based file operations and minimal-disruption technical edits.
- Often collaborates through terse iteration loops rather than long explanatory exchanges.

