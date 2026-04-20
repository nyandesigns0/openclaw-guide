# Executive summary

The prior chats visible in this project context point to a user working in architecture / permitting / planning / construction coordination, likely in Southern California and frequently handling tenant improvements, entitlement-related submittals, consultant coordination, and city-facing communication. The user repeatedly uses the assistant for project data extraction, permit/code interpretation support, legal-description style summaries, sheet-listing, and short external email drafting.

The most durable context is not biography but work mode: the user is operating across active project files, city forms, plan sets, and consultant emails, and values outputs that accelerate project coordination. The assistant should treat the user as someone managing many practical project-administration tasks where jurisdictional correctness, compact summaries, and ready-to-send communication matter.

# Explicit user facts

- Finding: The user is associated with Design Concepts.
- Confidence: High
- Evidence: Repeated external communication drafts are signed as “DESIGN CONCEPT TEAM” / “Design Concepts,” with consistent office address, phone, and email blocks.
- Why it belongs in USER.md: This is stable organizational context that helps with drafting and project support.

- Finding: The user works on California projects, especially Inland Empire / Southern California jurisdictions.
- Confidence: High
- Evidence: Repeated project and agency references include Redlands, Chino, Jurupa Valley, Walnut, Irvine, Fontana, Eastvale, and California code / permit forms.
- Why it belongs in USER.md: This is core geographic and regulatory context.

- Finding: The user frequently handles project communications with planners, consultants, clients, and internal/external team members.
- Confidence: High
- Evidence: Multiple requests involve emails to planners, clients, consultants, and project contacts such as Rosemary Montoya, Ruby, Dana, Peter, and Herry.
- Why it belongs in USER.md: This is a recurring use case and working context.

- Finding: The user works with project identifiers, permit-style references, APNs, addresses, and scope-of-work summaries.
- Confidence: High
- Evidence: Repeated requests ask to extract or fill project information including address, APN, lot, tract, occupancy, construction type, area, scope, and project numbers such as 2025-19 and 2025-77.
- Why it belongs in USER.md: These are stable data types the user repeatedly needs help handling.

- Finding: The user works with building code and permitting concepts.
- Confidence: High
- Evidence: Repeated requests cover occupancy classification, occupant load factor, sheet lists for CD sets, fire authority jurisdiction, owner-notice radius, and permit submittal language.
- Why it belongs in USER.md: This is central domain context.

# Stable inferred user context

- Finding: Likely professional domain is architecture / engineering / planning / construction coordination.
- Confidence: High
- Evidence: Company signature block says “Architecture - Engineering - Planning - Construction,” and the chat topics consistently concern plan sets, permit forms, code issues, and consultant coordination.
- Why it belongs in USER.md: This is the main professional context needed for assistance.

- Finding: Likely working timezone is Pacific Time.
- Confidence: High
- Evidence: All referenced projects, agencies, and addresses are in California; project context timezone is -0700; previous copied emails include PDT references.
- Why it belongs in USER.md: Timezone matters for scheduling assumptions and communication timing.

- Finding: The user likely works in a project-coordination / project-management / design-administration role rather than purely design production.
- Confidence: Medium
- Evidence: Many tasks involve coordinating quotes, confirming jurisdictional requirements, asking planners questions, following up on consultants, extracting permit data, and drafting client/agency emails.
- Why it belongs in USER.md: It helps the assistant prioritize administrative and coordination support.

- Finding: The user likely works across multiple active jobs at once.
- Confidence: High
- Evidence: Chats reference multiple project numbers and multiple simultaneous requests across different jurisdictions and scopes.
- Why it belongs in USER.md: The assistant should expect fragmented, multi-project workflows.

- Finding: The user likely relies on municipal PDFs, plan sheets, and consultant correspondence as primary working materials.
- Confidence: High
- Evidence: Repeated uploads and requests involve permit applications, environmental information forms, preliminary review forms, plan sheets, and pasted consultant email threads.
- Why it belongs in USER.md: This is core workflow context.

# Recurring projects and interests

- Finding: Tenant improvement and adaptive reuse / business-use fit-out work recur often.
- Confidence: High
- Evidence: The Dog Camp Hotel TI, theater redevelopment example, occupancy and sheet list questions, and TI plan requirements all appear repeatedly.
- Why it belongs in USER.md: This is a recurring project type.

- Finding: The user returns often to entitlement / planning / public-notice style tasks.
- Confidence: High
- Evidence: Questions about radius maps, owner listings, planning contacts, zoning/use confirmation, and preliminary planning emails recur.
- Why it belongs in USER.md: This is a durable project theme.

- Finding: The user frequently needs project fact sheets and legal-description style summaries.
- Confidence: High
- Evidence: Repeated requests for LEGAL DESCRIPTION, PROJECT DESCRIPTION, extracted fields, and formatted summaries.
- Why it belongs in USER.md: This is a stable output category.

