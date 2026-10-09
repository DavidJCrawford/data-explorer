# HANDOFF — Data Explorer

Written 2026-10-09 at the end of phase 1; updated after phases 2 to 5. Read [SPEC.md](SPEC.md) first; its §10
is the tracker. The content is the knowledge base in [knowledge/](knowledge/index.md).

## 0. Where this is up to

**Phases 1 and 2 are built and deployed** at
https://davidjcrawford.github.io/data-explorer/ from
`DavidJCrawford/data-explorer`. Pushing `main` deploys. The site builds from
the knowledge base with every check in SPEC §5 running, and the one page is
the landing page, the trace at `/trace/` and the rulebook at `/rulebook/`. The section drawing on its own
is reviewed with `make drafts` at `/draft/section/`.

```bash
make install   # npm ci in site/
make verify    # the knowledge base: conformance, links, references, staleness, ledger
make build     # verify → astro build → pagefind → verify --dist → check_site
make drafts    # the same, plus local-only review pages under /draft/
make preview   # serve dist; check against this, never astro dev
make check     # astro check
```

## 1. What exists

```
Docs/knowledge/              the content (OKF v0.2); pages read it directly
site/src/content.config.ts   collections + schemas over ../Docs/knowledge
site/src/lib/knowledge.ts    the only place pages get content from
site/src/lib/ledger.mjs      copies, hands, seams; shared with verify
site/src/lib/disclaimer.ts   the disclaimer text, once
site/src/lib/logo.ts         the mark: a circle split at the property line
site/src/layouts/Base.astro  the siblings' masthead and footer, plus the disclaimer
site/src/styles/             tokens.css + base.css inherited; dse.css is this project's
site/scripts/verify.mjs      the checks (bundle before the build, pages after)
scripts/check_site.py        every internal link, unchanged from the siblings
.github/workflows/deploy.yml Pages; Docs/knowledge changes DO rebuild
```

## 2. Things that are true and not obvious

- **There is no JSON.** The prototype kept content in four JSON files and its
  markdown twin drifted. Here the collections read the markdown, so a page
  cannot disagree with the bundle. Add a field to the frontmatter and to the
  schema in `content.config.ts`; nothing else.
- **verify does not trust the site's code.** The ledger is computed by
  `ledger.mjs` and compared with the totals typed by hand in the trace's
  tables. Change the model and the tables together, or the build fails.
  A deliberately broken total was caught when this was built.
- **References are written twice and must agree.** An article's
  `attaches_to` and a component's `articles` describe the same relationship
  from both ends. The first run found Article 5 missing from the third party.
- **Every built page needs `data-disclaimer`.** Pages using `Base` get it in
  the footer. The trace and rulebook drop the chrome, so they must render
  `<Disclaimer />` themselves.
- **Staleness fails the build.** The Digital Omnibus concept goes stale on
  31 December 2026. `VERIFY_TODAY=2027-01-05 npm run verify` shows what that
  looks like. Re-check the facts, then move `stale_after`.
- **The vendor blocklist** is in `verify.mjs`. "Milestone" is left off because
  it is a column heading here. The one allowed phrase is "Gallagher Security
  Trends Report", for the link David adds once the piece is published.
- **NAV is empty** in `Base.astro` on purpose. Add each link as its page lands;
  `check_site` fails a link to a page that does not exist.
- **The logo is computed** from the trace: the split falls at the hop that
  crosses the property line.

- **Every number and date on the landing page is computed**: counts from the
  trace's model through `ledger.mjs`, dates from the milestones concept's
  frontmatter (which verify checks against its table). Small counts are words
  in prose (`lib/format.ts`: `words`, `Words`, `times`), numerals in stats.
- **The launch button turns itself on.** It is drawn as a disabled pill until
  `src/pages/trace/index.astro` exists, then becomes a link (`import.meta.glob`
  in `index.astro`). Nothing to remember in phase 4.
- **Source links point at the repository** (`kb()` in `lib/scope.ts`) until
  phase 6 publishes the bundle with the site; change that one function then.
- **The landing page fits 1440 × 830 exactly.** Any copy added to it will push
  it over; cut something to make room. Stat labels must stay on one line at
  that size (about 20 characters).
- **The commit identity** for this repository is the GitHub noreply address,
  set in the repository's own git config, so the public history does not name
  the author's employer.

- **The section is in metres.** `lib/section.ts` holds the geometry and
  `components/Section.astro` draws it; the camera will move by changing the
  viewBox, which `Section` takes as a prop. Strokes are non-scaling, type is in
  metres. `design/the-section-drawing.md` records why the data leaves upward
  and why the scale break is there.
- **Drafts never ship.** `/draft/[name]` has no paths unless `DRAFTS=1`. Do not
  create `/trace/` until it works: the landing page's button turns on the
  moment that file exists.

- **The trace's state is one number**, `s`, metres along the route
  (`scripts/trace.ts`). Position, stop, ledger and marks all follow from it
  and the archetype, so scrubbing, switching and playing cannot disagree.
- **Everything is rendered at build time** (`components/Trace.astro`,
  `lib/trace-data.ts`): both archetypes' copy marks and seam ticks, the
  footage marks, every card. The script toggles classes and moves the dot
  and the camera. `.only-composite` / `.only-governed` hide the other
  archetype's marks via `data-path` on the root.
- **Do not give anything the class `event`.** The drawing's route lines carry
  it as their stream; the moving dot is `.event-dot`. A style aimed at the
  dot once filled every route gold.
- **The URL is the state**: `?hop=3&path=governed` opens at that stop.
  Applying the path before the first stop is drawn threw once; `setPath`
  now returns early until a stop exists.
- **The stop names over the drawing** (`.tags`) appear only when the camera is
  too far out for the drawing's own labels (the finale), positioned from the
  SVG's screen matrix.
- **verify now checks the trace's prose tables too**: the spine (place, what
  the event becomes) and what is owed at each stop, against the rights'
  `attaches_to`. The second found "Share it" missing from the third party.

- **The rulebook is a table, not a graph** (`components/Rulebook.astro`,
  `lib/rulebook-data.ts`, `scripts/rulebook.ts`). Every jurisdiction's rows and
  every row's drawer are rendered at build time; the script switches
  jurisdiction, moves the date and selects. State is in the URL:
  `?j=uk&at=2027-01-12&sel=leave`.
- **Where an instrument applies comes from the components' `asks`**, not from
  the instrument. One source; the trace's cards use the same field.
- **Rows are drawn from structured frontmatter**: `phases` on rights and
  instruments (verify checks rights' phases fall on the Act's milestones and
  instruments' match their Dates tables), and a `rulebook` block on each
  non-EU jurisdiction with a note for every EU right and its own asks
  (verify checks all seven rights are covered and every ask points at an
  instrument).
- **`lib/phases.ts` is shared** by the build's first paint and the scrubber,
  so the two cannot disagree about what is in force on a day.
- **A long unbreakable line in a bar widened the whole page on a phone.** Both
  instruments now set `grid-template-columns: minmax(0, 1fr)` and let the
  readout truncate.

## 3. Next

Phase 6, reference pages and agent surfaces (SPEC §4.4, §4.5): an article page
per article, a right page per right, the sources page, and llms.txt, the
index.md twin and the raw bundle. When the bundle is published with the site,
change `kb()` in `lib/scope.ts` to point at it. Still owed from phase 4:
reduced motion, a hidden tab and a real phone checked by hand, and the
"building lies down" transition.

The siblings' HANDOFF lessons apply throughout; SPEC §7 lists the ones that
bite this project.
