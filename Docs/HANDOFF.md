# HANDOFF — Data Explorer

Written 2026-10-09 at the end of phase 1. Read [SPEC.md](SPEC.md) first; its §10
is the tracker. The content is the knowledge base in [knowledge/](knowledge/index.md).

## 0. Where this is up to

**Phase 1 is built and not deployed.** The site builds from the knowledge base,
every check in SPEC §5 runs, and the only page is a holding page in the landing
page's shape whose numbers come from the bundle. The repository has not been
created on GitHub; that waits on David.

```bash
make install   # npm ci in site/
make verify    # the knowledge base: conformance, links, references, staleness, ledger
make build     # verify → astro build → pagefind → verify --dist → check_site
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

## 3. Next

Phase 2, the landing page (SPEC §4.1). The holding page is already its shape;
it needs the lead, the launch button (pointing at `/trace/` only once that
exists), and the three-up with sources.

The siblings' HANDOFF lessons apply throughout; SPEC §7 lists the ones that
bite this project.
