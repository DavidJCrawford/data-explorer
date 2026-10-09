---
type: Source Text
title: "Data collection and the value of control"
description: "David J Crawford's piece for the Gallagher Security Trends Report: the short form of this project's argument."
tags: [thesis, source, article]
author: human:davidjcrawford
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
verified: { by: human:davidjcrawford, at: "2026-10-09T00:00:00Z" }
status: stable
# Not yet published by the Trends Report: the site's /knowledge/ publication
# leaves this file out until David says otherwise.
publish: false
---

# The text

Written for the Gallagher Security Trends Report, not yet published as of
2026-10-09. Reproduced verbatim; the author owns it. Nothing on the site
links to it or quotes it as published until it is; David adds the link
afterwards.

> Data has always been the quiet asset beneath security. Every credential, every
> door event, every movement is a record of how a place actually works. What's
> changed is how potent that record has become. Generative and agentic AI can now
> reason over logs that once sat dormant, and act on them at scale. Yesterday's
> archive is today's fuel.
>
> The law has caught up. Under the EU Data Act (Regulation 2023/2854), the data a
> connected product generates is the customer's to access and move. It won't be
> the last regulation of its kind. Openness — your data, in your hands — stopped
> being a differentiator the day it became a legal floor. Stewardship didn't.
>
> So the real question is no longer how much data we can collect. It's how well
> our customers can control it.
>
> Control leaks at the seams. A reader from one maker passes data to a controller
> from a second, then to a third party's head-end, then to a fourth's cloud. Every
> handoff copies the data and hands it to someone new. Accountability blurs, and
> exposure grows. By the time any of it reaches an AI model, no one can say with
> confidence where all of it lives, or who has touched it.
>
> The systems worth trusting will be the ones built for control: fewer hands, a
> single system of record, one governed path from the edge to the head-end. They
> also know what to leave alone, keeping the most sensitive streams separate,
> under the customer's own control.
>
> Advantage won't go to whoever collects the most. It will go to whoever can
> account for all of it.
>
> — David J Crawford, Product Manager

# How the project uses it

The article is the thesis; the site is the evidence. Each paragraph maps to a
concept and to a part of the experience:

| Paragraph | Concept | Where it shows |
| --- | --- | --- |
| The quiet asset; the archive is fuel | [The archive is fuel](/thesis/the-archive-is-fuel.md) | Landing lead; the trace's last hop, Cloud AI |
| The law has caught up | [Openness is the floor](/thesis/openness-is-the-floor.md) | The rulebook; the seven [rights](/rights/index.md) |
| How well customers can control it | [Data stewardship](/thesis/data-stewardship.md) | The landing page's question |
| Control leaks at the seams | [Custody seams](/thesis/custody-seams.md), [Copies and hands](/thesis/copies-and-hands.md) | The trace and its ledger |
| Fewer hands, one governed path | [The two archetypes](/thesis/the-two-archetypes.md) | The trace's archetype switch |
| Know what to leave alone | [Leave it alone](/thesis/leave-it-alone.md) | The sensitive stream that stops at the property line |
| Whoever can account for all of it | [Copies and hands](/thesis/copies-and-hands.md) | The ledger's closing totals |

The site names no vendor, the author's employer included. Once published,
the article is linked from the landing page and the sources page as its
short form. See
[archetypes only](/policies/archetypes-only.md).
