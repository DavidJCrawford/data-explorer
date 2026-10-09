---
type: Design Foundation
title: "Palette"
description: "The project's own tokens: the event, the customer's domain, the property line, the seam, and how many makers are told apart without many colours."
tags: [design, colour, tokens, encoding]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
---

# The project's tokens (proposed)

Added as `--dse-*`; the inherited palette is not edited. Values are starting
points to be checked for contrast on the instrument (3:1 for graphics, 4.5:1
for text).

| Token | Role | Starting value | Reasoning |
| --- | --- | --- | --- |
| `--dse-event` | The door event in motion | kinpaku, `oklch(84% 0.19 80)` | The boat's role in The Longest Journey: the one moving thing, warm against the dark |
| `--dse-yours` | The customer's own domain: inside the property line, recipients they chose | patina, `oklch(70% 0.12 188)` | The prototype's "you" colour, kept |
| `--dse-seam` | A seam being crossed | `--f1-corner`, `oklch(60% 0.21 28)` | Already the siblings' data red, and it clears 3:1 on the instrument where vermilion does not |
| `--dse-line` | The property line | instrument text at 45% | A drawn boundary, heavier than other linework, not a colour |
| `--dse-sensitive` | The sensitive stream | a desaturated violet, to be tested | Distinct from the event without competing with it |
| `--dse-drawing` | The building section's linework | instrument rule, `oklch(100% 0 0 / 0.12)` and steps above it | Blueprint gravity from the prototype, in the siblings' greys |

# Telling makers apart

The composite stack has five makers (A to E). They are **not** given five
colours. Each hop is labelled directly with its maker's letter, in mono, and
holder changes are marked by a seam tick in `--dse-seam`. Colour is reserved
for the meaning that matters: the event, the customer's domain, the seam.

# Rights and law

Lit articles and rights use kinpaku in the rulebook, as lit articles used the
accent in the prototype. Bands for instruments that are not yet in force are
outlined, not filled. Absence (no equivalent right in a jurisdiction) is grey
hatching with words, never empty space.
