---
type: Building Component
title: "Local AI"
description: "Models that never leave the building: occupancy analytics, fault prediction."
tags: ["building", "server"]
component: local-ai
layer: server
data_classes: ["derived insights", "model inputs"]
articles: [4, 11]
asks: ["ai-act", "iso-42001"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

Models that never leave the building: occupancy analytics, fault prediction.

AI without the custody handoff: the data and the model share a room. The training-use question has a short answer here.

# Data held here

- derived insights
- model inputs

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [head-end](head-end.md) | [local-ai](local-ai.md) | data · insights | both ways |

# The law that attaches

[Article 4](/law/eu-data-act/articles/article-04.md), [Article 11](/law/eu-data-act/articles/article-11.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[ai-act](/law/wider-rulebook/ai-act.md), [iso-42001](/law/wider-rulebook/iso-42001.md)
