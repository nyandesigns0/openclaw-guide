# 1. Executive summary

This profile is based on the prior project chat context available here, not a full account-wide chat export.

The strongest durable user-context signals are that you appear to work in an **architecture / engineering / permitting / consultant-coordination** environment, often around **plan check corrections, drawing sets, structural/mechanical coordination, and client/City resubmittals**. You use the assistant mainly for **operational execution**: drafting external emails, extracting technical/project information, locating specs and code references, and packaging updates for clients, engineers, and consultants.

The most useful USER.md context is:
- You seem to operate in a **California A/E/C workflow** with city comments, permit revisions, resubmittals, and consultant coordination.
- Your recurring priorities are **speed, precision, project momentum, and submission-readiness**.
- You repeatedly use the assistant for **short external communication, technical lookup/extraction, and project coordination support**.
- You care most about **accurate, usable outputs that help move projects forward**.

# 2. Explicit user facts

- Finding: Name is not explicitly stated in the available prior chat evidence.
- Confidence: High
- Evidence: Multiple signatures and recipient names appear, but none clearly identify the user directly.
- Why it belongs in USER.md: Avoids inventing identity data.

- Finding: What to call them is not explicitly stated in the available prior chat evidence.
- Confidence: High
- Evidence: No direct instruction such as "call me X."
- Why it belongs in USER.md: This should stay blank rather than guessed.

- Finding: Pronouns are not explicitly stated in the available prior chat evidence.
- Confidence: High
- Evidence: No direct statement of pronouns.
- Why it belongs in USER.md: Should not be inferred without evidence.

# 3. Stable inferred user context

- Finding: Likely works in architecture / engineering / planning / construction coordination.
- Confidence: High
- Evidence: Repeated references to "Design Concepts," project drawing sets, structural comments, plan check responses, permit corrections, consultants, title blocks, stamps, and City resubmittals.
- Why it belongs in USER.md: This is core professional context that helps the assistant understand task domain.

- Finding: Likely operates in a California project/permitting environment.
- Confidence: High
- Evidence: Repeated California cities and agencies: Perris, Jurupa Valley, Irvine, Eastvale, Chino; use of CBC/CMC references; California-style permit review workflow.
- Why it belongs in USER.md: Jurisdiction context shapes codes, terminology, and document style.

- Finding: Likely working timezone is Pacific Time.
- Confidence: Medium
- Evidence: Project timezone shown as -0700 and repeated California-based work context.
- Why it belongs in USER.md: Useful for reminders, deadlines, and date phrasing.

- Finding: Works in a role that coordinates between clients, engineers, consultants, and agencies.
- Confidence: High
- Evidence: Frequent drafting of emails to structural engineers, clients, manufacturers, and consultants; repeated requests about follow-ups, submissions, and status checks.
- Why it belongs in USER.md: This explains why the assistant should support cross-party communication and handoff work.

# 4. Recurring projects and interests

- Finding: Recurring work involves plan check correction cycles and resubmittals.
- Confidence: High
- Evidence: Multiple references to PC6, PC7, "Transmittal Letter," review comments, response letters, final structural sets, and City resubmittal questions.
- Why it belongs in USER.md: This is a repeated workflow, not a one-off task.

- Finding: Recurring interest in structural, mechanical, and architectural coordination.
- Confidence: High
- Evidence: Repeated requests about equipment loads, structural comments, rooftop units, mechanical layouts, sheet coordination, and stamped/title-blocked architectural sets.
- Why it belongs in USER.md: This helps the assistant understand technical context and recurring needs.

- Finding: Recurring technical topics include HVAC equipment, manufacturer specs, weights, dimensions, and code triggers.
- Confidence: High
- Evidence: Requests for Daikin spec sheets, model dimensions/weights, tag meanings, rooftop support questions, manufacturer contact lookup, and code references.
- Why it belongs in USER.md: Useful for anticipating the user's common technical lookup tasks.

- Finding: Recurring interest in clean project communication and document packaging.
- Confidence: High
- Evidence: Many requests to package folders, list included files, send updated sets, and explain what has been completed.
- Why it belongs in USER.md: Helps the assistant support project management and client updates.

# 5. Recurring constraints

- Finding: Work is deadline-driven and tied to client / City submission timing.
- Confidence: High
- Evidence: Repeated references to "submit by Monday," "update the client by today," "resubmitted to the City," and quick-turn correction requests.
- Why it belongs in USER.md: Time pressure is a stable context that should shape assistant support.

