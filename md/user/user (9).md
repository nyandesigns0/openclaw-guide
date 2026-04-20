# Executive summary

The durable user profile signal is that the user is working in **product design, UX strategy, and implementation planning around software tools**, with a particularly strong recurring focus on **Resumor**, a resume product that combines structured data, AI-assisted content, and a Figma-like visual builder. The user appears to operate in a **technical product/design hybrid role**: comfortable discussing frontend architecture, backend topology, schema design, UX interaction quality, positioning, landing pages, and implementation prompts for Cursor.

The user repeatedly uses the assistant for four main categories of work: **product strategy**, **UX/design critique**, **implementation planning**, and **artifact generation** (prompts, demos, landing pages, structured reports). The strongest practical context for USER.md is that the user values assistance that understands ongoing work on Resumor and adjacent product-building tasks, especially where product thinking, interface design, and engineering need to stay aligned.

No explicit name, preferred form of address, or pronouns were found in the reviewed chats. Timezone is most likely **Pacific Time (UTC-7)** based on project metadata, but this should be treated as an inference unless confirmed by the user.

# Explicit user facts

## 1) Working on Resumor
- Finding: The user is actively building and refining **Resumor**.
- Confidence: High
- Evidence: Multiple conversations center on “Resumor,” including target audience definition, editor demo creation, backend audit prompts, landing page critique, and landing page redesign.
- Why it belongs in USER.md: This is the most persistent project context and directly improves future assistance.

## 2) Resumor is a resume product with both data and design sides
- Finding: Resumor combines a structured data/AI backend with a more freeform resume designer/builder.
- Confidence: High
- Evidence: User described already having “the data side,” a backend with “glorified form with AI analysis,” and needing the “builder side” / “designer.”
- Why it belongs in USER.md: This explains the product architecture and recurring decision context.

## 3) User works with Cursor as part of their workflow
- Finding: The user regularly asks for Cursor-ready prompts and implementation instructions.
- Confidence: High
- Evidence: Repeated requests for “precise and in-depth prompt to put into cursor,” “full prompt to implement,” and “full instruction plan for cursor.”
- Why it belongs in USER.md: Important tool/workflow context.

## 4) User works in a React/TypeScript/Tailwind/shadcn-style frontend ecosystem
- Finding: The user’s recurring implementation context involves ReactJS, TypeScript, Tailwind CSS, Radix UI, and shadcn/ui.
- Confidence: High
- Evidence: Repeated technical instructions and generated work centered on those technologies; product demos and implementation prompts were all framed in this stack.
- Why it belongs in USER.md: Strong recurring environment context that helps future technical assistance.

## 5) User is working against an existing codebase, not greenfield only
- Finding: The user often needs to extend or refine existing systems rather than start from scratch.
- Confidence: High
- Evidence: Frequent mentions of existing backend, existing builder, existing landing page, existing system to build on top of.
- Why it belongs in USER.md: Helps the assistant understand the user’s practical working environment.

# Stable inferred user context

## 6) Likely product/design/engineering hybrid role
- Finding: The user likely operates across product strategy, UX, frontend implementation, and system architecture.
- Confidence: Medium
- Evidence: The user moves fluently between target audience definition, UX critique, landing page positioning, backend audits, schema discussions, and implementation planning.
- Why it belongs in USER.md: Useful enduring context for how to support them.

## 7) Likely working timezone: Pacific Time
- Finding: The user likely works in Pacific Time (UTC-7).
- Confidence: Medium
- Evidence: Project conversation metadata states default timezone is -0700.
- Why it belongs in USER.md: Useful for time-aware assistance, but should remain clearly marked as inferred.

## 8) Likely works in a monorepo / multi-app environment
- Finding: The user appears to be working inside a monorepo with shared packages and multiple apps.
- Confidence: Medium
- Evidence: Repeated tasks referenced Resumor within a larger Nyan Designs monorepo context with shared UI/styles/packages.
- Why it belongs in USER.md: Useful environment context for code and architecture help.

# Recurring projects and interests

## 9) Resumor editor / builder UX
- Finding: A recurring project is the Resumor resume editor: drag precision, grids, layers, properties, templates, ATS feedback, and hover interactions.
- Confidence: High
- Evidence: Extended conversations about the editor demo, interaction quality, block system, hover actions, ATS-safe rails, and implementation planning.
- Why it belongs in USER.md: This is active project context likely to recur.

## 10) Resumor landing page and product positioning
- Finding: Another recurring project is refining Resumor’s landing page to better match the target audience.
- Confidence: High
- Evidence: The user requested a critique, action plan, redesigned demo landing page, and Cursor implementation instructions.
- Why it belongs in USER.md: Strong recurring product/marketing context.

