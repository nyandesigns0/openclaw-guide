# Executive summary

The user appears to work in an architecture / permitting / project-coordination environment, with frequent involvement in residential development projects, consultant coordination, entitlement records, and permit strategy. They use the assistant as a practical production tool for drafting emails, extracting project data from plans and notes, organizing project briefs, and turning messy source material into usable summaries. The most helpful user-profile context is not personal biography, but recurring work context: architecture, city coordination, document formatting, project tracking, and rapid production support.

---

# Explicit user facts

- Finding: The user's likely working timezone is Pacific Time.
- Confidence: High
- Evidence: Multiple project communications reference California cities and timestamps such as "PDT" in forwarded emails; projects are in Cerritos, Irvine, Chino, Artesia, Eastvale, and similar Southern California jurisdictions.
- Why it belongs in USER.md: Timezone affects scheduling, email timing, deadline interpretation, and city office hours.

- Finding: The user is heavily involved in architecture / permitting / development project work.
- Confidence: High
- Evidence: Repeated tasks include legal descriptions, APNs, zoning, occupancy groups, construction types, project briefs, conditions of approval sheets, T-1 sheets, permit technicians, plan check structure, and consultant coordination.
- Why it belongs in USER.md: This is core context for how the assistant can best support the user.

- Finding: The user works on projects in Southern California jurisdictions.
- Confidence: High
- Evidence: Repeated project locations include Cerritos, Irvine, Eastvale, Chino, Artesia, and Los Angeles / Riverside County contexts.
- Why it belongs in USER.md: Geographic context shapes agencies, code references, permit workflows, and likely workday assumptions.

- Finding: The user frequently collaborates with architects, contractors, city staff, and engineering consultants.
- Confidence: High
- Evidence: Repeated references to Shiv Talwar, Ashu Sharma / Buildrite Construction, Allan Kam, Jeremey Loh, Manuel Espino, civil/structural engineers, permit technicians, planners, and interns.
- Why it belongs in USER.md: This collaboration network defines the kind of support the assistant should prioritize.

---

# Stable inferred user context

- Finding: The user likely plays a project coordination / design management / document-control role.
- Confidence: Medium
- Evidence: The user repeatedly asks for permit summaries, consultant lists, city contact strategy, drafting emails to team members, tasking CAD production staff, and building structured project briefs.
- Why it belongs in USER.md: Helps the assistant frame outputs around coordination, status clarity, and document readiness.

- Finding: The user probably supports or works within an architectural practice tied to Design Concepts / Shiv Talwar.
- Confidence: Medium
- Evidence: Repeated requests involve drafting emails on behalf of Shiv, internal drafting tasks, title block / T-1 / COA sheets, and project documentation associated with Design Concepts.
- Why it belongs in USER.md: This is durable workflow context that affects naming, tone, and document conventions.

- Finding: The user relies on assistant help to convert incomplete or messy source material into polished internal deliverables.
- Confidence: High
- Evidence: Frequent inputs include screenshots of emails, handwritten notes, plan sheets, PDFs, and partial project instructions that the user wants cleaned into summaries, emails, narratives, and structured docs.
- Why it belongs in USER.md: This is a major recurring usage pattern.

- Finding: The user values reusable project memory and structured knowledge capture.
- Confidence: High
- Evidence: Repeated requests to build project briefs, SOUL/USER extraction docs, history pages, collaborator lists, and legal-description templates.
- Why it belongs in USER.md: Assistant should preserve and reuse stable project context when relevant.

---

# Recurring projects and interests

- Finding: Residential tract development with entitlements, permits, and consultant coordination is a recurring project type.
- Confidence: High
- Evidence: Extensive work on Clarkdale and other residential/legal-description/permitting tasks.
- Why it belongs in USER.md: This helps the assistant anticipate useful fields, agencies, and document types.

- Finding: The Clarkdale project is a recurring project.
- Confidence: High
- Evidence: Multiple conversations on legal description, contractor identity, permit strategy, project brief, COA sheet, T-1 sheets, notes from planner, and project narrative all center on 17200 Clarkdale Ave.
- Why it belongs in USER.md: Recurring project context is useful for continuity.

- Finding: The user often works on legal-description and due-diligence style requests.
- Confidence: High
- Evidence: The project instructions explicitly define a LEGAL DESCRIPTION workflow, and the user has requested zoning, APN, tract, lot, area, jurisdiction, occupancy, and construction-type info.
- Why it belongs in USER.md: This is a recurring work product.

- Finding: The user returns often to email drafting and team communication tasks.
- Confidence: High
- Evidence: Repeated requests for emails to Peter, Ashu, Jeevesh, and others, often with specific context and file instructions.
- Why it belongs in USER.md: External/internal communication assistance is a core use case.

---

# Recurring software / tools / platforms

