---
type: Building Component
title: "Air and climate sensor"
description: "Temperature, CO₂, humidity — comfort and compliance telemetry."
tags: ["building", "edge"]
component: air
layer: edge
data_classes: ["environmental telemetry"]
articles: [3, 4]
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

Temperature, CO₂, humidity — comfort and compliance telemetry.

Wellness reporting and lease obligations increasingly run on this data. The Act makes it portable.

# Data held here

- environmental telemetry

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [air](air.md) | [controller](controller.md) | telemetry | one way |

# The law that attaches

[Article 3](/law/eu-data-act/articles/article-03.md), [Article 4](/law/eu-data-act/articles/article-04.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[cra](/law/wider-rulebook/cra.md)
