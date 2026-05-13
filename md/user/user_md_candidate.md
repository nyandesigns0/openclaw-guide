# USER.md Candidate

## 1. Executive summary
The user appears to be a technically sophisticated builder working primarily on AI-assisted product and web app design, prototyping, debugging, and documentation. They repeatedly use the assistant for implementation planning, product interaction design, debugging, structured technical writing, and building interactive demos. They seem to care most about precision, context-awareness, preserving existing work, and producing concrete outputs that are ready to use.

The user frequently works on UI-heavy AI tools, especially around color selection, interaction systems, context-aware automation, and developer-oriented product design. They likely work in a React/TypeScript/web-app environment, and often want the assistant to act like a strong technical collaborator who understands ongoing project context.

---

## 2. Explicit user facts

### Finding:
The user works on web app and AI-related product building.
- Confidence: High
- Evidence:
  - Repeated requests to create web apps, prototypes, and one-file previewable apps.
  - Repeated requests involving tool-calling, agent behavior, AAS, SOUL.md, and USER.md.
- Why it belongs in USER.md:
  - This is core context for the kinds of tasks they bring to the assistant.

### Finding:
The user frequently works with React, TypeScript, Tailwind CSS, Radix UI, and shadcn/ui.
- Confidence: High
- Evidence:
  - Explicit technology instructions: “The webapp must be in ReactJS, TypeScript, Tailwind CSS, Radix UI and Shadcn/ui.”
- Why it belongs in USER.md:
  - This is stable technical environment information that helps tailor implementation help.

### Finding:
The user uses Replit AI / a Replit-oriented development workflow.
- Confidence: High
- Evidence:
  - Explicit references to “built in replit ai” and project context tied to Replit AI.
- Why it belongs in USER.md:
  - This is stable environment context for how the assistant should frame implementation and prototyping help.

### Finding:
The user works on AAS agent configuration and identity documents.
- Confidence: High
- Evidence:
  - Repeated requests about building SOUL.md and USER.md for an AAS agent.
- Why it belongs in USER.md:
  - This is a recurring project area.

### Finding:
The user’s likely working timezone is America/Los_Angeles.
- Confidence: Medium
- Evidence:
  - Project/system context repeatedly uses America/Los_Angeles.
- Why it belongs in USER.md:
  - Timezone helps with scheduling, recency assumptions, and time-sensitive collaboration.

---

## 3. Stable inferred user context

### Finding:
The user is likely a product builder, technical founder, or senior IC working across product design, prototyping, and implementation.
- Confidence: Medium
- Evidence:
  - They move fluidly between UX, agent systems, implementation details, debugging, documentation, and architecture.
  - They ask for full prototypes, implementation plans, and technical handoff-quality docs.
- Why it belongs in USER.md:
  - This helps the assistant calibrate to cross-functional, product-plus-engineering support.

### Finding:
The user values preserving existing systems while improving them.
- Confidence: High
- Evidence:
  - Repeated insistence on surgical changes and preserving current structure, styles, comments, and behavior.
- Why it belongs in USER.md:
  - This is part of how they operate in ongoing projects and collaborative workflows.

### Finding:
The user relies on the assistant as an implementation partner, not just an explainer.
- Confidence: High
- Evidence:
  - Repeated requests for full demos, prototypes, code, docs, debugging, and fixes.
- Why it belongs in USER.md:
  - This informs the level of initiative and output concreteness that is useful.

### Finding:
The user often works in contexts where prior project information should be reused rather than rediscovered.
- Confidence: High
- Evidence:
  - Explicit complaint that context was missing and that the model must infer project/email context from existing information.
- Why it belongs in USER.md:
  - This is practical collaboration context, not just style preference.

---

## 4. Recurring projects and interests

### Finding:
A recurring project area is AI-assisted context extraction, auto tool-calling, and agent behavior design.
- Confidence: High
- Evidence:
  - Requests around analyzing pasted text to trigger actions like new contact, update task, save file, and craft emails.
  - Requests about AAS SOUL.md and USER.md.
- Why it belongs in USER.md:
  - This is a recurring domain that helps the assistant anticipate useful structures and examples.

### Finding:
A recurring project area is interactive color preference systems and color discovery UX.
- Confidence: High
- Evidence:
  - Extensive conversation on HSL prediction, random forest, tile mode, randomize behavior, and tree visualization.
- Why it belongs in USER.md:
  - This appears to be an active, recurring product exploration area.

### Finding:
The user is interested in advanced interactive visualizations, including node graphs, phylogenetic trees, and 3D/physics-driven interfaces.
- Confidence: High
- Evidence:
  - Requests for tree visualization, infinite canvas, draggable nodes, cluster physics, 3D space using HSL axes.
- Why it belongs in USER.md:
  - This is a stable design/technical interest that can guide future suggestions.

