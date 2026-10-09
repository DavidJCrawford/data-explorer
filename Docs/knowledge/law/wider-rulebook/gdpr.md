---
type: Instrument
title: "GDPR"
description: "Is this data about people?"
resource: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
tags: ["wider-rulebook", "regulation"]
kind: regulation
cite: "Regulation (EU) 2016/679"
attaches_to: ["cloud", "cloud-ai", "door", "head-end", "occupancy"]
legal_review: none
# Dated phases, for the rulebook's time axis. verify checks them against
# the Dates table below.
phases:
  - { date: 2018-05-25, what: "applies" }
stale_after: "2027-04-01T00:00:00Z"
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
sources:
  - id: gdpr
    resource: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
    title: "Regulation (EU) 2016/679"
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/src/data/standards.json"
    title: "stewardship-explorer standards.json (dates verified 2026-07-06)"
---

# The question it answers

**Is this data about people?**

The EU's personal-data law: any information about an identifiable person, wherever it flows.

# For a facilities manager

Lock events and occupancy counts can reveal who was where, and when — that makes them personal data. The Data Act steps back wherever the GDPR applies: your new data rights never override anyone's privacy rights. Expect to be the controller of your building's people-data, with the vendor processing it under your instructions.

# The ask

> Which of this system's data classes are personal data, who is controller and who is processor for each — and where is the processing agreement?

# Dates

| Date | What |
| --- | --- |
| 2018-05-25 | applies |
