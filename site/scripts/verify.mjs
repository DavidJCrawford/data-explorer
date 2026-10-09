/** Check the knowledge base, and the built site, against things they did not
 *  produce themselves. Fails the build on any problem.
 *
 *      node scripts/verify.mjs          the bundle (runs before `astro build`)
 *      node scripts/verify.mjs --dist   the built pages (runs after it)
 *
 *  The siblings' rule (their HANDOFF §4): a schema check is not enough; check
 *  the output against something the emitter had no hand in. Here that means
 *  cross-references that must agree from both ends, a ledger recomputed from
 *  the trace's model and compared with the totals written by hand in its
 *  tables, and dates compared with today. SPEC §5 lists the checks.
 *
 *  Uses js-yaml at the version Astro itself parses frontmatter with, so this
 *  and the site cannot disagree about what a file says.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { ledger } from '../src/lib/ledger.mjs';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUNDLE = path.resolve(SITE, '../Docs/knowledge');
const DIST = path.join(SITE, 'dist');
/** Overridable so a staleness check can be tested without waiting for it. */
const TODAY = new Date(process.env.VERIFY_TODAY ?? Date.now());

const problems = [];
const fail = (where, what) => problems.push(`${where}: ${what}`);

/* ── Vendor names (Docs/knowledge/policies/archetypes-only.md) ───────────────
   Makers are lettered. These are the names most likely to slip in: access
   control, video, building automation, cloud and AI. Matched as whole words,
   outside URLs. Milestone is left out: it is also an ordinary word here, a
   column heading in the Act's timeline. The one allowed phrase is the publication the article was
   written for, which the owner will link once it is published (SPEC §9.7). */
const VENDORS = [
  'Gallagher', 'Genetec', 'Lenel', 'LenelS2', 'Software House', 'HID', 'Honeywell', 'Johnson Controls',
  'Siemens', 'Schneider', 'Bosch', 'Axis', 'Avigilon', 'Motorola', 'Verkada', 'Brivo',
  'Openpath', 'Hikvision', 'Dahua', 'Paxton', 'Salto', 'Assa Abloy', 'ASSA ABLOY', 'dormakaba', 'Allegion',
  'Mercury Security', 'Amazon', 'AWS', 'Azure', 'Microsoft', 'Google Cloud', 'OpenAI', 'Anthropic', 'Apple',
];
const ALLOWED = ['Gallagher Security Trends Report'];
const vendorRe = new RegExp(`\\b(${VENDORS.map((v) => v.replace(/ /g, '\\s+')).join('|')})\\b`, 'g');
function scanVendors(where, text) {
  let t = text.replace(/https?:\/\/\S+/g, ' ');
  for (const a of ALLOWED) t = t.split(a).join(' ');
  for (const m of new Set(t.match(vendorRe) ?? [])) fail(where, `names a vendor (“${m}”); makers are lettered`);
}

/* ── The bundle ─────────────────────────────────────────────────────────── */

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.md') ? [path.join(dir, d.name)] : []);
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  return m ? { data: yaml.load(m[1]), body: text.slice(m[0].length) } : null;
}

const LEGAL_TYPES = new Set(['Statutory Article', 'Right', 'Instrument', 'Pending Amendment', 'Jurisdiction', 'Glossary', 'Timeline']);

