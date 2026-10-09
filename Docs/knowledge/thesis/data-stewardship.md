---
type: Concept
title: "Data stewardship"
description: "The customer governs their data; the vendor stewards it on their behalf. Custody as a discipline: keys, retention, residency and training use."
tags: [thesis, stewardship, governance]
generated: { by: claude-code/opus-5.5, at: "2026-10-09T00:00:00Z" }
status: stable
sources:
  - id: dama
    resource: "https://www.dama.org/cpages/body-of-knowledge"
    title: "DAMA-DMBOK: data stewardship as accountability for data on the owner's behalf"
  - id: prototype
    resource: "https://github.com/DavidJCrawford/stewardship-explorer/blob/main/brain/concepts/data-stewardship.md"
    title: "stewardship-explorer brain: Data Stewardship"
---

# Definition

The term comes from data-governance practice, where stewardship means
accountability for data, and the processes that keep it controlled, on behalf
of its owner.[^dama] Governance sets the policy; stewardship carries it out.

Across the line between a vendor and its customer, that becomes the frame of
this project: **the customer governs their data, and the vendor stewards it on
their behalf.**

# The toolkit

Four practices have converged as the working definition of holding someone
else's data on their terms:

- **Customer-held keys.** The customer generates and controls the encryption
  keys; the vendor stores what it cannot read on its own. Deletion
  synchronises.
- **Zero or tiered retention.** Raw inputs are not kept; aggregates are kept
  under a policy the customer sets, and deleted on request.
- **Residency and deployment choice.** Cloud, dedicated cloud, hybrid or
  on-premises, offered as an ordinary configuration.
- **Training-use transparency.** A clear, checkable answer to whether the
  customer's data trains anyone's models.

# Stewardship against possession

A possessor keeps customers because leaving is expensive. A steward keeps them
because its custody is demonstrably good. The [EU Data Act](/law/eu-data-act/overview.md)
makes the difference legal: leaving can no longer be made expensive. See
[Openness is the floor](/thesis/openness-is-the-floor.md).

# What makes it provable

A steward has to be able to account for the data, not only promise to. That is
easiest when one party answers for the whole path from the device to the
application, and hardest when the path crosses [seams](/thesis/custody-seams.md).

[^dama]: DAMA-DMBOK
