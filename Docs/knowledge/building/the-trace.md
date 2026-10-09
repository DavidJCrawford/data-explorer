---
type: Model
title: "The trace"
description: "One door event followed from the reader to the cloud, hop by hop, in two archetypes, with the ledger's counts fixed for each hop."
tags: [building, trace, ledger, spine]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
illustrative: true
# The model the ledger is computed from. The tables in the body must agree
# with it; scripts/verify.mjs recomputes every running total and checks them.
# A hand is an organisation holding a copy. A seam is counted at a hop whose
# holders include an organisation not holding the event at the hop before.
parties:
  A: "Maker A"
  B: "Maker B, a shared platform"
  C: "Software brand C"
  D: "Hosting provider D"
  E: "AI provider E"
  S: "The steward"
  R: "Recipient R, the owner's choice"
hops:
  - { n: 0, component: door, place: "Front entrance, ground floor", composite: { holders: [A], copies: 0 }, governed: { holders: [S], copies: 0 } }
  - { n: 1, component: controller, place: "Riser cupboard, ground floor", composite: { holders: [B], copies: 1 }, governed: { holders: [S], copies: 1 } }
  - { n: 2, component: head-end, place: "Comms room, level 2", composite: { holders: [C], copies: 1 }, governed: { holders: [S], copies: 1 } }
  - { n: 3, component: cloud, place: "A data centre", crosses_property_line: true, composite: { holders: [C, D], copies: 2 }, governed: { holders: [S, D], copies: 2 } }
  - { n: 4, component: cloud-ai, place: "A model provider", composite: { holders: [E], copies: 1 }, governed: { holders: [S, D], copies: 1 }, alternative: { governed: local-ai } }
  - { n: 5, component: third-party, place: "Wherever the recipient is", by_right: true, composite: { holders: [R], copies: 1 }, governed: { holders: [R], copies: 1 } }
sensitive:
  component: camera
  composite: { holders: [C, D], copies: 2, leaves_site: true }
  governed: { holders: [], copies: 1, leaves_site: false }
sources:
  - id: article
    resource: /thesis/the-article.md
    title: "Data collection and the value of control"
---

# The event

**Front entrance, 07:42.** A credential is presented at the reader on the front
door. The door unlocks. One small record, a door event, is created, and the
trace follows it until it reaches the last place it goes.

A door event is chosen because the article begins there ("every credential,
every door event"), because every building has one, and because it is personal
data that looks harmless.

# The spine

The organising axis is **distance from the door**, counted in hops, as The
Longest Journey's is distance downstream. Everything on the site has a place on
it: each component, each right, each article. If something cannot be placed on
it, it is not on the trace.

| Hop | Component | Where it is | What the event becomes |
| --- | --- | --- | --- |
| 0 | [Smart lock and reader](/building/components/door.md) | Front entrance, ground floor | A credential read and a decision requested |
| 1 | [Building controller](/building/components/controller.md) | Riser cupboard, ground floor | A decision and a line in the controller's event log |
| 2 | [On-prem server (head-end)](/building/components/head-end.md) | Comms room, level 2 | A row in the system of record, joined to a person and a tenancy |
| — | *The property line* | | *The event leaves the building* |
| 3 | [Cloud service](/building/components/cloud.md) | A data centre | A replica, and a backup of the replica |
| 4 | [Cloud AI](/building/components/cloud-ai.md) | A model provider | A model input, possibly training data |
| 5 | [Third party (your choice)](/building/components/third-party.md) | Wherever the recipient is | A copy delivered at the owner's request |

# Who holds each hop

Makers are lettered, never named. See [archetypes only](/policies/archetypes-only.md).

| Hop | Composite stack | Governed path |
| --- | --- | --- |
| 0 Reader | Maker A | The steward |
| 1 Controller | Maker B (a shared platform) | The steward |
| 2 Head-end | Software brand C | The steward |
| 3 Cloud | Brand C's service, hosted by D | The steward's service, hosted by D |
| 4 Cloud AI | AI provider E | The steward's model, hosted by D |
| 5 Third party | Recipient R, the owner's choice | Recipient R, the owner's choice |

# The ledger, hop by hop

Running totals after each hop, using the definitions in
[copies and hands](/thesis/copies-and-hands.md). Numbers in brackets are hands
or seams the owner chose.

| After hop | Composite: copies · hands · seams | Governed: copies · hands · seams |
| --- | --- | --- |
| 0 Reader | 0 · 0 · 0 | 0 · 0 · 0 |
| 1 Controller | 1 · 1 (B) · 1 (A→B) | 1 · 1 (S) · 0 |
| 2 Head-end | 2 · 2 (+C) · 2 | 2 · 1 · 0 |
| 3 Cloud | 4 · 3 (+D) · 3 | 4 · 2 (+D) · 1 |
| 4 Cloud AI | 5 · 4 (+E) · 4 | 5 · 2 · 1 |
| 5 Third party | 6 · 4 (+1) · 4 (+1) | 6 · 2 (+1) · 1 (+1) |

**The finding the counts make.** Both archetypes end with the same number of
copies. The data is copied as it travels whatever the architecture. What
differs is how many organisations hold those copies and how many times the data
changes hands without the owner choosing it: four against two hands, four
against one seam. The article's "fewer hands" is the measurable difference.
"Fewer copies" is not, and the site must not imply it.

# The sensitive stream

The camera over the same door records the same moment.

| | Composite stack | Governed path |
| --- | --- | --- |
| Where footage is kept | On-site recorder, then the cloud archive | On-site recorder only |
| Copies | 2 | 1 |
| Hands | 2 (C, D) | 0 beyond the customer |
| Leaves the site | Yes | No |

# Jurisdictions

Where copies sit is a property of a deployment, not of an archetype. The trace
places both clouds in an EU region by default and does not vary it by
archetype. [Article 28](/law/eu-data-act/articles/article-28.md) makes the
provider publish where its infrastructure is, and [Article 32](/law/eu-data-act/articles/article-32.md)
requires protection from unlawful foreign governmental access, in either
archetype.

# What the owner is owed at each hop

Drawn from each right's `attaches_to`. The stop card at each hop lists these.

| Hop | Rights |
| --- | --- |
| 0 Reader | [Yours to take](/rights/yours.md), [Born open](/rights/born-open.md) |
| 1 Controller | [Born open](/rights/born-open.md) |
| 2 Head-end | [Yours to take](/rights/yours.md), [The event log is yours](/rights/event-log.md) |
| 3 Cloud | [Yours to take](/rights/yours.md), [Share it](/rights/share.md), [Leave](/rights/leave.md), [Fair terms](/rights/fair-terms.md), [Borders](/rights/borders.md), [The event log is yours](/rights/event-log.md) |
| 4 Cloud AI | [Leave](/rights/leave.md), [Borders](/rights/borders.md) |
| 5 Third party | [Share it](/rights/share.md), with the recipient's [Article 6](/law/eu-data-act/articles/article-06.md) duties |

# Hop 4 in the governed path

Cloud AI stays on the spine in both archetypes, so the hop count is the same
and the comparison is fair (David, 2026-10-09). The hop 4 card in the governed
path shows [Local AI](/building/components/local-ai.md) as the alternative:
the model runs in the comms room, the event never crosses the property line
for it, and the ledger would stop at 2 · 1 · 0 after hop 2. The card says
that in words; the ledger does not switch to it.

# Status

Illustrative. The counts are a model of two archetypes and are stated as such
on the page. One question is still open and is answered in the author's own
reading, marked as such: whether the head-end counts as a related service
(see [definitions](/law/eu-data-act/definitions.md)).