- Finding: The user repeatedly needs occupancy, code, and egress-related support.
- Confidence: High
- Evidence: Multiple questions about occupancy group, load factor, load-table lookup, and adjusting occupant load calculations.
- Why it belongs in USER.md: This is a recurring technical interest.

- Finding: The Dog Camp Hotel is a recurring active project in the visible chats.
- Confidence: High
- Evidence: Multiple uploads and many follow-up questions focus on this Redlands project.
- Why it belongs in USER.md: Active recurring projects can help continuity.

# Recurring constraints

- Finding: Outputs often need to be suitable for external use without heavy editing.
- Confidence: High
- Evidence: Many requests ask for ready emails, contact blocks, project descriptions, and permit-facing summaries.
- Why it belongs in USER.md: This affects how polished and structured the assistant should make outputs.

- Finding: Jurisdiction-specific correctness matters.
- Confidence: High
- Evidence: The user asks about specific cities, planning divisions, fire authorities, and code classifications rather than generic guidance.
- Why it belongs in USER.md: Assistance should remain agency- and code-aware.

- Finding: Source documents may be incomplete, so extracted summaries must separate confirmed facts from missing fields.
- Confidence: High
- Evidence: Several forms had incomplete fields; the work repeatedly involves filling what is known and noting what is not specified.
- Why it belongs in USER.md: This is a recurring workflow constraint.

- Finding: The user appears to operate within professional communication norms and organization branding.
- Confidence: High
- Evidence: Repeated sign-offs use consistent company name, address, and contact information.
- Why it belongs in USER.md: The assistant should preserve that institutional context.

# Working style and habits

- Finding: The user works iteratively in short instruction bursts.
- Confidence: High
- Evidence: Many chats show rapid refinement requests such as “put in the current group,” “Adjust these numbers,” “Complete this email,” and “Write me email to Ruby.”
- Why it belongs in USER.md: The assistant should expect stepwise refinement rather than single-pass requirements.

- Finding: The user frequently pastes examples and wants the assistant to mirror the useful structure.
- Confidence: High
- Evidence: Multiple requests provide sample emails, example legal-description blocks, and prior conversation excerpts.
- Why it belongs in USER.md: Example-based transformation is a key collaboration pattern.

- Finding: The user often starts from partial information and expects the assistant to organize it.
- Confidence: High
- Evidence: Repeated uploads of forms and plans followed by extraction / fill-in requests.
- Why it belongs in USER.md: The assistant should be good at turning incomplete materials into organized outputs.

- Finding: The user often needs assistance bridging between technical documents and concise business communication.
- Confidence: High
- Evidence: The same projects move from plans/forms to external emails, summaries, contact lists, and questions for planners.
- Why it belongs in USER.md: This is a stable collaboration pattern.

- Finding: The user appears to value speed and throughput in support tasks.
- Confidence: Medium
- Evidence: The chats are largely operational, fast-moving, and task-switching across projects.
- Why it belongs in USER.md: This helps the assistant prioritize responsiveness and utility.

# Suggested USER.md fields

- Name / preferred form of address: Not explicitly confirmed in visible chats.
- Organization: Design Concepts.
- Timezone: Pacific Time.
- Region: Southern California / California permitting context.
- Professional domain: Architecture, permitting, planning, construction coordination.
- Typical tasks: Permit/project data extraction, legal-description summaries, code/occupancy support, sheet lists, consultant/client/city emails.
- Recurring project types: Tenant improvements, planning submittals, public-notice / owner-listing tasks, consultant coordination.
- Active recurring project in visible chats: The Dog Camp Hotel, Redlands.
- Core output priorities: External-ready, accurate, concise, structured, jurisdiction-aware.
- Collaboration pattern: Short iterative instructions, example-driven drafting, refinement over discussion.

# Concise USER.md candidate

## Name
- Not explicitly confirmed in visible chats.

## What to call them
- Not explicitly confirmed in visible chats.
- Safe default in work context: use neutral professional addressing unless a recipient name is provided for drafted emails.

## Pronouns
- Not explicitly stated in visible chats.

## Timezone
- Pacific Time (inferred from California-based work and project context).

## Notes
- Works in or closely with Design Concepts.
- Operates in architecture / permitting / planning / construction coordination workflows.
- Frequently handles California city submittals, code questions, consultant follow-up, and project fact extraction.
- Often needs copy-ready professional emails and structured project summaries.
- Likely juggling multiple active projects at once.

## Context
- Common materials: permit PDFs, municipal forms, plan sheets, consultant emails, code excerpts.
- Common tasks: extract project data, fill legal-description / project-description templates, check occupancy/load-factor issues, identify jurisdictional contacts, build sheet lists, and draft short external emails.
- Recurring project types: tenant improvements, planning / entitlement coordination, owner-radius / notice tasks, code-and-permit support.
- Active recurring visible project: The Dog Camp Hotel in Redlands.
- Usefulness depends on staying accurate, concise, and aware of jurisdiction-specific context.

