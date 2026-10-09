---
type: Building Component
title: "Camera"
description: "Video of the entrance: the sensitive stream the trace draws alongside the door event."
tags: ["building", "edge", "sensitive"]
component: camera
layer: edge
data_classes: ["video", "derived analytics (if enabled)"]
articles: [3]
asks: ["gdpr", "ai-act"]
sensitive: true
legal_review: none
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: gdpr
    resource: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
    title: "Regulation (EU) 2016/679"
---

# What it is

A camera over the front entrance. It records the same moment the door event
records, in a form that says far more about the person.

# Why it is drawn

It is the sensitive stream in [Leave it alone](/thesis/leave-it-alone.md). In the
composite stack its footage follows the door event to the cloud. In the governed
path it is recorded on site, on infrastructure the customer controls, and does
not cross the property line.

# The law that attaches

A camera is a connected product, so [Article 3](/law/eu-data-act/articles/article-03.md)
applies to new models. Footage of identifiable people is personal data under
[GDPR](/law/wider-rulebook/gdpr.md); biometric identification on it is high-risk
under the [AI Act](/law/wider-rulebook/ai-act.md), and inferring emotions in a
workplace is prohibited.

# What to ask

Where is footage stored and for how long, does any analytics run on it and
where, and does any of it leave the site?
