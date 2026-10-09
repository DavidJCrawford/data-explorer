---
type: Art Direction
title: "The section drawing"
description: "The trace's stage: a street-level section through the office, the ground and the buildings its data reaches, drawn in the instrument palette and moved through by a camera that follows the event."
tags: [design, art-direction, trace, svg]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: tlj_spec
    resource: "https://github.com/DavidJCrawford/the-longest-journey/blob/main/Docs/SPEC.md"
    title: "The Longest Journey SPEC §4: the journey"
---

# The idea

The Longest Journey follows a boat down a map. This follows a door event out
of a building. The map is replaced by an **architectural section** cut along
a street: the office, the ground beneath it with its buried ducts, and the
buildings the data reaches, each drawn in hairline as an architect would.

"Drafted like an architect" survives from the prototype; the node graph does
not.

# Why a section

- **Place, not topology.** A node graph says what connects to what. A section
  says where things physically are, which is what a facilities manager knows
  and what the property line means.
- **Real routes.** Cables go where cables go: through ceiling voids, down the
  riser, out through the cable entry and along ducts under the street. The
  cloud is a building somewhere, not a shape in the sky
  ([decision](/decisions/underground-and-simpler.md)).
- **It can be drawn at build time.** SVG generated from the geometry in
  `site/src/lib/section.ts`, animated at runtime by moving the viewBox. No
  WebGL, no map tiles, no runtime dependency.

# The camera

As in The Longest Journey: the camera frames the event set back from the
centre opposite its direction of travel, so the view is mostly of what comes
next; it stays on the drawing; it brakes into each stop at constant
deceleration; and at the end it pulls back to the whole street with the
ledger's totals. The event runs faster in the ducts than in the buildings.

# What is drawn and what is not

- **The office, kept simple**: three storeys, the entrance with its reader and
  camera, the controller in the riser, the comms room with its rack (the
  server, local AI, the video recorder). Nothing else in the building is
  drawn; the rest is in the knowledge base and the rulebook.
- **The other sites**: a data centre (raised floor, rack rows, chillers on
  the roof), an AI data centre (denser, taller racks and a cooling tower) and
  the third party's two-storey office.
- **The ground**: hatched earth, ducts at two depths, and a break mark with
  "Kilometres apart" between each pair of sites. Each building is to its own
  scale; the distances between them are not.
- The event is a single gold mark. Copies are left behind as small marks
  where the event has been. Seams are a short red tick across the cable, with
  the two makers' letters either side. The property line is the heaviest line
  in the drawing, and the data crosses it underground.
- No people are drawn. The event is about a person; drawing one would make it
  about a particular one.

# As built (2026-10-09, revised)

- Office 20 m deep; 4.5 m ground floor and 3.6 m upper floors; 300 mm slabs.
  Riser 1.4 m wide with a lane for each run that shares it.
- Ducts at 1.2 m below ground (the trunk) and 2.2 m (the run to the third
  party, under the AI data centre).
- Working zoom: 12 m across on a phone, 45 px a metre on anything wider. Type
  is in metres: labels 0.46 m, the smallest text 0.30 m.
- Every component on the trace, the camera and the local-AI alternative must
  have a place in the drawing, or the build fails.
- Review at `/draft/section/`, built only by `make drafts`.

# Prior attempts this replaces

The prototype's node graph, and this project's first section, which stacked
a four-storey office under a diagram of the cloud
([decision](/decisions/underground-and-simpler.md)).