function verifyBundle() {
  const files = walk(BUNDLE);
  /** concept id (path without .md) -> { data, body, rel } */
  const concepts = new Map();

  for (const file of files) {
    const rel = path.relative(BUNDLE, file);
    const name = path.basename(file);
    const text = fs.readFileSync(file, 'utf8');

    scanVendors(rel, text);

    // Every link resolves: bundle-relative (/x) from the root, others from the file.
    for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const target = href.split('#')[0];
      const abs = target.startsWith('/') ? path.join(BUNDLE, target) : path.resolve(path.dirname(file), target);
      if (!fs.existsSync(abs)) fail(rel, `broken link ${href}`);
    }

    if (name === 'index.md') {
      // OKF §8: no frontmatter, except okf_version at the root.
      const fm = frontmatter(text);
      if (fm && (rel !== 'index.md' || Object.keys(fm.data ?? {}).some((k) => k !== 'okf_version'))) fail(rel, 'index.md carries frontmatter');
      continue;
    }
    if (name === 'log.md') {
      // OKF §9: ISO dates, newest first.
      const dates = [...text.matchAll(/^## (\S+)/gm)].map((m) => m[1]);
      for (const d of dates) if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) fail(rel, `log heading “${d}” is not YYYY-MM-DD`);
      if (dates.some((d, i) => i > 0 && d > dates[i - 1])) fail(rel, 'log entries are not newest first');
      continue;
    }

    let fm;
    try { fm = frontmatter(text); } catch (e) { fail(rel, `frontmatter does not parse: ${e.message.split('\n')[0]}`); continue; }
    if (!fm || typeof fm.data !== 'object' || !fm.data) { fail(rel, 'no frontmatter'); continue; }
    const d = fm.data;
    if (typeof d.type !== 'string' || !d.type.trim()) fail(rel, 'no type (OKF §11)');
    concepts.set(rel.replace(/\.md$/, ''), { data: d, body: fm.body, rel });

    // Staleness (Docs/knowledge/policies/legal-rigour.md, rule 5).
    if (d.stale_after && new Date(d.stale_after) <= TODAY) fail(rel, `stale since ${new Date(d.stale_after).toISOString().slice(0, 10)}; re-check it and move stale_after`);

    // Review status is data, and "reviewed" needs a named human.
    if (LEGAL_TYPES.has(d.type) && !d.legal_review) fail(rel, `${d.type} without legal_review`);
    if (d.legal_review && !['none', 'reviewed'].includes(d.legal_review)) fail(rel, `legal_review “${d.legal_review}” is not none or reviewed`);
    if (d.legal_review === 'reviewed') {
      const v = [d.verified ?? []].flat();
      if (!v.some((x) => String(x.by).startsWith('human:'))) fail(rel, 'legal_review: reviewed without a human: verifier');
    }
  }

  /* References between concepts must point at something, and the two ends of
     a relationship written twice must agree. */
  const byPrefix = (p) => [...concepts].filter(([id]) => id.startsWith(p) && !id.slice(p.length).includes('/'));
  const articles = new Map(byPrefix('law/eu-data-act/articles/').map(([, c]) => [c.data.article, c]));
  const components = new Map(byPrefix('building/components/').map(([id, c]) => [id.split('/').pop(), c]));
  const instruments = new Map(byPrefix('law/wider-rulebook/').map(([id, c]) => [id.split('/').pop(), c]));
  const rights = byPrefix('rights/').map(([, c]) => c);

  if (articles.size !== 50) fail('law/eu-data-act/articles', `${articles.size} articles, expected 50`);
  for (let n = 1; n <= 50; n++) if (!articles.has(n)) fail('law/eu-data-act/articles', `Article ${n} is missing`);

  const needArticle = (c, n, field) => { if (!articles.has(n)) fail(c.rel, `${field} names Article ${n}, which does not exist`); };
  const needComponent = (c, id, field) => { if (!components.has(id)) fail(c.rel, `${field} names component “${id}”, which does not exist`); };
  const needInstrument = (c, id, field) => { if (!instruments.has(id)) fail(c.rel, `${field} names instrument “${id}”, which does not exist`); };

  for (const a of articles.values()) {
    for (const n of a.data.cross_refs ?? []) needArticle(a, n, 'cross_refs');
    for (const id of a.data.attaches_to ?? []) needComponent(a, id, 'attaches_to');
  }
  for (const r of rights) {
    for (const n of r.data.articles ?? []) needArticle(r, n, 'articles');
    for (const id of r.data.attaches_to ?? []) needComponent(r, id, 'attaches_to');
    for (const id of r.data.pairs_with ?? []) needInstrument(r, id, 'pairs_with');
  }
  for (const [id, c] of components) {
    if (c.data.component !== id) fail(c.rel, `component id “${c.data.component}” does not match its file name`);
    for (const n of c.data.articles ?? []) needArticle(c, n, 'articles');
    for (const s of c.data.asks ?? []) needInstrument(c, s, 'asks');
    // An article says where it attaches, and a component says which articles
    // attach to it. Written twice, so they must agree.
    const fromArticles = [...articles].filter(([, a]) => (a.data.attaches_to ?? []).includes(id)).map(([n]) => n).sort((x, y) => x - y);
    const own = [...(c.data.articles ?? [])].sort((x, y) => x - y);
    if (fromArticles.join() !== own.join()) fail(c.rel, `articles [${own}] disagree with the articles that attach here [${fromArticles}]`);
  }
  for (const c of instruments.values()) for (const id of c.data.attaches_to ?? []) needComponent(c, id, 'attaches_to');

  verifyTrace(concepts.get('building/the-trace'), components, rights);
  verifyMilestones(concepts.get('law/eu-data-act/milestones'), articles);
}

