---
type: Concept
title: "Copies and hands"
description: "Every handoff copies the data and gives it to someone new. The trace counts both, hop by hop, and the count is the argument."
tags: [thesis, ledger, measurement]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: article
    resource: /thesis/the-article.md
    title: "Data collection and the value of control"
---

# The idea

"Every handoff copies the data and hands it to someone new. Accountability
blurs, and exposure grows."[^article] Two quantities follow, and the trace's
ledger keeps a running count of both:

| Measure | Counts | Why it matters |
| --- | --- | --- |
| **Copies** | Places where a durable copy of the event exists: a log, a database, a replica, a backup, a training set | Each copy is something to secure, retain, delete and produce on request |
| **Hands** | Distinct organisations whose product or service holds a copy | Each is a party who must answer a request, and whose word the rest depend on |
| **Seams** | Hops where the data passes from one organisation to another | Where [custody claims break](/thesis/custody-seams.md) |
| **Jurisdictions** | Legal territories a copy sits in | Where foreign access becomes a question ([Article 28](/law/eu-data-act/articles/article-28.md), [Article 32](/law/eu-data-act/articles/article-32.md)) |

The customer and a recipient the customer chose are counted, but shown apart:
they are hands by right, not by architecture.

# Definitions that keep the count honest

- A **transient** buffer (a reader holding an event for milliseconds before
  passing it on) is not a copy. A store with a retention period is.
- A backup in the same system is a copy. Encryption does not remove a copy; it
  changes who can read it, and the ledger says so in a note, not a number.
- A sub-processor (hosting, under contract to the vendor) is a hand. A steward
  running on a hyperscaler has at least two hands, not one.

# The numbers are illustrative

The counts belong to two [archetypes](/thesis/the-two-archetypes.md), not to any
measured system. The values the trace uses are fixed in
[the trace](/building/the-trace.md) and the page states that they are
illustrative. See [illustrative, not measured](/policies/illustrative-not-measured.md).

# The closing line

"Advantage won't go to whoever collects the most. It will go to whoever can
account for all of it."[^article] The ledger's final frame is that accounting.

[^article]: Data collection and the value of control
