---
type: Concept
title: "The archive is fuel"
description: "AI can now reason over logs that once sat unread and act on them at scale, which turns old access records into a resource and a risk."
tags: [thesis, ai, data]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: article
    resource: /thesis/the-article.md
    title: "Data collection and the value of control"
---

# The claim

"Generative and agentic AI can now reason over logs that once sat dormant, and
act on them at scale. Yesterday's archive is today's fuel."[^article]

An access-control event log was written for audit and investigation, and was
mostly never read. A model can read all of it: who arrives when, which doors
are used together, which rooms empty early. It is the same data with a new
use, and it reveals patterns about people.

# Why it raises the stakes of custody

- **More value means more pull.** Data that is useful gets copied toward
  wherever the model runs.
- **Training use is a custody question.** Whether a customer's events train
  someone's model is a question about who holds a copy and on what terms.
- **Provenance becomes hard.** "By the time any of it reaches an AI model, no
  one can say with confidence where all of it lives, or who has touched it."[^article]

# The law around it

The [AI Act](/law/wider-rulebook/ai-act.md) governs what the model may do to
people (workplace emotion recognition is prohibited; biometric identification
is high-risk). [GDPR](/law/wider-rulebook/gdpr.md) governs the personal data
it consumes. The Data Act governs whether the customer can get the data back
and send it elsewhere ([Article 5](/law/eu-data-act/articles/article-05.md),
[Article 6](/law/eu-data-act/articles/article-06.md)).

# On the site

The trace ends at Cloud AI, and the ledger is at its highest there. In the
governed path the comparison point is [Local AI](/building/components/local-ai.md):
the model comes to the data, and the data does not leave.

[^article]: Data collection and the value of control