### Finding:
The user often wants handoff-grade documentation.
- Confidence: High
- Evidence:
  - Multiple escalations asking for fuller, longer, more detailed documentation with code examples and theory.
- Why it belongs in USER.md:
  - This is a recurring deliverable type.

---

## 5. Recurring constraints

### Finding:
The user often wants single-file or tightly scoped prototypes for preview/demo purposes.
- Confidence: High
- Evidence:
  - “Create me the app in canvas in a one file webapp that I can preview.”
- Why it belongs in USER.md:
  - This is a stable implementation constraint that changes how solutions should be packaged.

### Finding:
The user prefers preserving existing functionality and avoiding collateral changes.
- Confidence: High
- Evidence:
  - Repeated instructions to make only minimum necessary changes and preserve everything else.
- Why it belongs in USER.md:
  - This affects how edits and refactors should be proposed in future help.

### Finding:
The user likely works in environments where debugging visibility matters.
- Confidence: High
- Evidence:
  - Explicit request for debugging menus, try/catch blocks, and console-visible errors.
- Why it belongs in USER.md:
  - This is a stable implementation and tooling preference.

### Finding:
The user may encounter dependency or environment instability in modern React/Next.js setups.
- Confidence: Medium
- Evidence:
  - Long debugging trail around runtime errors, canvas issues, and react-three-fiber / React instance conflicts.
- Why it belongs in USER.md:
  - Relevant environment context for future troubleshooting help.

---

## 6. Working style and habits

### Finding:
The user iterates aggressively and expects rapid refinement from partial outputs.
- Confidence: High
- Evidence:
  - Multiple short follow-ups adjusting UI, behavior, documentation depth, and implementation details.
- Why it belongs in USER.md:
  - This is a stable collaboration pattern.

### Finding:
The user often starts from a rough direction and then sharpens requirements through critique.
- Confidence: High
- Evidence:
  - Conversation evolved from tinder-like UI to 4-choice minimal UI, then randomize, tree mode, 3D mode, documentation expansion.
- Why it belongs in USER.md:
  - Helps the assistant support exploratory but demanding product iteration.

### Finding:
The user cares strongly about context continuity across turns.
- Confidence: High
- Evidence:
  - Repeated insistence on using prior attempts and previous context.
- Why it belongs in USER.md:
  - This affects how the assistant should carry and reuse information.

### Finding:
The user commonly uses the assistant for debugging, architecture, interaction design, and developer documentation.
- Confidence: High
- Evidence:
  - Repeated requests across those task types in this project history.
- Why it belongs in USER.md:
  - This is core usage-pattern information.

### Finding:
The user appears to prefer concrete recommendations when they are grounded in implementation tradeoffs.
- Confidence: Medium
- Evidence:
  - Repeated requests for best-solution selection, tradeoff comparison, and explicit implementation direction.
- Why it belongs in USER.md:
  - This helps the assistant know whether to stay neutral or decide.

---

## 7. Suggested USER.md fields

### Finding:
Include stable project/work context rather than biography.
- Confidence: High
- Evidence:
  - Current request explicitly asks for practical profile context that helps assistance.
- Why it belongs in USER.md:
  - Prevents the file from becoming a dossier.

### Finding:
Include recurring tools/platforms and recurring project areas.
- Confidence: High
- Evidence:
  - React/TypeScript/Replit/AAS/color systems recur across chats.
- Why it belongs in USER.md:
  - These are among the most useful durable facts for future support.

### Finding:
Include collaboration notes about preserving context, minimizing unnecessary changes, and producing implementation-ready outputs.
- Confidence: Medium
- Evidence:
  - Strong recurring behavior pattern, though some of this overlaps with SOUL.md.
- Why it belongs in USER.md:
  - Only include the parts that are clearly about user work context and not pure assistant behavior.

---

# Concise USER.md candidate

## Name
Not explicitly stated.

## What to call them
Not explicitly stated.

## Pronouns
Not explicitly stated.

## Timezone
Likely America/Los_Angeles.

## Notes
- Works on AI-assisted product and web app building.
- Frequently uses React, TypeScript, Tailwind CSS, Radix UI, shadcn/ui, and Replit-oriented workflows.
- Often uses the assistant for debugging, implementation planning, prototyping, interaction design, and technical documentation.
- Iterates quickly and expects outputs to improve fast from feedback.
- Often wants one-file or tightly scoped demos/prototypes.

## Context
- Recurring projects include AAS agent identity/config files, context-aware automation/tool-calling systems, and interactive color preference products.
- Strong interest in rich interactive UIs, node graphs, phylogenetic/tree views, infinite canvases, and 3D/physics-driven interfaces.
- Values concrete, implementation-ready help and durable context continuity across conversations.
- Likely works in modern React/Next.js environments where dependency/runtime issues and UI iteration are common.

