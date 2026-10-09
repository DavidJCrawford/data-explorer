---
type: Concept
title: "Custody seams"
description: "A seam is any point where responsibility for data crosses from one company to another. Custody claims break there."
tags: [thesis, seams, architecture]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/brain/concepts/custody-seams.md"
    title: "stewardship-explorer brain: Custody Seams"
  - id: article
    resource: /thesis/the-article.md
    title: "Data collection and the value of control"
---

# Definition

A **seam** is any point in a system where responsibility for data passes from
one company to another: a controller board running another maker's firmware, a
reader from a different manufacturer, head-end software orchestrating hardware
it didn't build, a cloud operated by someone else. "Control leaks at the
seams."[^article]

Seams are ordinary engineering. For stewardship they are weak points, for four
reasons:

- **Assurance stops.** A vendor can only vouch for what it controls. At a seam,
  "we protect your data" becomes "we're told they protect your data".
- **Obligations spread.** The Data Act's manufacturer, data-holder and
  related-service roles carry different duties. In a stack with seams those roles fall on
  different companies, and a request for data has to cross every boundary
  between them.
- **Flaws travel.** A vulnerability in a shared component ships under every
  brand that uses it, and the fix arrives on the component maker's schedule.
- **Evidence fragments.** One incident, several parties, several logs. The
  audit trail has gaps exactly where responsibility changes hands.

# The question to ask

Not "what does the vendor promise?" but **"how many seams are there between the
device and the application, and who stands on each side?"** The trace counts
them; see [copies and hands](/thesis/copies-and-hands.md).

# Seams that are not failures

Some seams are chosen and good. Sending data to a third party the customer
picked is a seam the [Data Act guarantees](/rights/share.md). A hosting
provider under a steward is a seam with a contract around it. The concept is a
way to count, not a claim that fewer is always better.

[^article]: Data collection and the value of control