/** The milestones the site computes with, against the table a reader sees. */
function verifyMilestones(m, articles) {
  if (!m) return fail('law/eu-data-act/milestones.md', 'missing');
  const list = m.data.milestones ?? [];
  const iso = (d) => new Date(d).toISOString().slice(0, 10);
  const rows = [...m.body.matchAll(/^\| (\d{4}-\d{2}-\d{2}) \| ([^|]+?) \|/gm)].map((r) => [r[1], r[2]]);
  if (rows.length !== list.length) fail(m.rel, `the table has ${rows.length} rows for ${list.length} milestones`);
  list.forEach((x, i) => {
    const [date, name] = rows[i] ?? [];
    if (iso(x.date) !== date || x.name !== name) fail(m.rel, `milestone ${x.id} is ${iso(x.date)} “${x.name}” but the table says ${date} “${name}”`);
    for (const n of x.articles ?? []) if (!articles.has(n)) fail(m.rel, `milestone ${x.id} names Article ${n}, which does not exist`);
    if (i > 0 && iso(x.date) < iso(list[i - 1].date)) fail(m.rel, 'milestones are not in date order');
  });
}

/** The ledger recomputed from the trace's model, compared with the totals
 *  written by hand in its body. Either can be wrong; they cannot both be. */
function verifyTrace(t, components, rights) {
  if (!t) return fail('building/the-trace.md', 'missing');
  const { hops, parties, sensitive } = t.data;
  hops.forEach((h, i) => {
    if (h.n !== i) fail(t.rel, `hop ${i} is numbered ${h.n}`);
    if (!components.has(h.component)) fail(t.rel, `hop ${h.n} names component “${h.component}”, which does not exist`);
    for (const alt of Object.values(h.alternative ?? {})) if (!components.has(alt)) fail(t.rel, `hop ${h.n} alternative “${alt}” does not exist`);
    for (const p of ['composite', 'governed']) for (const who of h[p].holders) if (!parties[who]) fail(t.rel, `hop ${h.n} ${p} holder “${who}” is not a party`);
  });
  if (hops.filter((h) => h.crosses_property_line).length !== 1) fail(t.rel, 'exactly one hop must cross the property line');
  if (!components.has(sensitive.component)) fail(t.rel, `sensitive component “${sensitive.component}” does not exist`);

  const computed = { composite: ledger(hops, 'composite'), governed: ledger(hops, 'governed') };

  // The body's table: "| 3 Cloud | 4 · 3 (+D) · 3 | 4 · 2 (+D) · 1 |". The
  // leading number of each part is the total; brackets are commentary, except
  // "(+1)" on the owner's chosen hop, which is the chosen count.
  const section = t.body.split('# The ledger, hop by hop')[1]?.split('\n# ')[0] ?? '';
  const rows = [...section.matchAll(/^\| (\d) [^|]+\|([^|]+)\|([^|]+)\|/gm)];
  if (rows.length !== hops.length) fail(t.rel, `the ledger table has ${rows.length} rows for ${hops.length} hops`);
  for (const [, n, ...cells] of rows) {
    ['composite', 'governed'].forEach((p, i) => {
      const [copies, hands, seams] = cells[i].split('·').map((s) => s.trim());
      const lead = (s) => Number(s.match(/^\d+/)?.[0]);
      const plus = (s) => Number(s.match(/\(\+(\d)\)$/)?.[1] ?? 0);
      const c = computed[p][Number(n)];
      const written = [lead(copies), lead(hands), lead(seams), plus(hands), plus(seams)];
      const wanted = [c.copies, c.hands, c.seams, c.chosenHands, c.chosenSeams];
      if (written.join() !== wanted.join()) fail(t.rel, `after hop ${n}, ${p}: table says ${written}, the model gives ${wanted} (copies, hands, seams, chosen hands, chosen seams)`);
    });
  }

  // The spine table: each hop's place and what the event becomes there, as a
  // reader sees them, against the model the pages are built from.
  const spine = t.body.split('# The spine')[1]?.split('\n# ')[0] ?? '';
  const spineRows = [...spine.matchAll(/^\| (\d) \| [^|]+\| ([^|]+?) \| ([^|]+?) \|/gm)];
  if (spineRows.length !== hops.length) fail(t.rel, `the spine table has ${spineRows.length} rows for ${hops.length} hops`);
  for (const [, n, place, becomes] of spineRows) {
    const h = hops[Number(n)];
    if (h && (h.place !== place || h.becomes !== becomes)) fail(t.rel, `hop ${n}: the spine table says “${place}” / “${becomes}”, the model “${h.place}” / “${h.becomes}”`);
  }

  // What the owner is owed at each hop: the table must list exactly the rights
  // whose attaches_to names the hop's component.
  const owed = t.body.split('# What the owner is owed at each hop')[1]?.split('\n# ')[0] ?? '';
  for (const [, n, cell] of owed.matchAll(/^\| (\d) [^|]+\|([^|]+)\|/gm)) {
    const listed = [...cell.matchAll(/\/rights\/([a-z-]+)\.md/g)].map((m) => m[1]).sort();
    const component = hops[Number(n)]?.component;
    const attached = rights.filter((r) => (r.data.attaches_to ?? []).includes(component)).map((r) => r.rel.replace(/^rights\/|\.md$/g, '')).sort();
    if (listed.join() !== attached.join()) fail(t.rel, `hop ${n}: the owed table lists [${listed}] but the rights attached to ${component} are [${attached}]`);
  }

  // The sensitive stream's table.
  const copiesRow = t.body.match(/^\| Copies \| (\d+) \| (\d+) \|/m);
  if (!copiesRow) fail(t.rel, 'the sensitive stream table has no Copies row');
  else if (+copiesRow[1] !== sensitive.composite.copies || +copiesRow[2] !== sensitive.governed.copies)
    fail(t.rel, `sensitive stream copies ${copiesRow[1]}/${copiesRow[2]} disagree with the model ${sensitive.composite.copies}/${sensitive.governed.copies}`);
}

