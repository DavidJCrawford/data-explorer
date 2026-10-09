---
type: Building Component
title: "Web client"
description: "The FM team's browser, talking straight to the on-prem server."
tags: ["building", "client"]
component: web-client
layer: client
data_classes: ["dashboards", "operator actions"]
articles: [4, 5, 13]
asks: []
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

The FM team's browser, talking straight to the on-prem server.

Where you exercise the rights the Act gives you — or discover the vendor hasn't built the door.

# Data held here

- dashboards
- operator actions

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [web-client](web-client.md) | [head-end](head-end.md) | sessions | both ways |
| [web-client](web-client.md) | [cloud](cloud.md) | sessions | both ways |

# The law that attaches

[Article 4](/law/eu-data-act/articles/article-04.md), [Article 5](/law/eu-data-act/articles/article-05.md), [Article 13](/law/eu-data-act/articles/article-13.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

Nothing from the wider rulebook attaches here.
