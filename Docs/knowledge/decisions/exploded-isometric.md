---
type: Decision
title: "An exploded isometric, with routes like a circulation diagram"
description: "The trace's drawing becomes an exploded isometric of the office, floors pulled apart, with the event's route drawn across and between them the way architects draw circulation. White on black."
tags: [decision, design, trace]
decided_by: human:davidjcrawford
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
verified: { by: human:davidjcrawford, at: "2026-10-09T00:00:00Z" }
status: stable
---

# Decision

David, 2026-10-09, the second round of refining the trace, from two
references: an exploded isometric of an office with its floors separated and
labelled, and an architectural circulation diagram with bold coloured routes,
dotted drops between floors, ring markers at junctions and heavy outlines on
every floor plate.

1. **Swap the section for an exploded isometric.** The office's three floors
   are drawn as separate plates, pulled apart, with dotted guides at the
   corners. Walls are cut low so the rooms read.
2. **Draw the route like the circulation diagram.** Bold and solid across a
   floor or along a duct; dotted where it drops between floors; a ring at
   each stop.
3. **Heavy outlines on the plates**, as in the second reference.
4. **White on black**, unlike both references.

# Consequences

- The geometry is a 3D model in metres, projected isometrically once at build
  time. Plan dimensions are true; heights are exploded (the office's floors
  are drawn 13 m apart, and the lots and ducts are pulled down below them).
  The trace's engine, counts, cards, ledger and URLs are unchanged.
- Round 1's realism survives: the data still leaves down the riser,
  underground through a buried duct, to physical buildings, each now drawn
  as a floor plate on its own lot, with "Kilometres apart" breaks in the
  ducts. The office's lot outline is the property line.
- The travelled route is drawn segment by segment, so drops between floors
  stay dotted as the event passes them.
- The event moves faster on drops and in ducts.

Supersedes the street section in
[a simpler building, and cables underground](/decisions/underground-and-simpler.md),
whose simplification and underground route it keeps.
