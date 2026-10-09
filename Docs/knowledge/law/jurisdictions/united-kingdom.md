---
type: Jurisdiction
title: "United Kingdom"
description: "No general right to device data. The Data (Use and Access) Act 2025 lets the government create sector 'smart data' schemes; none covers building systems."
tags: [jurisdiction, uk]
jurisdiction: uk
device_data_right: powers-only
legal_review: none
# What the rulebook shows for the UK. Under "rights", each EU right's row
# says what applies here instead; under "asks", this jurisdiction's own
# instruments. An ask may reuse an EU instrument's placement in the building
# (`placed_like`) or be a standard that applies everywhere (`instrument`).
rulebook:
  rights:
    yours: { status: powers-only, note: "No general right. Since 20 August 2025 the government can create smart data schemes sector by sector; none covers buildings yet." }
    share: { status: powers-only, note: "No general right to send building data to a third party. A future smart data scheme could create one." }
    born-open: { status: none, note: "No duty to design products so their data is accessible. The product security regime covers security, not data access." }
    leave: { status: none, note: "No statutory right to switch cloud providers, and no rule against switching charges." }
    fair-terms: { status: none, note: "No data-specific rule against unfair terms between businesses. General contract law applies." }
    borders: { status: none, note: "No duty to publish where non-personal data is held. UK GDPR's transfer rules cover personal data only." }
    event-log: { status: none, note: "No carve-out: the database right still applies to databases of device-generated data." }
  asks:
    - id: uk-gdpr
      name: "UK GDPR · Data Protection Act 2018"
      cite: "Data Protection Act 2018; UK GDPR"
      question: "Is this data about people?"
      ask: "Which of this system's data is personal data, who is controller and who is processor for each, and where is the processing agreement?"
      placed_like: gdpr
      phases: [{ date: 2018-05-25, what: "applies" }]
      url: "https://www.legislation.gov.uk/ukpga/2018/12/contents"
    - id: uk-nis
      name: "NIS Regulations 2018"
      cite: "SI 2018/506"
      question: "Whose duty is it to ask?"
      ask: "Are we an operator of essential services or a relevant digital service provider? If so, what supplier-security evidence will our regulator expect?"
      placed_like: nis2
      phases: [{ date: 2018-05-10, what: "applies" }]
      url: "https://www.legislation.gov.uk/uksi/2018/506/contents"
    - id: uk-psti
      name: "Product security regime (PSTI)"
      cite: "Product Security and Telecommunications Infrastructure Act 2022"
      question: "Is the hardware secure by default?"
      ask: "Does any of this equipment fall under the consumer connectable product regime, and if not, what security commitments does the maker give for it?"
      placed_like: cra
      phases: [{ date: 2024-04-29, what: "applies to consumer connectable products" }]
      url: "https://www.gov.uk/government/publications/the-uk-product-security-and-telecommunications-infrastructure-product-security-regime"
    - { instrument: iso-42001 }
    - { instrument: soc2-27001 }
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: draft
stale_after: "2027-04-01T00:00:00Z"
sources:
  - id: duaa_si
    resource: "https://www.legislation.gov.uk/uksi/2025/904/made"
    title: "SI 2025/904, Data (Use and Access) Act 2025 (Commencement No. 1) Regulations 2025"
  - id: duaa_plan
    resource: "https://www.gov.uk/guidance/data-use-and-access-act-2025-plans-for-commencement"
    title: "GOV.UK: Data (Use and Access) Act 2025, plans for commencement"
  - id: psti
    resource: "https://www.gov.uk/government/publications/the-uk-product-security-and-telecommunications-infrastructure-product-security-regime"
    title: "GOV.UK: the UK product security regime"
  - id: nis
    resource: "https://www.legislation.gov.uk/uksi/2018/506/contents"
    title: "The Network and Information Systems Regulations 2018"
---

# What applies

- **Smart data powers.** Part 1 of the Data (Use and Access) Act 2025, which lets
  the government create schemes giving customers access to their data in named
  sectors, came into force on 20 August 2025.[^duaa_si] No scheme covering
  building systems or connected devices was found as of October 2026.[^duaa_plan]
- **Personal data.** UK GDPR and the Data Protection Act 2018, amended in stages
  by the 2025 Act.
- **Supplier security.** The NIS Regulations 2018 put security duties on
  operators of essential services and relevant digital service providers.[^nis]
- **Product security.** The product security regime has applied since 29 April
  2024 to consumer connectable products.[^psti] Most commercial building
  equipment is outside it; the rulebook says so in its question.
- **EU reach.** A UK manufacturer selling into the EU is bound by the EU Data
  Act for those products.

# On the rulebook

The seven rights rows stay, each saying what applies in the UK instead. For
five of them that is nothing, and the row says so in words.

Checked 2026-10-09 against the sources listed (SPEC §3.2.3). Not checked: the
Cyber Security and Resilience Bill, whose status was not confirmed, so it is
left out.

[^duaa_si]: SI 2025/904
[^duaa_plan]: GOV.UK
[^nis]: NIS Regulations 2018
[^psti]: GOV.UK product security regime