- Finding: The user works with DWG files, title blocks, XREFs, and sheet-based drawing packages.
- Confidence: High
- Evidence: Requests reference T-1 sheets, COA sheets, title blocks, XREF title blocks, DWG file names, AutoCAD-style sheet workflows, and eTransmitted files.
- Why it belongs in USER.md: This is stable production context.

- Finding: The user works with PDFs, plan sets, email attachments, and likely AutoCAD-based production.
- Confidence: High
- Evidence: Repeated use of PDFs, plan set sheets, DWG attachments, title blocks, and conditions-of-approval packages.
- Why it belongs in USER.md: Helps the assistant tailor file and document support.

- Finding: Email is a major operational platform in the user's workflow.
- Confidence: High
- Evidence: Many requests revolve around composing or cleaning up emails for collaborators and consultants.
- Why it belongs in USER.md: The assistant should optimize for ready-to-send messaging.

---

# Recurring goals

- Finding: Move projects from planning/entitlement into permit-ready construction documentation.
- Confidence: High
- Evidence: Many tasks focus on permit numbers, plan checks, lot-specific sheets, consultant coordination, and questions needed to proceed with architectural sets.
- Why it belongs in USER.md: This is a recurring operational objective.

- Finding: Reduce ambiguity by extracting exact project facts.
- Confidence: High
- Evidence: User repeatedly asks for exact technician number, contractor identity, permit breakdown, lot tables, consultant names, and structured project information.
- Why it belongs in USER.md: Assistant should bias toward precise fact extraction.

- Finding: Produce clean internal records and reusable project documentation.
- Confidence: High
- Evidence: Repeated asks for project briefs, summaries, formatted notes, and structured docs.
- Why it belongs in USER.md: This shapes the assistant's long-term support role.

---

# Recurring frustrations

- Finding: Incomplete project information slows work.
- Confidence: Medium
- Evidence: Repeated requests to chase missing consultant info, soils report, truss confirmation, addresses, permit numbers, and city submission status.
- Why it belongs in USER.md: Assistant should proactively surface missing items and next steps.

- Finding: Poor-quality or error-prone drawings are a recurring pain point.
- Confidence: Medium
- Evidence: In the example email, the user highlighted repeated quality issues with architectural plans and owner dissatisfaction.
- Why it belongs in USER.md: This context helps the assistant emphasize accuracy and QC support.

- Finding: City/permit workflow ambiguity is a recurring problem.
- Confidence: High
- Evidence: Multiple questions about how project was submitted, what to ask the technician, permit structure, and whether records exist.
- Why it belongs in USER.md: The assistant should help clarify agency process and records.

---

# Recurring preferences in collaboration

- Finding: The user prefers fast, practical help over long discussion.
- Confidence: High
- Evidence: Repeated short, transactional prompts asking for finished outputs and exact info.
- Why it belongs in USER.md: This is part of how the user collaborates.

- Finding: The user often works by providing partial source material and expecting synthesis.
- Confidence: High
- Evidence: Screenshots, notes, PDFs, and long copied email chains are frequently provided as raw source inputs.
- Why it belongs in USER.md: The assistant should be comfortable inferring structure from messy inputs.

- Finding: The user prefers outputs that can be immediately forwarded, filed, or assigned.
- Confidence: High
- Evidence: Emails, formatted notes, project briefs, and task instructions are common outputs.
- Why it belongs in USER.md: The assistant should optimize for operational readiness.

---

# Recurring decision criteria

- Finding: Accuracy and specificity matter more than flourish.
- Confidence: High
- Evidence: The user repeatedly asks for exact names, numbers, permit logic, file names, and structured fields.
- Why it belongs in USER.md: Helps prioritize content that matters to the user.

- Finding: Reusability and organization matter.
- Confidence: Medium
- Evidence: Frequent template use and structured documentation requests.
- Why it belongs in USER.md: Assistant should create artifacts that can be reused.

---

# Topics the user returns to often

- Finding: Permitting / plan check / city coordination.
- Confidence: High
- Evidence: Multiple conversations about permit technicians, plan check structure, agencies, entitlements, and conditions of approval.
- Why it belongs in USER.md: This is recurring work context.

- Finding: Architectural sheet production and management.
- Confidence: High
- Evidence: T-1 sheets, COA sheets, title blocks, XREFs, lot sheets, and drawing-set coordination recur repeatedly.
- Why it belongs in USER.md: Core work topic.

- Finding: Email drafting for project coordination.
- Confidence: High
- Evidence: Multiple email drafting requests across different recipients.
- Why it belongs in USER.md: Core assistant use case.

---

# What the user cares about most in outputs

- Finding: Output should be usable immediately.
- Confidence: High
- Evidence: Frequent asks for finished emails, ready summaries, formatted notes, and structured briefs.
- Why it belongs in USER.md: Defines success criteria.

