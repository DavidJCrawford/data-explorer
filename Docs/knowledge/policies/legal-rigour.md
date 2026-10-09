---
type: Policy
title: "Legal rigour"
description: "No lawyer has reviewed this site. Every legal claim carries its citation, paraphrase is marked as paraphrase, and the site says plainly that it is the author's reading, not legal advice."
tags: [policy, legal, rigour, review]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/brain/decisions/the-atlas.md"
    title: "stewardship-explorer: the rigour bar"
---

# Rules

1. **Every regulatory claim carries its citation**: instrument and article.
   A sentence about the law with no citation is a defect.
2. **Two registers, visibly apart.** The precise reading is a faithful summary
   of the operative demand and is labelled as a summary, not as the statute.
   The plain reading is labelled as paraphrase.
3. **Link to the authority.** Every article links to the Official Journal text
   via ELI.
4. **No legal review, said plainly.** No lawyer or policy analyst has
   reviewed this content, and none is planned (David, 2026-10-09). Every
   legal concept carries `legal_review: none`. Instead of a review badge, every
   surface that states the law carries the disclaimer below. If a review ever
   happens, set `legal_review: reviewed` and record the reviewer in
   `verified`.
5. **Dates are checked against the text**, and time-sensitive concepts carry
   `stale_after`. A stale concept fails the build until it is re-checked.
6. **Pending law is shown as pending.** A proposal is never described as law.
   See [Digital Omnibus](/law/wider-rulebook/digital-omnibus.md).
7. **The disclaimer.** In every page footer, in the rulebook's header, on
   every article and right page, and in the trace's sources link:

   > Not legal advice. This is the author's own reading of the law, written to
   > help facilities managers ask better questions. It has not been reviewed
   > by a lawyer. For decisions, read the official text and take legal advice.
8. **Indicative mappings are labelled.** Which article attaches to which
   component is the author's reading, and the page says so.
