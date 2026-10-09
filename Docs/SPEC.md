# SPEC — Data Explorer

**A static, editorial site that follows one door event from the reader to the
cloud and shows, at each step, who holds the data and what the building's
owner is owed.**

- **Status:** phases 1 to 6 built and deployed 2026-10-09: the scaffold,
  with every check in §5 running, the landing page, the section drawing,
  the trace, the rulebook, and the reference pages and agent surfaces.
  Phase 7's review is done; what remains needs David (§10). §10 is the
  tracker; [HANDOFF.md](HANDOFF.md) is where it is up to.
- **Content source:** [Docs/knowledge/](knowledge/index.md), an OKF v0.2
  bundle compiled from the prototype
  [stewardship-explorer](https://github.com/DavidJCrawford/stewardship-explorer)
  and rewritten against the Trends Report article
  ([the article](knowledge/thesis/the-article.md)).
- **Design system:** The Longest Journey, F1 Analysis and NFL Analysis,
  inherited unchanged ([design inheritance](knowledge/design/inheritance.md)).
  Their HANDOFF lessons apply here; §7 lists the ones that bite this project.
- **Deployment target:** GitHub Pages at
  `davidjcrawford.github.io/data-explorer/`, from
  `DavidJCrawford/data-explorer`.
- **Companion:** a long-form article on the portfolio site (§8), the longer
  version of the Trends Report piece.

---

## 1. The promise

One sentence, to accept or reject every feature:

> **Where a building's data goes, who holds it at each step, and what the law
> says its owner is owed there.**

A reader should leave knowing three things they did not before: that a single
door event is copied several times on its way to the cloud; that what differs
between systems is how many organisations hold those copies, not how many
copies there are; and that in the EU the building's owner has specific,
citable rights at each step.

## 2. Audience and scope

**Facilities managers**, and the architects and engineers who specify building
systems. Not lawyers and not security specialists, though a lawyer should find
nothing wrong. A policy-literate reader must find it rigorous; a facilities
manager must find it about their building.

**In scope:** one generic connected building; one traced door event, and the
camera alongside it as the sensitive stream; two archetypes; the EU Data Act
article by article; six neighbouring instruments as questions to ask; four
other jurisdictions as first drafts.

**Not in scope:** named vendors (see
[archetypes only](knowledge/policies/archetypes-only.md)); compliance
checklists; anything that reads as legal advice; a general survey of data law.

**The spine is distance from the door, in hops.** Every component, right and
article has a place on it. If something cannot be placed on it, it is not on
the trace. (The Longest Journey's spine is distance downstream; this is the
same discipline.)

## 3. Content — what exists and what must be settled

### 3.1 What exists (2026-10-09)

The bundle holds 113 concepts. See its [log](knowledge/log.md).

| Area | Concepts | State |
| --- | --- | --- |
| [Thesis](knowledge/thesis/index.md) | the article, 7 concepts, 2 background | written |
| [Building](knowledge/building/index.md) | setting, trace, flows, 12 components | written; trace is illustrative |
| [Rights](knowledge/rights/index.md) | 7 | from prototype; author's reading, not legally reviewed |
| [EU Data Act](knowledge/law/eu-data-act/index.md) | overview, 50 articles, chapters, definitions, actors, milestones | from prototype; author's reading, not legally reviewed |
| [Wider rulebook](knowledge/law/wider-rulebook/index.md) | 6 instruments, Digital Omnibus | dates refreshed 2026-10-09 |
| [Jurisdictions](knowledge/law/jurisdictions/index.md) | EU, UK, NZ, AU, US | first drafts |
| [Design](knowledge/design/index.md), [policies](knowledge/policies/index.md), [decisions](knowledge/decisions/index.md) | 4, 4, 4 | written |

### 3.2 What must be settled before the matching parts are built

In order. Each one is cheap and can change a design.

1. **Check the trace's attachments against the text.** Which articles attach
   at which hop drives the stop cards and the rulebook. There is no legal
   reviewer (§9.6), so this is the author's own reading, checked against the
   Official Journal text, and the site says so. In particular: is the head-end
   a *related service*, and is the hosted platform a *data processing
   service*? ([definitions](knowledge/law/eu-data-act/definitions.md)).
   Needed before phase 4.
2. **Argue with the ledger counts.** [The trace](knowledge/building/the-trace.md)
   fixes copies, hands and seams per hop. The finding that both archetypes make
   six copies and differ only in hands and seams is the site's central
   number. It should be challenged by someone who builds these systems before it
   is drawn. Needed before phase 4.
3. **Verify the jurisdictions.** Every non-EU entry is a first draft from
   secondary sources, with unverified items listed in each. Check each
   against its primary legislation before phase 5; the switch ships (§9.2),
   so this is not optional.
4. **Freshness at ship time.** Re-check the [Digital Omnibus](knowledge/law/wider-rulebook/digital-omnibus.md)
   (`stale_after` 31 December 2026) and the AI omnibus's publication in the
   Official Journal.
5. **The disclaimer, everywhere law appears.** No lawyer will review the
   content (§9.6). Every legal surface carries the disclaimer in
   [legal rigour](knowledge/policies/legal-rigour.md): the author's reading,
   not reviewed by a lawyer, not legal advice.

## 4. Information architecture

Three experiences in sequence (landing, trace, rulebook), plus reference pages
and a colophon. Light paper for reading; dark instrument for doing.

| Route | Surface | Purpose |
| --- | --- | --- |
| `/` | paper | The landing page. One button into the trace |
| `/trace/` | instrument | The door event, followed through the building |
| `/rulebook/` | instrument | The law laid along the same hops |
| `/law/eu-data-act/` | paper | The Act as a reference: chapters, then articles |
| `/law/eu-data-act/article-4/` | paper | One permanent page per article, two registers |
| `/rights/yours/` … | paper | One permanent page per right |
| `/sources/` | paper | Sources, method, the disclaimer |
| `/knowledge/` | raw | The bundle, published as is, with a manifest |
| `/llms.txt`, `/index.md` | raw | Agent surfaces, generated from the bundle |

URL state is addressable: `/trace/?hop=3&path=governed`,
`/rulebook/?at=2027-01-12&j=eu&sel=leave`.

### 4.1 The landing page

The Longest Journey's landing page, in shape and spacing, fitting one laptop
screen without scrolling.

- **Eyebrow:** Connected buildings · EU Data Act
- **Display title:** Data Explorer (§9.1).
- **Lead:** in the article's terms and the site's numbers, computed from the
  bundle at build time, never typed in. Draft: *Every credential, every door
  event, every reading is a record of how a building works. One door event is
  copied six times on its way to the cloud. Since September 2025 the EU Data
  Act has made that data the building owner's to take and to move. What
  differs between systems is how many hands it passes through.*
- **Launch:** a pill button, "Follow the data" (▶), with the muted note "From
  the door to the cloud."
- **The numbers, on a hairline:** hops from the door (6) · copies made (6) ·
  hands, composite against governed (4 / 2) · Data Act articles (50) · rights
  (7). Every value comes from the bundle.
- **Three-up, sources under each:** *Where it goes* (the path), *Who holds it*
  (hands and seams), *What you're owed* (the rights, linking to the rulebook).
- **Below the fold, one line:** the long-form article, linked. The Trends
  Report piece is added beside it once published (§9.7).

No map library or trace script loads on this page. Budget: under 25 KB.

### 4.2 The trace

The Longest Journey's journey, with the map replaced by an
[architectural section](knowledge/design/the-section-drawing.md) and the boat
by a door event. A full-screen dark instrument.

**Top bar.** Logo · `TRACE` · the title *Front entrance, 07:42* · the readout
(`Hop 2 · Head-end · Comms room, level 2`) · ✕ back to the landing page.

**Stage.** The section drawing, full bleed. A gold mark (the event) travels the
conduits from the reader, up the riser, to the comms room, through the
property line, up to the cloud, to the model, and out to the third party.
Small marks stay behind where copies were made. A red tick crosses the conduit
at each seam, with the makers' letters either side. The camera frames the event
set back from centre in its direction of travel. Background streams
(occupancy, energy, air) are drawn still.

**The ledger** (persistent panel, right; bottom sheet on a phone):

- **Where:** hop number, component, place, and the holder in this archetype.
- **The count:** copies · hands · seams, each with its running total, the
  hands listed by letter (A, B, C…), and the owner's chosen hands shown apart.
- **Owed here:** the rights that attach at this hop, as short second-person
  lines, each linking to the rulebook with that right selected.
- **The chain so far:** one line per hop passed, as The Longest Journey's
  "reach by reach": `Controller · Maker B · copy 1 · seam A→B`.
- A one-line attribution: illustrative system, counts from stated definitions.

**Bottom bar.** Play/pause · scrubber with a tick per hop · the archetype
switch (*Composite stack* / *Governed path*) · Rulebook · Sources.

**Stops.** The event brakes into each hop (√(2ad), as on the river), and after
about 450 ms a card fades in at the centre: what this place is, what the event
becomes here, who holds it, what the owner is owed (with article chips), and
the one question to ask, from the wider rulebook. "Continue" sends the event
on. In the governed path, the hop 4 card also shows local AI as the
alternative: the model in the comms room, the event never leaving for it.
The ledger does not change for it (§9.3). The Autoplay box (remembered per browser) closes each card after ten
seconds with a countdown along its foot.

**The archetype switch.** Switching mid-trace keeps the hop and replays the
ledger to that point in the other archetype: letters change, seam ticks
appear or vanish, the counts move. Copies do not change, and the ledger says
so the first time the switch is used: *Same copies. Different hands.*

**The sensitive stream.** The camera over the door records the same moment.
In the composite stack its footage follows the event to the cloud, with its own
small count. In the governed path it stops at the comms room, and the
property line flashes once where it would have crossed. This is the visual for
[leave it alone](knowledge/thesis/leave-it-alone.md).

**Finale.** The camera pulls back to the whole section. The ledger shows its
totals for both archetypes side by side, and the closing line from the article:
*Advantage won't go to whoever collects the most. It will go to whoever can
account for all of it.* One button: "See what the law says" opens the
rulebook. Target transition: the section's hops slide into a row and become
the rulebook's columns ("the building lies down"). Fallback: an ordinary
navigation with the hop row already in place.

**Reduced motion.** No travel. One static frame per hop, Next and Previous,
the same cards and ledger. **No JavaScript.** The stops as a numbered
document on paper, with the counts in a table.

**Phone.** The section is tall, which suits a phone held upright. The ledger
becomes a bottom sheet with the count always visible, and cards are full width.

### 4.3 The rulebook

The legislative landscape, laid along the same spine. Not a graph: a table
that moves in time.

- **Columns** are the six hops, in the same order and with the same labels as
  the trace, plus a narrow *alongside* column for the camera and sensors.
- **Rows, upper group — what you're owed:** the seven rights. Each is a band
  across the hops where it attaches, labelled with its plain statement.
- **Rows, lower group — what to ask:** GDPR, NIS2, AI Act, ISO/IEC 42001, CRA,
  SOC 2 · ISO/IEC 27001, each a band across the components it attaches to,
  labelled with its question.
- **Time.** A scrubber from January 2024 to December 2028, opening at today.
  Bands not yet in force are outlined; in force, filled. Milestone ticks on
  the scrubber: 12 September 2025, 12 September 2026, 12 January 2027, 12
  September 2027, 2 December 2027, 11 December 2027. Dragging it shows the law
  arriving, which is the rulebook's content motion.
- **Jurisdiction.** EU (default) · UK · New Zealand · Australia · United States.
  Outside the EU the rights rows become what applies there, and where nothing
  applies the row stays, hatched grey, saying so in words: *No general right to
  device data.* The absence is the content.
- **Selecting** a band opens the drawer: the right in plain words; the articles
  behind it, each expandable to its precise and plain readings with the ELI
  link; the question to ask; "See it on the trace" (back to `/trace/?hop=n`).
- **Header line:** the disclaimer, short form: *Not legal advice. The
  author's own reading, not reviewed by a lawyer.*
  Pending amendments are one line linking to the Digital Omnibus concept.

On a phone the table transposes: hops become rows, running upward as in the
section, and bands become chips.

### 4.4 Reference pages and colophon

- `/law/eu-data-act/` lists chapters and articles. Each article has a
  permanent page with both registers, the facts table, cross-references as
  links, the hops it attaches to, and the rights that rest on it. These pages
  are the no-JS form of the rulebook and the pages agents and search engines
  land on.
- `/rights/<id>/` per right, the same treatment.
- `/sources/` lists sources and method, the disclaimer in full,
  the trace's definitions, and the statement that the system is illustrative.
  After The Longest Journey's sources page: sources and method only.

### 4.5 Agent parity

Carried over from the prototype, now generated from the bundle so nothing can
drift: `/llms.txt`, an `/index.md` twin of the site, the raw bundle at
`/knowledge/` with a manifest, JSON-LD on every page, `robots.txt` welcoming
named AI crawlers, `sitemap.xml`.

## 5. Build

Same shape as the siblings, with one difference: no Python pipeline. There is
no external data to fetch; the content is the bundle.

- **Astro 7.3.2**, static, TypeScript strict, `compressHTML: false` (sibling
  lesson). Pagefind for search across the reference pages.
- **Content collections** over `../Docs/knowledge/**/*.md` with the glob loader
  and a Zod schema per `type` (Statutory Article, Right, Building Component,
  Instrument, Jurisdiction, Model). The site reads frontmatter for structure
  and renders bodies for prose. No YAML library, no second copy of the content.
- **No runtime dependencies.** The section is SVG generated at build time from
  the building model; the trace and rulebook are hand-written TypeScript over
  it. The Longest Journey needed MapLibre for tiles; nothing here does.
- **`verify`** runs on every build and fails it on:
  - a non-conformant concept (no frontmatter, no `type`) or a broken
    bundle link;
  - a concept past its `stale_after`;
  - a legal surface (article, right, instrument, jurisdiction, rulebook,
    trace card) rendered without the disclaimer;
  - a cited article, right or component id that does not exist;
  - ledger counts that do not follow from the trace's per-hop table (the
    totals are recomputed and compared, not trusted);
  - any vendor name from a blocklist, in copy or in the bundle.
