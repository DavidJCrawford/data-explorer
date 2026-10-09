---
type: Art Direction
title: "The section drawing"
description: "The trace's stage: an architectural section through the building, the cloud above it, drawn in the instrument palette and moved through by a camera that follows the event."
tags: [design, art-direction, trace, svg]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: tlj_spec
    resource: "https://github.com/DavidJCrawford/the-longest-journey/blob/main/Docs/SPEC.md"
    title: "The Longest Journey SPEC §4: the journey"
---

# The idea

The Longest Journey follows a boat down a map. This follows a door event up a
building. The map is replaced by an **architectural section**: the building
cut vertically and drawn in hairline, as an architect would draw it, with
floors, the riser, the comms room and the roof. Above the roof, beyond the
property line, the cloud is drawn as distant structures at a smaller scale,
with the third party off to one side.

"Drafted like an architect" survives from the prototype; the node graph does
not.

# Why a section

- **Vertical is the spine.** Ground to cloud reads as up, as people already
  think of it, and a section is tall, so a phone held upright shows it well.
- **Place, not topology.** A node graph says what connects to what. A section
  says where things physically are, which is what a facilities manager knows
  and what the property line means.
- **It can be drawn at build time.** SVG generated from the
  [building model](/building/the-building.md), animated at runtime by moving
  the viewBox. No WebGL, no map tiles, no runtime dependency.

# The camera

As in The Longest Journey: north is up (here, the cloud is up), the camera
frames the event set back from the centre opposite its direction of travel so
the view is mostly of what comes next, brakes into each hop at constant
deceleration, and at the end pulls back to the whole section with the ledger's
totals.

# What is drawn and what is not

- Components are drawn as small, specific symbols (a door leaf with a reader, a
  rack, a controller enclosure), labelled in mono, never icons from a set.
- Flows are drawn as conduits along the building's real routes (up the riser,
  along the ceiling void), not straight lines between nodes.
- The event is a single gold mark. Copies are left behind as small marks where
  the event has been. They are the ledger made visible.
- Seams are a short red tick across the conduit, with the two makers' letters
  either side.
- The property line is the heaviest line in the drawing.
- No people are drawn. The event is about a person; drawing one would make it
  about a particular one.

# Prior attempts this replaces

The prototype's node graph (force layout, goo hover, anchored components) and
the living mini-graph of the Act. See [retire the node graph](/decisions/retire-the-node-graph.md).

# As built (phase 3, 2026-10-09)

The geometry lives in `site/src/lib/section.ts`, in metres; the drawing in
`site/src/components/Section.astro`, rendered at build time.

- **To scale inside the property line.** 28 m deep in section; 4.5 m ground
  floor, 3.6 m upper floors, a 300 mm slab and a 600 mm ceiling void; a
  hatched lift and stair core with the riser beside it; plant on the roof.
- **Cables follow real routes**: up into the ceiling void, along it, into the
  riser, up or down the riser. Runs that share the riser have their own lanes.
- **The data leaves upward, and the drawing says that part is a diagram.** In
  a real building the external connection usually enters underground. Drawing
  it that way would send the event down and then up again. Instead the event
  rises through the riser and out through the top of the property line, and
  a scale break marked "Beyond this line, not to scale" sits between the
  building and the cloud. Nothing above it is at a true size or distance.
- **Working zoom**: 12 m across on a phone (about 31 px a metre), 24 m across
  in the laptop stage (about 45 px a metre). Type is set in metres so it reads
  at those zooms: labels 0.46 m, the smallest text 0.30 m. At the whole-drawing
  overview, labels are too small to read; phase 4 handles that.
- **Every component in the knowledge base must have a place in the drawing.**
  The build fails if one does not.
- **Review** at `/draft/section/`, built only by `make drafts`.
