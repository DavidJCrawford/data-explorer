---
type: Building Component
title: "Smart lock and reader"
description: "A door that reports and obeys: state, events, commands."
tags: ["building", "edge"]
component: door
layer: edge
data_classes: ["lock/unlock events", "door state"]
articles: [3, 4]
asks: ["cra", "gdpr"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

A door that reports and obeys: state, events, commands.

A connected product in the Act's exact sense — from September 2026 it must be born with its data accessible to you by design.

# Data held here

- lock/unlock events
- door state

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [door](door.md) | [controller](controller.md) | events | both ways |

# The law that attaches

[Article 3](/law/eu-data-act/articles/article-03.md), [Article 4](/law/eu-data-act/articles/article-04.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[cra](/law/wider-rulebook/cra.md), [gdpr](/law/wider-rulebook/gdpr.md)
