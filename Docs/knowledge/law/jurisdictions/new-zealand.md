---
type: Jurisdiction
title: "New Zealand"
description: "A consumer data right exists, sector by sector: banking since December 2025, electricity retail decided but not in force. Building device data is not designated."
tags: [jurisdiction, nz]
jurisdiction: nz
device_data_right: sector-designations
legal_review: none
rulebook:
  rights:
    yours: { status: sector, note: "No general right. The consumer data right applies only to designated sectors: banking since 1 December 2025. Electricity retail has been decided; its rules are not final." }
    share: { status: sector, note: "Only in designated sectors, to accredited recipients. Building systems are not designated." }
    born-open: { status: none, note: "No duty to design products so their data is accessible." }
    leave: { status: none, note: "No statutory right to switch cloud providers, and no rule against switching charges." }
    fair-terms: { status: none, note: "No data-specific rule against unfair terms between businesses." }
    borders: { status: none, note: "No duty to publish where non-personal data is held. The Privacy Act's rules on overseas disclosure cover personal information only." }
    event-log: { status: none, note: "No equivalent rule." }
  asks:
    - id: nz-privacy
      name: "Privacy Act 2020"
      cite: "Privacy Act 2020, as amended by the Privacy Amendment Act 2025"
      question: "Is this data about people?"
      ask: "Which of this system's data is personal information, who is responsible for it, and how are people told when it is collected from somewhere other than them (IPP 3A)?"
      placed_like: gdpr
      phases: [{ date: 2020-12-01, what: "applies" }, { date: 2026-05-01, what: "IPP 3A: notice of indirect collection" }]
      url: "https://www.legislation.govt.nz/act/public/2020/0031/latest/whole.html"
    - { instrument: iso-42001 }
    - { instrument: soc2-27001 }
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
stale_after: "2027-04-01T00:00:00Z"
sources:
  - id: cpd_act
    resource: "https://legislation.govt.nz/act/public/2025/14/en/latest/"
    title: "Customer and Product Data Act 2025"
  - id: mbie_cdr
    resource: "https://www.mbie.govt.nz/business-and-employment/business/consumer-data-right/consumer-data-right-policy-design"
    title: "MBIE: Consumer Data Right policy design"
  - id: privacy_amendment
    resource: "https://www.legislation.govt.nz/act/public/2025/53/en/latest/"
    title: "Privacy Amendment Act 2025"
  - id: bellgully_ipp3a
    resource: "https://www.bellgully.com/insights/preparing-for-ipp-3a-new-requirements-effective-1-may-2026/"
    title: "Bell Gully: IPP 3A effective 1 May 2026"
---

# What applies

- **Customer and Product Data Act 2025.**[^cpd_act] Rights apply only to sectors
  the government designates. Banking was designated from 1 December 2025; the
  government has decided to designate electricity retail, and its rules are not
  yet final.[^mbie_cdr]
- **Personal information.** The Privacy Act 2020. The Privacy Amendment Act 2025
  added IPP 3A, in force since 1 May 2026: agencies collecting personal
  information from someone other than the person must take reasonable steps to
  tell them.[^privacy_amendment][^bellgully_ipp3a] Access logs fed in from
  another system are the kind of collection it reaches.
- **EU reach.** A New Zealand manufacturer selling connected products into the
  EU is bound by the EU Data Act for those products.

# On the rulebook

Rights rows show as *sector only* (access, sharing) or *no equivalent*.

Checked 2026-10-09 against the sources listed (SPEC §3.2.3). Corrected on the
way: the first draft gave 1 July 2027 for electricity data sharing, which was a
planning date in an MBIE factsheet, not a settled one.

[^cpd_act]: Customer and Product Data Act 2025
[^mbie_cdr]: MBIE
[^privacy_amendment]: Privacy Amendment Act 2025
[^bellgully_ipp3a]: Bell Gully
