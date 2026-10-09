---
type: Instrument
title: "EU AI Act"
description: "What may the AI legally do to the people here?"
resource: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
tags: ["wider-rulebook", "regulation"]
kind: regulation
cite: "Regulation (EU) 2024/1689"
attaches_to: ["cloud-ai", "local-ai"]
legal_review: none
# Dated phases, for the rulebook's time axis. verify checks them against
# the Dates table below.
phases:
  - { date: 2025-02-02, what: "prohibited practices apply" }
  - { date: 2026-08-02, what: "transparency duties apply" }
  - { date: 2027-12-02, what: "high-risk duties apply (as deferred, May 2026 omnibus)" }
stale_after: "2027-04-01T00:00:00Z"
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: ai-act
    resource: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
    title: "Regulation (EU) 2024/1689"
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/standards.json"
    title: "stewardship-explorer standards.json (dates verified 2026-07-06)"
---

# The question it answers

**What may the AI legally do to the people here?**

The EU's product-level AI law: obligations scale with risk, from outright prohibitions to audited high-risk systems.

# For a facilities manager

Emotion recognition in workplaces has been prohibited since February 2025 — an intelligent building must not infer how its occupants feel. Biometric identification and AI safety components in critical infrastructure sit in the high-risk class, with duties applying from 2 December 2027 (deferred from August 2026 by the May 2026 omnibus; AI embedded in regulated products follows in August 2028). Transparency duties — telling people an AI is watching or deciding — apply from August 2026.

# The ask

> Which risk class does each AI feature fall into, who holds the conformity obligations — and does anything here watch, identify or score people?

# Dates

| Date | What |
| --- | --- |
| 2025-02-02 | prohibited practices apply |
| 2026-08-02 | transparency duties apply |
| 2027-12-02 | high-risk duties apply (as deferred, May 2026 omnibus) |

# Status on 2026-10-09

- Prohibited practices have applied since 2 February 2025.
- Transparency duties applied from 2 August 2026, and now apply.
- High-risk duties are deferred to 2 December 2027 by the AI omnibus
  (provisional agreement 7 May 2026). Formal adoption was reported in June
  2026; confirm publication in the Official Journal before the site states it
  as law. See [Digital Omnibus](/law/wider-rulebook/digital-omnibus.md).
