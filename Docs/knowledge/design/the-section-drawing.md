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
