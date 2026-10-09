---
type: Design Foundation
title: "Design inheritance"
description: "The design system comes from F1 Analysis through NFL Analysis and The Longest Journey, unchanged. This project adds tokens; it does not edit them."
tags: [design, tokens, inheritance]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: f1_design
    resource: "https://github.com/DavidJCrawford/f1-analysis/tree/main/Docs/knowledge/design"
    title: "F1 Analysis knowledge: design"
  - id: tlj_tokens
    resource: "https://github.com/DavidJCrawford/the-longest-journey/blob/main/site/src/styles/tokens.css"
    title: "The Longest Journey: tokens.css"
  - id: impeccable
    resource: "https://impeccable.style"
    title: "impeccable.style (the siblings' aesthetic reference)"
---

# What is inherited, unchanged

Copy `tokens.css` and `base.css` from The Longest Journey byte for byte.[^tlj_tokens]

- **Two surfaces.** A light editorial page (`--ks-paper`, oklch 97.8%) for the
  landing page and the reference pages, and a dark instrument
  (`--ks-instrument-deep`, oklch 17%) for the trace and the rulebook. The
  `.instrument` class remaps tokens in scope; there is no theme switch.
- **Neutrals with zero chroma.** Ink and paper are truly grey.
- **Two accents and one alarm, never used to encode data.** Kinpaku (gold),
  patina (teal), vermilion (alarm only).
- **Type.** Albert Sans for text, Alumni Sans at weight 200 for display, JetBrains
  Mono for labels and readouts. Tabular lining figures on every number.
- **Shape of the pages.** The masthead (wordmark, two links, a hairline); the
  landing page (eyebrow, thin display title, lead, one pill button, the
  numbers on a hairline, three-up paragraphs with sources under each); the
  instrument (thin top bar with an id and a readout, a stage, a persistent panel
  on the right, thin bottom bar with play, scrubber and a sources link; stop
  cards with an Autoplay box and a countdown).
- **Motion.** The chrome/content split and the reduced-motion contract. See
  [motion](/design/motion.md).

# What this project adds

Project colours go in as new `--dse-*` tokens. See [palette](/design/palette.md).

# Why inherit rather than redesign

Three sites have paid for this system's lessons. The new site should look like
a sibling: a reader who has seen The Longest Journey should know how to use
the trace before they press play.

[^tlj_tokens]: The Longest Journey tokens.css
