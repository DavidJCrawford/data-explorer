---
type: Reference
title: "The actors of the EU Data Act"
description: "Seven roles the Act binds or empowers, and who plays them in a connected building."
tags: [eu-data-act, actors, roles]
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: eli
    resource: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng"
    title: "Regulation (EU) 2023/2854"
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/act.json"
    title: "stewardship-explorer act.json"
---

# Roles

| Role | Plain reading |
| --- | --- |
| Manufacturer | Makes the connected product (or provides the related service). Owns the design duties. |
| Data Holder | The party entitled or obliged to use and make available the data — in practice, usually the vendor operating the product's data services. |
| User | The natural or legal person that owns, rents or leases the connected product or receives the related service. The customer. The governor of the data. |
| Third Party / Data Recipient | Whoever the user designates to receive the data — a service provider, an analyst, or the vendor's competitor. |
| Data Processing Service Provider | Cloud and edge services (IaaS/PaaS/SaaS). Bound by the switching chapter. |
| Public Sector Body | May demand data only on exceptional need (Ch. V), with duties of its own. |
| Competent Authority / Data Coordinator | Member-state enforcement: complaints, remedies, penalties (Ch. IX). |

# Roles land on companies

In a [governed path](/thesis/the-two-archetypes.md) the manufacturer, the data holder and the related-service provider are usually one company. In a [composite stack](/thesis/the-two-archetypes.md) they land on different companies, and the user's request has to cross every [seam](/thesis/custody-seams.md) between them.
