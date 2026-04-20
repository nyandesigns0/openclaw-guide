# USER.md Extraction Draft

## Executive summary
The user appears to be building and evolving **NYAN DESIGNS** as a portfolio-plus-app ecosystem, with recurring focus on web architecture, deployment strategy, subdomain design, authentication, RBAC, financial app security, and implementation planning. They use the assistant mainly for **technical architecture, system decomposition, deployment planning, secure integration design, and prompt generation for coding agents**. The strongest stable context is that they are actively working with **Vercel, Namecheap, Clerk, Plaid, Supabase, Wouter, React, TypeScript, and Vite**, and they care about solutions that preserve **SEO, maintainability, direct UX, clean architecture, and practical implementability**.

## Explicit user facts

- Finding: The user is working on a project or brand called **NYAN DESIGNS**.
- Confidence: High
- Evidence: Repeated references to `nyandesigns.com`, the uploaded project docs, and recurring discussion around site/app architecture for NYAN DESIGNS.
- Why it belongs in USER.md: This is core project context that helps the assistant stay anchored to the user’s ongoing work.

- Finding: The user owns or controls the domain `nyandesigns.com` on Namecheap.
- Confidence: High
- Evidence: “I bought domain of nyandesigns.com on namecheap.”
- Why it belongs in USER.md: This is durable setup context relevant to deployment, DNS, and domain guidance.

- Finding: The user hosts or plans to host on Vercel.
- Confidence: High
- Evidence: “I host on vercel.” Later requests center on Vercel deployment plans and project structure.
- Why it belongs in USER.md: Hosting platform is stable operational context.

- Finding: The user is working on at least three named apps/projects under NYAN DESIGNS: **Financior, Managor, Promptor**.
- Confidence: High
- Evidence: Repeated discussion of `financior.nyandesigns.com`, Managor, Promptor, and uploaded documentation naming those apps.
- Why it belongs in USER.md: These are recurring projects central to assistance.

- Finding: The user is using or planning to use **Clerk** for authentication and RBAC.
- Confidence: High
- Evidence: The user asked specifically about implementing RBAC with Clerk and described the desired auth flow.
- Why it belongs in USER.md: This is stable stack context.

- Finding: The user is using or planning to use **Plaid** for bank transaction ingestion in Financior and has already been approved for API access.
- Confidence: High
- Evidence: “I have already been approved by plaid for api access.”
- Why it belongs in USER.md: This is durable product and integration context.

- Finding: The user is using or planning to use **Supabase** with Financior.
- Confidence: High
- Evidence: The user asked how Plaid would integrate with Supabase securely.
- Why it belongs in USER.md: This is recurring infrastructure context.

## Stable inferred user context

- Finding: The user works in a hybrid space spanning web product design, software architecture, and creative/portfolio presentation.
- Confidence: High
- Evidence: NYAN DESIGNS includes portfolio sections like architecture, art, blog, awards/publications, plus functional applications such as Financior, Managor, and Promptor.
- Why it belongs in USER.md: This explains why the user regularly needs both creative-site and application-architecture support.

- Finding: The user likely manages both branding/SEO decisions and implementation-level technical decisions.
- Confidence: High
- Evidence: The user makes decisions about domain architecture, SEO consolidation, UX, deployment, folder structure, authentication, API security, and system boundaries.
- Why it belongs in USER.md: This helps the assistant provide advice that accounts for both strategic and technical considerations.

- Finding: The user is likely using a React + TypeScript + Vite frontend stack with Wouter routing.
- Confidence: High
- Evidence: Uploaded project documentation describes React 18, TypeScript, Vite, TailwindCSS, Shadcn UI, and Wouter as the routing layer.
- Why it belongs in USER.md: This is stable implementation context.

- Finding: The user likely operates in a context where maintainability and future deployment flexibility matter.
- Confidence: High
- Evidence: Repeated questions about monorepo refactors, multiple app deployments, subdomain readiness, and long-term structural choices.
- Why it belongs in USER.md: This shapes what kinds of recommendations are useful.

- Finding: The user may be working solo or in a small-team-builder mode, making both architecture and implementation decisions directly.
- Confidence: Medium
- Evidence: The user asks both strategic and detailed engineering questions and requests prompts to hand to Codex rather than describing a larger engineering organization.
- Why it belongs in USER.md: It suggests the assistant should optimize for leverage, not enterprise process overhead.

## Recurring projects and interests

- Finding: **NYAN DESIGNS main site** is a recurring project, including portfolio, technology, blog, awards/publications, and domain structure.
- Confidence: High
- Evidence: Repeated discussion around main domain structure, vanity vs functional subdomains, and uploaded site architecture docs.
- Why it belongs in USER.md: This is core recurring project context.

- Finding: **Financior** is a recurring project, especially around domain structure, separate deployment, secure banking integrations, and auth design.
- Confidence: High
- Evidence: Multiple questions focused specifically on Financior subdomains, deployment model, Plaid integration, Supabase, Clerk RBAC, and transaction flows.
- Why it belongs in USER.md: This is one of the clearest ongoing workstreams.

