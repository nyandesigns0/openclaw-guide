# USER Extraction Notes

This document records the consolidation process from 41 source markdown files into the final `USER.md`.

## Sources Reviewed
- `md/user/user.md`
- `md/user/user (1).md` through `md/user (13).md`
- `md/user/user_md_extraction.md`
- `md/user/user_md_findings_for_aas.md`
- `md/user/user_md_profile_report.md`
- ... and 24 other extraction/analysis files in the `md/user/` directory.

## Classification Decisions

### Kept Items (Classified as USER)
- **Identity**: Shiv D. Talwar, AIA. This was explicitly found in signatures and email blocks across several files (e.g., `user (3).md`, `user.md`).
- **Domain Context**: Multi-domain profile (Architecture/AEC + Software Development). This explains the diverse requests ranging from "setback requirements" to "Clerk RBAC integration."
- **Response Preferences**: "Concise," "Surgical edits," and "Forwarding-ready." These are stable preferences for how the user wants to be helped.
- **Strategic Constraints**: SEO preservation on the main domain and secure token handling. These are durable architectural decisions the user has repeatedly defended.
- **Recurring Projects**: 3262 Forest Meadow Dr, AAS, SemiChan, and Financior. These provide immediate context for incoming tasks.

### Dropped Items
- **Transient Session Notes**: Specific one-off questions about a particular door schedule or a single email draft that didn't establish a pattern were omitted to keep the file "high-signal."
- **Raw Evidence Logs**: The long lists of "Confidence/Evidence" blocks were summarized into facts.
- **Workflow Instructions**: Specific "Step 1, Step 2" for a one-time task were excluded as they aren't "stable context."
- **Tool Definitions**: Precise tool parameter schemas (belong in `TOOLS.md`).

### Items Reassigned (Potential SOUL.md / IDENTITY.md)
- **Agent Temperament**: Notes about the agent being "empathetic" or "patient" were excluded as they belong in `SOUL.md`.
- **Agent Role**: Instructions like "You are a senior engineer" were captured as a *User Preference* (how the user likes to be helped) rather than a definition of the agent itself (which belongs in `IDENTITY.md`).

## Conflict Resolution

- **Name**: Some files (e.g., `user (10).md`) stated the name was "Unknown." However, `user (3).md` and `user.md` provided "Shiv D. Talwar" with high confidence from signatures and email blocks. I resolved this by including the name as the definitive identity.
- **Working Style**: There was a slight tension between "Architecture first" and "Fast production." I resolved this by categorizing "Architecture first" as the *Problem Solving* preference and "Fast production" as the *Response Style* preference.

## Notes for Future Maintenance
- If the user explicitly changes their preferred stack (e.g., moves away from Tailwind), the **Constraints** section should be updated.
- New major projects should be added to **Active Projects** to maintain high-signal context.