- Finding: Outputs often need to be externally shareable with minimal editing.
- Confidence: High
- Evidence: Frequent requests for finished emails, status updates, correction requests, and formatted project summaries.
- Why it belongs in USER.md: The assistant should optimize for ready-to-send deliverables.

- Finding: Work depends on incomplete or changing consultant/client inputs.
- Confidence: High
- Evidence: Repeated follow-ups for missing info, updated layouts, revised CAD files, unclear sheets, and coordination with external engineers.
- Why it belongs in USER.md: This affects how the assistant should handle ambiguity and version changes.

- Finding: No durable evidence of budget constraints, device constraints, or admin-access limitations.
- Confidence: High
- Evidence: These topics do not appear in the available prior chat context.
- Why it belongs in USER.md: Better to leave blank than infer nonexistent constraints.

# 6. Working style and habits

- Finding: Typically uses the assistant for short-form external communication.
- Confidence: High
- Evidence: Many requests for follow-up emails, update emails, requests to engineers, and replies to clients.
- Why it belongs in USER.md: This is one of the clearest repeated usage patterns.

- Finding: Typically uses the assistant for technical extraction and lookup.
- Confidence: High
- Evidence: Requests to extract project info, find spec sheets, identify manufacturer contacts, explain tags, and locate code/comment language.
- Why it belongs in USER.md: This is a durable task category.

- Finding: Often works by iterating live on real documents and correspondence.
- Confidence: High
- Evidence: Multiple screenshots of email drafts, attached project files, and revision requests based on incoming comments.
- Why it belongs in USER.md: The assistant should expect active revision cycles rather than one-off static questions.

- Finding: Likely values project momentum and closing loops with consultants.
- Confidence: High
- Evidence: Repeated follow-up requests checking whether consultants are working, whether comments can be finished, and whether drawings were resubmitted.
- Why it belongs in USER.md: This reveals practical success criteria for support.

- Finding: What the user seems to care about most in outputs is accuracy, speed, submission-readiness, and minimal cleanup.
- Confidence: High
- Evidence: Repeated requests for exact technical values, polished emails, clear file lists, and correction summaries tied to deadlines.
- Why it belongs in USER.md: This is the strongest durable output preference that is user-context, not just assistant style.

# 7. Suggested USER.md fields

- Finding: Professional domains: Architecture, engineering coordination, permit response / resubmittal support, construction documentation.
- Confidence: High
- Evidence: Repeated project and document context across prior chats.
- Why it belongs in USER.md: Helps orient the assistant quickly.

- Finding: Typical tasks: email drafting, project follow-ups, consultant coordination, technical spec/code lookup, extracting project info from files, formatting status updates.
- Confidence: High
- Evidence: These are repeated throughout the available prior chat context.
- Why it belongs in USER.md: Useful for predicting support needs.

- Finding: Topics returned to often: plan check comments, structural/mechanical sheets, HVAC equipment, drawing packages, title blocks/stamps, submission status.
- Confidence: High
- Evidence: Repeated across multiple project interactions.
- Why it belongs in USER.md: Helps preserve continuity.

- Finding: Stable environment: likely California-based A/E/C office workflow using PDFs, DOCX files, CAD references, email, and file-sharing links.
- Confidence: Medium
- Evidence: Repeated file types, email work, TransferNow links, and California jurisdictions.
- Why it belongs in USER.md: Helps the assistant anticipate toolchain and document style.

# Final step: Concise USER.md candidate

## Name
- Not explicitly stated in available chat evidence.

## What to call them
- Not explicitly stated in available chat evidence.

## Pronouns
- Not explicitly stated in available chat evidence.

## Timezone
- Likely Pacific Time (inferred from California-based work context and project timezone).

## Notes
- Works in an architecture / engineering / permitting coordination context.
- Frequently manages plan check corrections, consultant follow-ups, drawing updates, and resubmittal communication.
- Often needs help turning technical/project information into ready-to-send emails and clean client/consultant updates.
- Cares most about fast, accurate, submission-ready outputs.

## Context
- Recurring domains: structural, mechanical, and architectural coordination.
- Recurring tasks: draft emails, extract project information, locate specs/codes, summarize comments, list files included in packages, and track submission status.
- Recurring project conditions: external deadlines, changing consultant inputs, client review cycles, and City correction letters.
- Likely tool environment: PDF/DOCX/CAD-centered workflow with email and file-transfer links.
- Stable constraints visible here: time-sensitive coordination and need for polished external deliverables; no clear evidence of budget/device/admin constraints.

