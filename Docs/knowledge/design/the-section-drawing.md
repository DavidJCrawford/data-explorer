---
type: Art Direction
title: "The drawing"
description: "The trace's stage: an exploded isometric of the office, floor by floor, and the lots its data reaches, with the route drawn like an architect's circulation diagram, white on black."
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
of a building. The map is replaced by an **exploded isometric**: the office's
floors pulled apart and stacked, each a plate with a heavy outline and walls
cut low, and the lots its data reaches laid out beyond it. The route is drawn
the way architects draw circulation: bold and solid across a floor, dotted
where it drops between floors, with a ring at each stop
([decision](/decisions/exploded-isometric.md)).

White on black, unlike the reference drawings.

# Why

- **Place, not topology.** A node graph says what connects to what. A drawing
  of the building says where things physically are, which is what a
  facilities manager knows and what the property line means.
- **Every floor at once.** Exploding the floors shows where the event is on
  each one without cutting the building open.
- **Real routes.** Cables go where cables go: across a floor, up or down the
  riser, out through a buried duct to buildings somewhere else
  ([decision](/decisions/underground-and-simpler.md)).
- **Built at build time.** A 3D model in metres (`site/src/lib/section.ts`)
  projected isometrically to SVG once; the camera moves by changing the
  viewBox. No WebGL, no runtime dependency.

# What is drawn

- **The office**: three plates (ground, level 1, level 2) 13 m apart, dotted
  guides at the corners. The entrance with its reader and camera, the riser
  cupboard with the controller on every floor, desks to read as an office,
  and the comms room on level 2 with its rack (server, local AI, video
  recorder). Floor names run along each plate's front edge.
- **The lots**: the office's lot below it, its dashed outline the property
  line; a lot each for the data centre (rack rows), the AI data centre
  (denser, taller rows) and the third party's office.
- **The ducts**: below the lots, joining them, with "Kilometres apart" breaks.
  Plan dimensions are true; heights and the distances between sites are not.
- **The routes**: the event's in gold once travelled, linework before; the
  camera footage in violet, dashed. Drops are dotted.
- **Labels** in the instrument's type, each with a leader to what it names.
  No people are drawn.

# The camera

As in The Longest Journey: the camera frames the event set back from the
centre opposite its direction of travel, stays on the drawing, brakes into
each stop at constant deceleration, and at the end pulls back to the whole
composition. Working zoom: 16 drawing units across a phone, 32 px a unit on
anything wider. The event runs faster on drops and in ducts.

# Rules

- Plates are opaque and drawn bottom up, and what stands on a plate is drawn
  back to front, so nearer things hide farther ones. Routes are drawn over
  everything, so they always read.
- Every component on the trace, the camera and the local-AI alternative must
  have a place in the model, or the build fails.
- Review at `/draft/section/`, built only by `make drafts`.

# Prior attempts this replaces

The prototype's node graph; this project's first section, a four-storey
office under a diagram of the cloud; and the street section of the first
refinement round.
