---
type: Model
title: "Flows"
description: "Every data flow in the building, from component to component, with what it carries."
tags: [building, flows]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/building.json"
    title: "stewardship-explorer building.json"
---

# Flows

| From | To | Carries | Direction |
| --- | --- | --- | --- |
| door | controller | events | both |
| occupancy | controller | presence | one way |
| air | controller | telemetry | one way |
| meter | head-end | telemetry | one way |
| controller | head-end | events · config | both |
| head-end | local-ai | data · insights | both |
| web-client | head-end | sessions | both |
| controller | cloud | events · commands | both |
| head-end | cloud | sync · backups | one way |
| cloud | cloud-ai | model data | both |
| web-client | cloud | sessions | both |
| cloud | third-party | shared data, at the owner's request | one way |
| camera | head-end | video, to the on-site recorder | one way |
| head-end | cloud | video archive (composite stack only) | one way |

The last three rows are new in this project. The rest come from the prototype.
Flows that cross the [property line](/building/the-building.md) are drawn heavier.
