---
type: Building Component
title: "Occupancy sensor"
description: "Presence, movement, room utilisation — the building watching itself."
tags: ["building", "edge"]
component: occupancy
layer: edge
data_classes: ["presence events", "utilisation counts"]
articles: [3, 4]
asks: ["gdpr", "cra"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

Presence, movement, room utilisation — the building watching itself.

Occupancy data looks innocent and is personal-adjacent: it reveals patterns of people. Design duties and access rights both attach.

# Data held here

- presence events
- utilisation counts

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [occupancy](occupancy.md) | [controller](controller.md) | presence | one way |

# The law that attaches

[Article 3](/law/eu-data-act/articles/article-03.md), [Article 4](/law/eu-data-act/articles/article-04.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[gdpr](/law/wider-rulebook/gdpr.md), [cra](/law/wider-rulebook/cra.md)