/* ── The built site ─────────────────────────────────────────────────────── */

function verifyDist() {
  if (!fs.existsSync(DIST)) return fail('dist', 'no build; run astro build first');
  const pages = [];
  const walkHtml = (dir) => {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) { if (d.name !== 'pagefind') walkHtml(p); }
      else if (d.name.endsWith('.html')) pages.push(p);
    }
  };
  walkHtml(DIST);
  if (!pages.length) fail('dist', 'no pages');
  for (const p of pages) {
    const rel = path.relative(DIST, p);
    const html = fs.readFileSync(p, 'utf8');
    // Every page, because every page will state the law or link to it.
    if (!html.includes('data-disclaimer')) fail(rel, 'no disclaimer (render <Disclaimer />)');
    scanVendors(rel, html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '));
  }
  return pages.length;
}

/* ── Run ────────────────────────────────────────────────────────────────── */

const distMode = process.argv.includes('--dist');
const count = distMode ? verifyDist() : (verifyBundle(), null);

if (problems.length) {
  console.error(`verify: FAILED, ${problems.length} problem${problems.length === 1 ? '' : 's'}\n`);
  for (const p of problems.slice(0, 60)) console.error(`  ${p}`);
  if (problems.length > 60) console.error(`  … and ${problems.length - 60} more`);
  process.exit(1);
}
console.log(distMode ? `verify: ${count} built pages, each with the disclaimer and no vendor named` : 'verify: knowledge base sound');
