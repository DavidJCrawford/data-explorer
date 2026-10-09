---
type: Building Component
title: "Energy meter"
description: "Consumption telemetry, the building's heartbeat in kilowatt-hours."
tags: ["building", "edge"]
component: meter
layer: edge
data_classes: ["consumption telemetry", "demand profiles"]
articles: [3, 4, 5]
asks: ["cra"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

Consumption telemetry, the building's heartbeat in kilowatt-hours.

Meter data is the classic Data Act example: yours to take, yours to hand to a rival energy optimiser.

# Data held here

- consumption telemetry
- demand profiles

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [meter](meter.md) | [head-end](head-end.md) | telemetry | one way |

# The law that attaches

[Article 3](/law/eu-data-act/articles/article-03.md), [Article 4](/law/eu-data-act/articles/article-04.md), [Article 5](/law/eu-data-act/articles/article-05.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[cra](/law/wider-rulebook/cra.md)