## 11) AI-assisted resume/content workflows
- Finding: The user is interested in AI-assisted generation, tailoring, and refinement of resume content.
- Confidence: High
- Evidence: User described existing AI analysis/tailoring backend and repeatedly incorporated AI buttons/placeholders into product concepts.
- Why it belongs in USER.md: Important domain context for product and feature decisions.

## 12) Audience and persona definition work
- Finding: The user repeatedly works on defining target audience, segmentation, and positioning.
- Confidence: High
- Evidence: Conversations focused on narrowing the real audience for Resumor and aligning copy and UX to that audience.
- Why it belongs in USER.md: It is part of how the user uses the assistant strategically.

## 13) Agent/profile design (SOUL.md / USER.md)
- Finding: The user is working on OpenClaw agent profile documents like SOUL.md and USER.md.
- Confidence: High
- Evidence: Recent direct requests to extract prior-chat evidence for SOUL.md and USER.md.
- Why it belongs in USER.md: Relevant current meta-project context.

# Recurring constraints

## 14) Must preserve existing systems when possible
- Finding: The user often works under a constraint of extending existing products without breaking them.
- Confidence: High
- Evidence: Repeated context around incomplete builder, existing backend, existing landing page, and additive integration.
- Why it belongs in USER.md: This is a stable working constraint in their environment.

## 15) Wants implementation that fits current stack and design system
- Finding: Solutions need to fit the current stack and existing visual/system patterns.
- Confidence: High
- Evidence: Repeated requests to keep visual style, reuse existing architecture, and generate prompts that integrate into the main app.
- Why it belongs in USER.md: Strong recurring delivery constraint.

## 16) No stable budget/admin/device constraints found
- Finding: No clear recurring budget, hardware, or admin-rights limits were explicitly stated in reviewed chats.
- Confidence: High
- Evidence: No direct mention of personal device limits, org access limits, or budget ceilings.
- Why it belongs in USER.md: Important not to invent constraints.

# Working style and habits

## 17) Uses assistant as a thinking + execution partner
- Finding: The user uses the assistant both to think through product strategy and to produce concrete implementation artifacts.
- Confidence: High
- Evidence: Conversations move from target-audience discovery to reports, demos, implementation prompts, and integration plans.
- Why it belongs in USER.md: This describes how assistance is most useful.

## 18) Iterative refinement style
- Finding: The user tends to review an output, critique specific parts, and then request a refined next version.
- Confidence: High
- Evidence: Example flow: demo editor → interaction critique → improved demo; landing page critique → redesigned landing demo → implementation instructions.
- Why it belongs in USER.md: Helpful for anticipating collaborative workflow.

## 19) Works visually and structurally
- Finding: The user often wants both conceptual clarity and visual embodiment.
- Confidence: High
- Evidence: Requests frequently combine strategic reports with demos, tables, graphs, mockups, or page designs.
- Why it belongs in USER.md: Guides how to support the user effectively.

## 20) Returns often to product/UX/implementation alignment
- Finding: The user repeatedly wants product positioning, UX, and engineering plans to stay aligned.
- Confidence: High
- Evidence: Many tasks tie target audience, editor interactions, architecture, and landing page messaging into one coherent system.
- Why it belongs in USER.md: This is a durable cross-cutting concern.

# Suggested USER.md fields

- Current primary project: Resumor
- Project type: resume platform with structured data + AI + visual editor
- Domains: product strategy, UX design, frontend implementation planning, software architecture
- Regular tools/workflow: Cursor, React, TypeScript, Tailwind, Radix, shadcn/ui
- Typical assistant uses: strategy, critique, implementation prompts, demos, structured reports
- Working style: iterative refinement, visual + structured, build on top of existing systems
- Likely timezone: Pacific Time (inferred, not confirmed)
- Missing/unknown: name, preferred form of address, pronouns, hard budget/admin/device constraints

# Concise USER.md candidate

## Name
- Not explicitly stated.

## What to call them
- Not explicitly stated.

## Pronouns
- Not explicitly stated.

## Timezone
- Likely Pacific Time (UTC-7), inferred from project metadata; not explicitly confirmed.

## Notes
- Primary recurring project is **Resumor**.
- Resumor combines structured resume data, AI-assisted tailoring, and a visual resume designer.
- Often works in a React/TypeScript/Tailwind/shadcn-style stack.
- Frequently uses Cursor-ready prompts and implementation plans.

## Context
- Likely works across product strategy, UX, and implementation planning.
- Uses the assistant for critiques, demos, reports, architecture prompts, and integration plans.
- Often works on top of existing systems rather than from scratch.
- Repeatedly returns to editor UX, landing page positioning, and product-audience fit.
- No explicit stable budget, hardware, or admin constraints found in reviewed chats.