- Finding: **Managor** and **Promptor** are recurring application concepts even if less deeply explored in this set of chats.
- Confidence: Medium
- Evidence: They appear repeatedly in site architecture and deployment planning.
- Why it belongs in USER.md: They are part of the recurring system landscape.

- Finding: The user returns often to topics of **domain architecture, SEO, subdomains, deployment structure, auth/RBAC, secure API design, and app separation boundaries**.
- Confidence: High
- Evidence: These themes recur across multiple messages and decision points.
- Why it belongs in USER.md: These are likely high-frequency assistance topics.

## Recurring constraints

- Finding: The user wants to preserve **SEO authority** for static content under the main domain rather than splitting those sections into separate deployed subdomains.
- Confidence: High
- Evidence: The user explicitly argued that architecture/art/blog/publications should remain path-based or redirect-based because they are mostly static and should keep shared SEO value.
- Why it belongs in USER.md: This is a durable strategic constraint.

- Finding: The user wants **direct and smooth UX** for domain and routing decisions.
- Confidence: High
- Evidence: “I want smooth and direct UX for user.”
- Why it belongs in USER.md: This is a recurring decision criterion.

- Finding: The user wants **multiple independent app deployments** only where justified by real app boundaries.
- Confidence: High
- Evidence: The user kept pressing on whether separate deployments were actually supported by current structure and whether static sections should be treated differently.
- Why it belongs in USER.md: This captures an enduring architectural constraint and preference.

- Finding: The user appears to want secure handling of sensitive tokens and server-only secret storage.
- Confidence: High
- Evidence: In the Plaid flow, the user explicitly describes a server-side token exchange model with no access token on the client side.
- Why it belongs in USER.md: This is a durable security constraint.

## Working style and habits

- Finding: The user commonly uses the assistant for **architecture planning before implementation**.
- Confidence: High
- Evidence: The user explicitly requested big-picture architecture first and implementation later.
- Why it belongs in USER.md: This helps the assistant sequence help effectively.

- Finding: The user uses the assistant to produce **prompts for coding agents** like Codex.
- Confidence: High
- Evidence: “Write me a full prompt… I will put it into codex.”
- Why it belongs in USER.md: This is a practical usage pattern.

- Finding: The user values **structured, step-by-step plans** with enough detail to execute.
- Confidence: High
- Evidence: Repeated requests for action plans, code snippets, explicit breakdowns, and implementation sequencing.
- Why it belongs in USER.md: This helps the assistant shape outputs appropriately.

- Finding: The user tends to refine direction by reacting to concrete proposals rather than beginning with exhaustive upfront specification.
- Confidence: Medium
- Evidence: Many follow-ups sharpen distinctions after a proposed approach is presented.
- Why it belongs in USER.md: This suggests iterative proposal-based collaboration works well.

- Finding: The user appears to care most about outputs that are technically sound, strategically coherent, and immediately usable.
- Confidence: High
- Evidence: The user repeatedly asks for actionable plans, secure architectures, deployable structures, and prompts suitable for direct handoff.
- Why it belongs in USER.md: This is core collaboration context.

## Suggested USER.md fields

- Project/Brand: NYAN DESIGNS
- Primary domains: nyandesigns.com
- Hosting: Vercel
- DNS provider: Namecheap
- Frontend stack: React, TypeScript, Vite, Wouter, TailwindCSS, Shadcn UI
- Auth: Clerk
- Database/Backend platform: Supabase
- Finance integration: Plaid
- Recurring apps: Financior, Managor, Promptor
- Ongoing concerns: SEO-preserving site structure, subdomain strategy, secure auth/token flows, multi-app deployment architecture
- Collaboration pattern: architecture first, then implementation plan, often with prompt handoff to coding agents
- Output priorities: clarity, direct UX, maintainability, secure design, actionable structure

## Concise USER.md candidate

### Name
- Not explicitly stated.

### What to call them
- Not explicitly stated.

### Pronouns
- Not explicitly stated.

### Timezone
- Not explicitly stated.

### Notes
- Working on **NYAN DESIGNS** as a combined portfolio and app ecosystem.
- Owns or controls `nyandesigns.com` on Namecheap.
- Hosts or plans to host on Vercel.
- Frequently works on domain structure, deployment strategy, SEO-preserving architecture, and secure app integrations.
- Uses the assistant for architecture planning, implementation planning, and prompt generation for coding agents.

### Context
- Main recurring applications: **Financior**, **Managor**, **Promptor**.
- Current or intended stack includes **React, TypeScript, Vite, Wouter, TailwindCSS, Shadcn UI, Clerk, Supabase, and Plaid**.
- Cares about preserving SEO on the main site for static content while separating true apps only when it improves architecture and deployment.
- Prefers secure server-side handling for sensitive auth and financial tokens.
- Usually wants practical, stepwise help that can be handed off or implemented directly.

