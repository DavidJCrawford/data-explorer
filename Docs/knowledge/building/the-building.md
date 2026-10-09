---
type: Model
title: "The building"
description: "The generic connected building the trace runs through: an office with a full set of building systems, of which the drawing shows only the path the door event takes."
tags: [building, setting]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json"
---

# The setting

A generic office building with tenants, a facilities team and a mix of
systems: access control, occupancy sensing, energy metering and air quality.
It is deliberately not a security showcase. The audience runs buildings; the
door is one system among several.

# What is drawn

The drawing shows only the path the door event takes
([decision](/decisions/underground-and-simpler.md)):

| Place | Holds |
| --- | --- |
| Front entrance, ground floor | [Smart lock and reader](/building/components/door.md), [Camera](/building/components/camera.md) |
| Riser cupboard, ground floor | [Building controller](/building/components/controller.md) |
| Comms room, level 2 | [On-prem server (head-end)](/building/components/head-end.md), [Local AI](/building/components/local-ai.md), the video recorder |
| A data centre | [Cloud service](/building/components/cloud.md) |
| A model provider's data centre | [Cloud AI](/building/components/cloud-ai.md) |
| The recipient's office | [Third party](/building/components/third-party.md) |

# What is in the building but not drawn

[Occupancy sensors](/building/components/occupancy.md),
[air and climate sensors](/building/components/air.md), the
[energy meter](/building/components/meter.md) and the facilities team's
[web client](/building/components/web-client.md). Their data runs through the
same controller and server and carries the same rights; the rulebook shows
them in its "alongside" column. See [flows](/building/flows.md).

# The property line

The one boundary drawn heavier than the rest. Inside it the building's own
walls are the boundary; outside it, custody is a contract. The data crosses
it underground, in the duct from the cable entry, and the ledger notes the
crossing.

# Between the sites

The data leaves through the building's cable entry and runs in buried ducts.
The data centre, the AI data centre and the recipient's office are each
drawn to scale, but in reality they are kilometres apart, so the ground
between them carries a break mark.
