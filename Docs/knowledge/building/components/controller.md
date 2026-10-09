---
type: Building Component
title: "Building controller"
description: "The deterministic heart: schedules, interlocks, decisions — online or not."
tags: ["building", "control"]
component: controller
layer: control
data_classes: ["decisions", "device cache", "event log"]
articles: [3, 4]
asks: ["cra", "nis2"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

The deterministic heart: schedules, interlocks, decisions — online or not.

Where edge data concentrates and commands originate. Who made this box, and who answers for its firmware, decides where design duties land.

# Data held here

- decisions
- device cache
- event log

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [door](door.md) | [controller](controller.md) | events | both ways |
| [occupancy](occupancy.md) | [controller](controller.md) | presence | one way |
| [air](air.md) | [controller](controller.md) | telemetry | one way |
| [controller](controller.md) | [head-end](head-end.md) | events · config | both ways |
| [controller](controller.md) | [cloud](cloud.md) | events · commands | both ways |

# The law that attaches

[Article 3](/law/eu-data-act/articles/article-03.md), [Article 4](/law/eu-data-act/articles/article-04.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[cra](/law/wider-rulebook/cra.md), [nis2](/law/wider-rulebook/nis2.md)
