---
type: Reference
title: "The prototype: stewardship-explorer"
description: "The July 2026 prototype whose content this project inherits: one view, three depths, a node graph of the Act over an animated building."
resource: "https://github.com/DavidJCrawford/stewardship-explorer"
tags: [reference, prototype, lineage]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: repo
    resource: "https://github.com/DavidJCrawford/stewardship-explorer"
    title: "DavidJCrawford/stewardship-explorer"
  - id: live
    resource: "https://davidjcrawford.github.io/stewardship-explorer/"
    title: "stewardship-explorer, live"
---

# What it was

An Astro static site: a rail of seven rights over a node-laid connected building
with particles on every flow; selecting either opened a drawer with a living
mini-graph of all fifty articles, and an inner panel with the two registers.

# What was taken

| Prototype | Here |
| --- | --- |
| `act.json` (50 articles, chapters, definitions, actors, milestones) | [law/eu-data-act](/law/eu-data-act/index.md), one concept per article |
| `rights.json` (7 rights) | [rights](/rights/index.md) |
| `building.json` (10 components, 11 flows) | [building](/building/index.md), plus camera and third party |
| `standards.json` (6 instruments) | [wider rulebook](/law/wider-rulebook/index.md) |
| `brain/` concepts | [thesis](/thesis/index.md), rewritten against the article |
| DESIGN.md hardening checklist | [motion](/design/motion.md), and SPEC §7 |
| Agent parity (index.md twin, llms.txt, raw data) | SPEC §5 |

# Cleaned on the way in

- Two component vocabularies (the Act's `lights` and the building's `acts`)
  merged into one set of ids.
- References to retired features removed from article readings ("Q7's
  answer", "this project's manifest idea").
- The right with id `log` renamed `event-log`: `log.md` is reserved in OKF.
- Dates that were future in July and have now passed are noted as such.

# What it leaves undone

It was never reviewed by a lawyer or policy analyst, and this project will
not be either. Every legal concept carries `legal_review: none`; see
[legal rigour](/policies/legal-rigour.md).
