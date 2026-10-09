---
type: Jurisdiction
title: "United States"
description: "No federal right to device data. California's privacy law gives people rights over their personal information, employees included since 2023."
tags: [jurisdiction, us]
jurisdiction: us
device_data_right: none
legal_review: none
rulebook:
  rights:
    yours: { status: none, note: "No general right to connected-product data in federal law." }
    share: { status: none, note: "No right to have device data sent to a third party." }
    born-open: { status: none, note: "No duty to design products so their data is accessible." }
    leave: { status: none, note: "No statutory right to switch cloud providers, and no rule against switching charges." }
    fair-terms: { status: none, note: "No data-specific rule against unfair terms between businesses." }
    borders: { status: none, note: "No duty to publish where non-personal data is held." }
    event-log: { status: none, note: "No equivalent rule." }
  asks:
    - id: us-ccpa
      name: "California Consumer Privacy Act"
      cite: "Cal. Civ. Code §1798.100 et seq., as amended by the CPRA"
      question: "Is this data about people, employees included?"
      ask: "If any occupants are California residents, which of their personal information does this system hold, and how will we answer a request to know, delete or correct it?"
      placed_like: gdpr
      phases: [{ date: 2020-01-01, what: "applies" }, { date: 2023-01-01, what: "CPRA amendments; employee and business data covered" }]
      url: "https://oag.ca.gov/privacy/ccpa"
    - { instrument: iso-42001 }
    - { instrument: soc2-27001 }
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
stale_after: "2027-04-01T00:00:00Z"
sources:
  - id: ccpa
    resource: "https://oag.ca.gov/privacy/ccpa"
    title: "California Attorney General: California Consumer Privacy Act"
---

# What applies

- **No general right** to connected-product data at federal level.
- **California.** The CCPA gives people rights to know, delete, correct and opt
  out of the sale or sharing of their personal information, and to limit the
  use of sensitive personal information. Since 1 January 2023 the exemptions for
  employee and business-to-business information have expired, so an office's
  access events about its staff are within it.[^ccpa] These are rights of the
  person the data is about, not of the building's owner.
- **EU reach.** A US manufacturer selling into the EU is bound by the EU Data
  Act for those products.

Checked 2026-10-09 against the source listed (SPEC §3.2.3). The CCPA's 2020
start date is from the statute's operative date and was not re-read here.

[^ccpa]: California Attorney General
