---
type: Building Component
title: "On-prem server (head-end)"
description: "The building's system of record, inside the building."
tags: ["building", "server"]
component: head-end
layer: server
data_classes: ["event history", "people & tenancy records", "configuration"]
articles: [4, 11, 43]
asks: ["nis2", "gdpr"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

The building's system of record, inside the building.

The last hop where your own walls are the boundary. The Act says the event log is not the vendor's 'protected database' — it's your data.

# Data held here

- event history
- people & tenancy records
- configuration

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [meter](meter.md) | [head-end](head-end.md) | telemetry | one way |
| [controller](controller.md) | [head-end](head-end.md) | events · config | both ways |
| [head-end](head-end.md) | [local-ai](local-ai.md) | data · insights | both ways |
| [web-client](web-client.md) | [head-end](head-end.md) | sessions | both ways |
| [head-end](head-end.md) | [cloud](cloud.md) | sync · backups | one way |

# The law that attaches

[Article 4](/law/eu-data-act/articles/article-04.md), [Article 11](/law/eu-data-act/articles/article-11.md), [Article 43](/law/eu-data-act/articles/article-43.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[nis2](/law/wider-rulebook/nis2.md), [gdpr](/law/wider-rulebook/gdpr.md)
