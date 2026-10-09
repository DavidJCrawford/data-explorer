---
type: Building Component
title: "Cloud service"
description: "The hosted 'server': multi-site views, remote management — talking down to your controllers."
tags: ["building", "cloud"]
component: cloud
layer: cloud
data_classes: ["event replicas", "backups", "remote sessions"]
articles: [4, 5, 8, 9, 11, 13, 23, 24, 25, 26, 28, 29, 30, 32, 33, 34, 35, 43]
asks: ["soc2-27001", "gdpr", "nis2"]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json (indicative article attachments)"
---

# What it is

The hosted 'server': multi-site views, remote management — talking down to your controllers.

The custody handoff, and where most of the Act concentrates: access, sharing, fair terms, switching, exit charges, jurisdiction transparency.

# Data held here

- event replicas
- backups
- remote sessions

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| [controller](controller.md) | [cloud](cloud.md) | events · commands | both ways |
| [head-end](head-end.md) | [cloud](cloud.md) | sync · backups | one way |
| [cloud](cloud.md) | [cloud-ai](cloud-ai.md) | model data | both ways |
| [web-client](web-client.md) | [cloud](cloud.md) | sessions | both ways |

# The law that attaches

[Article 4](/law/eu-data-act/articles/article-04.md), [Article 5](/law/eu-data-act/articles/article-05.md), [Article 8](/law/eu-data-act/articles/article-08.md), [Article 9](/law/eu-data-act/articles/article-09.md), [Article 11](/law/eu-data-act/articles/article-11.md), [Article 13](/law/eu-data-act/articles/article-13.md), [Article 23](/law/eu-data-act/articles/article-23.md), [Article 24](/law/eu-data-act/articles/article-24.md), [Article 25](/law/eu-data-act/articles/article-25.md), [Article 26](/law/eu-data-act/articles/article-26.md), [Article 28](/law/eu-data-act/articles/article-28.md), [Article 29](/law/eu-data-act/articles/article-29.md), [Article 30](/law/eu-data-act/articles/article-30.md), [Article 32](/law/eu-data-act/articles/article-32.md), [Article 33](/law/eu-data-act/articles/article-33.md), [Article 34](/law/eu-data-act/articles/article-34.md), [Article 35](/law/eu-data-act/articles/article-35.md), [Article 43](/law/eu-data-act/articles/article-43.md)

Attachments are the author's indicative mapping, not legal advice.

# What to ask

[soc2-27001](/law/wider-rulebook/soc2-27001.md), [gdpr](/law/wider-rulebook/gdpr.md), [nis2](/law/wider-rulebook/nis2.md)
