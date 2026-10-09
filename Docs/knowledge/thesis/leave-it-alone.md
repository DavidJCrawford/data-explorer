---
type: Concept
title: "Leave it alone"
description: "A trustworthy system knows what not to collect or move: the most sensitive streams stay separate, under the customer's own control."
tags: [thesis, minimisation, sensitive-data]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: article
    resource: /thesis/the-article.md
    title: "Data collection and the value of control"
  - id: gdpr
    resource: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
    title: "Regulation (EU) 2016/679, Articles 5(1)(c) and 9"
---

# The claim

Systems worth trusting "also know what to leave alone, keeping the most
sensitive streams separate, under the customer's own control."[^article]

# Which streams

In a connected building, the streams that say most about people:

- **Video**, especially where analytics run on it.
- **Biometric templates** used for identification. These are special-category
  personal data under GDPR Article 9 when used to identify someone.[^gdpr]
- **Fine-grained occupancy and movement**, which identifies people by pattern
  even without a name.

# What "separate" means

The stream is processed where it is captured, kept on infrastructure the
customer controls, and only derived or aggregated results leave, if anything
does. It is GDPR's data-minimisation principle applied to architecture rather
than to a policy document.

# On the site

The trace draws one sensitive stream, a camera, alongside the door event. In
the composite stack it follows the event to the cloud. In the governed path it
stops at the property line, and the ledger counts no copies or hands for it
beyond the site. This is the article's quietest idea and the trace's clearest
image. The camera was chosen over biometric templates because everyone
understands it (David, 2026-10-09; [SPEC](../../SPEC.md) §9).

[^article]: Data collection and the value of control
[^gdpr]: GDPR Articles 5(1)(c) and 9
