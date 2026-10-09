---
type: Policy
title: "Motion"
description: "The siblings' motion policy, applied: chrome under 0.18 s, the trace as content motion that is always pausable and scrubbable, and a static frame per hop under reduced motion."
tags: [design, motion, accessibility, reduced-motion]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: f1_motion
    resource: "https://github.com/DavidJCrawford/f1-analysis/blob/main/Docs/knowledge/policies/motion-policy.md"
    title: "F1 Analysis: motion policy"
---

# The split, applied

| | Chrome | Content |
| --- | --- | --- |
| Here | Buttons, panels, stop cards fading, drawer in the rulebook | The event travelling, the camera, the copies appearing, the time scrubber in the rulebook |
| Budget | 0.18 s ceiling | Exempt; user-started and scrubbable, never looping on its own |
| Reduced motion | Instant state change | One static frame per hop, stepped with Next/Previous; the ledger and cards unchanged |

The test from F1: if the motion were removed, would the reader lose
information? The event moving between hops is information (where the data
goes, in what order). Particles drifting along every conduit, as in the
prototype, are not, and do not ship. Background streams are drawn still, with
at most a slow dash offset that stops under reduced motion.

# Lessons carried over, not optional

- `requestAnimationFrame` stops on hidden tabs and in the browser pane. Never
  gate a transition on it; force a reflow. Keep state converging on a
  throttled timer while hidden.
- Brake into a stop with one formula: max speed √(2ad); ease up from rest.
- Wait about 450 ms after arriving before a card fades in, so the camera has
  settled.
- Decoration never intercepts the pointer.
