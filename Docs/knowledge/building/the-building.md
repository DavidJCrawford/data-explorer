---
type: Model
title: "The building"
description: "The generic connected building the trace runs through: a four-storey office, drawn as an architectural section, with the property line as the custody boundary."
tags: [building, setting]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json"
---

# The setting

A generic four-storey office building with tenants, a facilities team and a
mix of systems: access control, occupancy sensing, energy metering and air
quality. It is deliberately not a security showcase. The audience runs
buildings; the door is one system among several.

# Where things are

| Place | Holds |
| --- | --- |
| Front entrance, ground | [Smart lock and reader](/building/components/door.md), [Camera](/building/components/camera.md) |
| Riser cupboard, ground | [Building controller](/building/components/controller.md) |
| Floors 1–3 | [Occupancy sensors](/building/components/occupancy.md), [Air and climate sensors](/building/components/air.md) |
| Main switchboard, ground | [Energy meter](/building/components/meter.md) |
| Comms room, level 2 | [On-prem server (head-end)](/building/components/head-end.md), [Local AI](/building/components/local-ai.md), the video recorder |
| FM office, level 1 | [Web client](/building/components/web-client.md) |
| Beyond the property line | [Cloud service](/building/components/cloud.md), [Cloud AI](/building/components/cloud-ai.md), [Third party](/building/components/third-party.md) |

# The property line

The one boundary drawn heavier than the rest. Inside it the building's own
walls are the custody boundary; outside it, custody is a contract. Every flow
that crosses it is marked, and the ledger notes the crossing.

# The other streams

Occupancy, energy and air data run through the same controller and head-end
and are drawn as quiet background flows while the door event is followed.
They carry the same rights. They are there so the drawing reads as a
building rather than a door, and so the rulebook can show that the Data Act's
classic example is the meter rather than the lock. See [flows](/building/flows.md).