- Finding: Output should preserve project-specific detail.
- Confidence: High
- Evidence: Requests often include addresses, APNs, agency names, and file names.
- Why it belongs in USER.md: Helps assistant avoid over-generalization.

---

# What kinds of tasks the user typically uses the assistant for

- Finding: Drafting emails and messages.
- Confidence: High
- Evidence: Many direct email drafting tasks.
- Why it belongs in USER.md: Recurring task type.

- Finding: Extracting and summarizing project information from documents, images, and notes.
- Confidence: High
- Evidence: Repeated requests to study PDFs, notes, screenshots, and produce summaries.
- Why it belongs in USER.md: Recurring task type.

- Finding: Building structured project docs and reusable templates.
- Confidence: High
- Evidence: Project brief, SOUL.md, USER.md, legal-description templates.
- Why it belongs in USER.md: Recurring task type.

- Finding: Permit / agency research and call-prep.
- Confidence: High
- Evidence: Technician number, what to ask city staff, how project was submitted.
- Why it belongs in USER.md: Recurring task type.

---

# Habits or working patterns relevant to assistance

- Finding: The user often works from screenshots and mobile-style captures of emails/notes.
- Confidence: Medium
- Evidence: Several requests included screenshots of email drafts, handwritten notes, and UI captures.
- Why it belongs in USER.md: Assistant should be ready to extract meaning from imperfect visual inputs.

- Finding: The user delegates drafting and CAD tasks to collaborators.
- Confidence: High
- Evidence: Repeated instructions to prepare emails assigning work to Jeevesh / interns and references to India team support.
- Why it belongs in USER.md: Useful for framing outputs as delegation-ready.

- Finding: The user may operate across both internal note style and polished external communication style.
- Confidence: High
- Evidence: Requests alternate between all-caps note summaries and normal professional email prose.
- Why it belongs in USER.md: Important workflow context.

---

# Stable context about environment or setup

- Finding: The user likely works in a small team with internal drafters/interns and external consultants.
- Confidence: Medium
- Evidence: Repeated references to internal team, interns, India team, and consultant coordination.
- Why it belongs in USER.md: Helps assistant tailor outputs for multi-party collaboration.

- Finding: The user's environment includes architecture drawing workflows and document exchange, likely via email and CAD file transfers.
- Confidence: High
- Evidence: eTransmitted DWGs, title blocks, XREFs, PDFs, and consultant file coordination recur frequently.
- Why it belongs in USER.md: Stable operational context.

---

# Stable constraints

- Finding: The user often lacks complete admin visibility into city/permit systems and must infer status via calls/emails.
- Confidence: Medium
- Evidence: Questions about whether a project was submitted, whether technician can confirm permit number, and what info to provide when calling.
- Why it belongs in USER.md: Assistant should help compensate for limited direct system visibility.

- Finding: Project coordination depends on outside consultants and city response times.
- Confidence: High
- Evidence: Missing consultant info and city workflow questions recur throughout project tasks.
- Why it belongs in USER.md: A stable coordination constraint.

---

# Suggested USER.md fields

- Name: Not explicitly stated in available chats.
- What to call them: Not explicitly stated; default to neutral professional address.
- Pronouns: Not explicitly stated.
- Timezone: Likely Pacific Time (US).
- Domains: Architecture, permitting, residential development, project coordination.
- Recurring project types: Residential tract / SFR + ADU projects, legal descriptions, entitlement / permit documentation.
- Tools/platforms: Email, PDFs, DWGs, title blocks, XREF-based drawing packages.
- Common assistant tasks: Email drafting, document digestion, permit research, structured project briefs, task delegation drafts.
- Work style: Fast, practical, structured, detail-sensitive.
- Constraints: Incomplete consultant/city information, dependency on city staff and external teams, indirect visibility into permit status.

---

# USER.md candidate

## Name
Not explicitly stated in available chats.

## What to call them
Use a neutral professional address unless they specify a preferred name.

## Pronouns
Not explicitly stated.

## Timezone
Likely Pacific Time (Southern California work context).

## Notes
- Works in architecture / permitting / project-coordination contexts.
- Frequently handles Southern California residential development projects.
- Often coordinates between architects, contractors, city staff, and engineers.
- Uses the assistant for production-ready outputs, especially emails, summaries, project briefs, and permit-related research.
- Likely delegates CAD/document tasks to internal drafters or interns.

## Context
- Recurring work includes legal descriptions, entitlements, plan check strategy, consultant coordination, and lot-specific sheet/document production.
- Common file/workflow environment includes PDFs, DWGs, XREF title blocks, drawing sheets, and email attachments.
- Often works from incomplete source material and needs quick synthesis into usable deliverables.
- Values exact project details, reusable documentation, and clarity around city/permit process.
- Frequently needs help preparing communications and next-step lists for collaborators and agencies.