- **`check_site`** from the siblings, unchanged: every internal link in `dist`.
- **Deploy:** `.github/workflows/deploy.yml` from The Longest Journey; the
  repository name is the base path; documentation commits do not rebuild.
- **Layout:**

```
Docs/SPEC.md  Docs/HANDOFF.md (from phase 1)  Docs/knowledge/
site/src/content.config.ts   collections + schemas over Docs/knowledge
site/src/lib/                spine.ts (hops), ledger.ts, section.ts (SVG), url.ts
site/src/pages/              index, trace/, rulebook/, law/, rights/, sources/
site/src/styles/             tokens.css + base.css (inherited), dse.css (project tokens)
site/scripts/verify.mjs      the checks above (bundle before the build, pages after)
scripts/check_site.py        every internal link in dist
```

## 6. Design

All of it is in the bundle's [design](knowledge/design/index.md) section. In
short: the siblings' tokens, type and page shapes unchanged; project colours
added as `--dse-*` for the event (gold), the customer's domain (patina), the
seam (the siblings' data red) and the sensitive stream; makers told apart by
letter and seam ticks, not by colour; the stage is an architectural section in
hairline; motion follows the siblings' chrome/content split.

## 7. Lessons that bite this project

From the siblings' handoffs and the prototype's hardening checklist. All of
them have been paid for already.

- **Verify against a static server on `site/dist`, not `astro dev`.** It serves
  stale CSS.
- **`requestAnimationFrame` stops on hidden tabs and in the browser pane.**
  Never gate a transition on it; force a reflow; keep state converging on a
  timer. Watch one full trace in a real browser before calling it done.
- **Decoration never intercepts the pointer.** Copies, ticks and labels are
  `pointer-events: none`; hit targets are explicit.
- **Touch:** match the finger by `isPrimary`, not `pointerId` (iOS).
- **Coordinate honesty:** account for SVG letterboxing; refit on
  `ResizeObserver`.
- **Frame the moving thing; don't centre it.**
- **Check the composition before the detail.** Block out the section at its
  real proportions on a phone and a laptop before drawing a single symbol.
- **Check the brief against the data.** The trace already contradicts one
  reading of the article (fewer copies); the site says what the counts say.
- **Astro's template parser** cannot read `<=` in a JSX expression or a
  nested template literal in an attribute. Resolve in frontmatter.

## 8. The companion article

For the portfolio site, about 2,500–3,000 words, linking into the explorer at
each section. Outline:

1. **The quiet asset.** The archive as fuel: what an agent can read in an
   access log that nobody else did.
2. **The law caught up.** The Data Act's rights in plain terms; what changed
   in September 2026; what is still coming (January 2027, September 2027); what
   is pending (the omnibus); and outside the EU, how uneven it is.
3. **Control leaks at the seams.** The trace, told in prose: six hops, six
   copies, four hands against two. Why "fewer copies" is the wrong claim and
   "fewer hands" the right one.
4. **Built for control.** The governed path, honestly: a host is still a hand;
   the owner's recipient is a seam by right. What to leave alone, and why the
   camera is the example.
5. **The honest trade-off.** Openness used to be the customer's protection
   from lock-in; the law now guarantees it, so the trade is gone.
6. **What to ask.** The six questions from the wider rulebook, for a
   facilities manager's next procurement.
7. **Account for all of it.**

Draft from the bundle, not from memory; every legal claim cited as on the
site.

## 9. Decisions

All taken 2026-10-09.

1. **Retire the node graph**; content carries over, form does not.
   ([decision](knowledge/decisions/retire-the-node-graph.md))
2. **A landing page, then an instrument**, in The Longest Journey's shape,
   with the siblings as the design system.
   ([decision](knowledge/decisions/landing-then-instrument.md))
3. **Archetypes only.** No vendor named, the author's employer included.
4. **The trace follows a door event.**

Settled with David after the first draft:

1. **Name: Data Explorer**, for the site and the repository
   (`data-explorer`). Plain, not poetic.
2. **Jurisdictions:** the switch stays in the rulebook, EU by default.
3. **Hop 4:** cloud AI in both archetypes; local AI shown as the alternative
   on the governed path's hop 4 card, in words, without changing the ledger.
4. **The sensitive stream is the camera**, not biometric templates.
5. **The old site** (stewardship-explorer) is left alone for now.
6. **No legal review.** Nobody is available to do one. Instead, every legal
   surface says plainly that it is the author's reading, not reviewed by a
   lawyer, and not legal advice
   ([legal rigour](knowledge/policies/legal-rigour.md)).
7. **The Trends Report piece** is not linked until it is published; David
   adds the link then.

## 10. Tracker

Update this list as work lands; log detail in [knowledge/log.md](knowledge/log.md).

**Phase 0: knowledge and spec**
- [x] Read the prototype, the OKF v0.2 spec and the siblings' specs and handoffs
- [x] Compile the prototype's content into the bundle (113 concepts)
- [x] Rewrite the thesis against the article; add copies and hands, the trace, the camera
- [x] Freshness pass (Digital Omnibus, AI Act, CRA, Data Act milestones)
- [x] First drafts of UK, NZ, AU and US
- [x] SPEC.md
- [x] Owner review of SPEC §9 open decisions

**Phase 1: scaffold**
- [x] Copy the site skeleton, tokens and base styles from The Longest Journey
- [x] Content collections and schemas over the bundle
- [x] `verify.mjs` with all §5 checks; `check_site` carried over
- [x] Pages workflow written
- [x] Repository created, pushed, and the holding page deployed

**Phase 2: landing page**
- [x] Landing page with numbers computed from the bundle
- [x] Fits one laptop screen (1440 × 830 exactly); about 7 KB gzipped before fonts
- [ ] Long-form article link, once the article exists (§8)

**Phase 3: the section drawing**
- [x] Block out the section at real proportions, phone and laptop (§7)
- [x] Build-time SVG from the building model: floors, riser, comms room, property line, cloud, third party
- [x] Component symbols, conduits, labels
- [x] Review page at true size (`make drafts`, `/draft/section/`; never deployed)

**Phase 4: the trace** (needs §3.2.1 and §3.2.2)
- [x] §3.2.1 the author's check of the attachments; §3.2.2 counts confirmed by David
- [x] Event travel, braking, camera framing
- [x] The ledger, computed from the trace table
- [x] Stop cards, Autoplay, countdown
- [x] Archetype switch mid-trace
- [x] The sensitive stream
- [x] Finale (the rulebook button appears when phase 5 builds `/rulebook/`)
- [ ] Finale transition "the building lies down" (target; ordinary navigation until then)
- [x] Reduced-motion and no-JS forms written; phone layout checked at 375 px
- [x] One full trace watched end to end with Autoplay in the app's browser pane (about 90 s, no stalls)
- [ ] Reduced motion, a hidden tab, and a real phone checked by hand (not yet exercised)

**Phase 5: the rulebook** (jurisdictions need §3.2.3)
- [x] §3.2.3 jurisdictions checked against primary and official sources (UK, NZ, AU, US)
- [x] Hops as columns, rights and instruments as bands (plus an "alongside" column)
- [x] Time scrubber and milestones (every date anything comes into force is a tick; arrow keys step between them)
- [x] Drawer with two registers and ELI links
- [x] Jurisdiction switch with honest absence
- [x] Phone layout: each row's label above a strip of seven cells; the drawer as a bottom sheet (not a full transposition: seven cells fit at 375 px)
- [x] Trace cards link each right to it; the trace's finale links here

**Phase 6: reference and agents**
- [x] Article and right pages; the Act index (50 + 7 + 2 pages)
- [x] Sources page, its lists gathered from the concepts' `sources`
- [x] llms.txt, index.md twin, raw bundle with manifest, JSON-LD, robots, sitemap
- [x] Trace cards and rulebook link each article to its page
- [x] Search across the reference pages: Pagefind indexes their bodies only; the box is on the Act's index

**Phase 7: review and ship**
- [x] Disclaimer on every legal surface, enforced by `verify` (§3.2.5)
- [ ] Add the Trends Report link once published (§9.7) — David
- [x] Freshness re-check (§3.2.4), 2026-10-09: the AI omnibus is law (Regulation (EU) 2026/1744, OJ 24 July 2026, confirmed on EUR-Lex); the Data Act part is still not agreed. Next re-check by 31 December 2026, when the Digital Omnibus concept goes stale and the build fails until it is done
- [x] Accessibility pass (WCAG 2.2 AA): contrast of every token pair computed (one failure, the seam letters at 4.37:1, fixed with `--dse-seam-text` at 5.2:1); both switches are radio groups with one tab stop and arrow keys; the closed stop card and the phone's closed drawer are `inert`, and focus returns to Play; a heading on each instrument; each rulebook row says its state and stops in words for screen readers
- [ ] Accessibility with a real screen reader, reduced motion and a real phone — needs a person
- [x] Deploy
- [ ] The companion article (§8): drafted in the portfolio as `src/content/articles/account-for-all-of-it.mdx`, `draft: true`, not committed — David to edit and publish; then link it from the landing page
