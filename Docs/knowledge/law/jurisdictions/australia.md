---
type: Jurisdiction
title: "Australia"
description: "No general right to device data. From 10 December 2026, privacy policies must disclose automated decisions; the Consumer Data Right is sector-based."
tags: [jurisdiction, au]
jurisdiction: au
device_data_right: sector-designations
legal_review: none
rulebook:
  rights:
    yours: { status: sector, note: "No general right. The Consumer Data Right covers designated sectors such as banking and energy retail, not building systems." }
    share: { status: sector, note: "Only in designated sectors, to accredited recipients." }
    born-open: { status: none, note: "No duty to design products so their data is accessible." }
    leave: { status: none, note: "No statutory right to switch cloud providers, and no rule against switching charges." }
    fair-terms: { status: none, note: "No data-specific rule. The general unfair contract terms regime for small businesses applies." }
    borders: { status: none, note: "No duty to publish where non-personal data is held." }
    event-log: { status: none, note: "No equivalent rule." }
  asks:
    - id: au-privacy
      name: "Privacy Act 1988"
      cite: "Privacy Act 1988, as amended by the Privacy and Other Legislation Amendment Act 2024"
      question: "Is this data about people, and does a program decide anything about them?"
      ask: "Does any software here make, or substantially support, decisions that significantly affect people, and does our privacy policy say so?"
      placed_like: gdpr
      phases: [{ date: 2014-03-12, what: "Australian Privacy Principles apply" }, { date: 2026-12-10, what: "automated-decision transparency" }]
      url: "https://www.oaic.gov.au/news/media-centre/new-resources-on-transparency-for-use-of-ai-and-automated-decision-making"
    - { instrument: iso-42001 }
    - { instrument: soc2-27001 }
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
stale_after: "2027-01-31T00:00:00Z"
sources:
  - id: oaic
    resource: "https://www.oaic.gov.au/news/media-centre/new-resources-on-transparency-for-use-of-ai-and-automated-decision-making"
    title: "OAIC: transparency for use of AI and automated decision-making"
  - id: allens
    resource: "https://www.allens.com.au/insights-news/insights/2026/06/automated-decision-making-transparency-what-app-entities-need-to-know-about-the-app-1-amendments/"
    title: "Allens: automated decision-making transparency, the APP 1 amendments"
---

# What applies

- **Privacy Act 1988.** From 10 December 2026, entities covered by the
  Australian Privacy Principles must say in their privacy policy when a
  computer program makes, or does something substantially and directly related
  to making, decisions that could significantly affect people.[^oaic] It is a
  disclosure duty, not a right to contest, and it binds APP entities, broadly
  businesses with turnover above $3 million and government agencies.[^allens]
  Automated access decisions and AI on occupancy are within its reach.
- **Consumer Data Right.** Sector-based; it does not cover building device
  data.
- **EU reach.** As for the other jurisdictions.

Checked 2026-10-09 against the sources listed (SPEC §3.2.3). Not checked:
critical-infrastructure security law, which is left out.

[^oaic]: OAIC
[^allens]: Allens
