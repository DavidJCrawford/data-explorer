/** The rulebook (SPEC §4.3), worked out at build time.
 *
 *  Columns are the trace's six stops, in the same order, plus one for what
 *  sits alongside the path (the camera, the sensors, the FM's screen, local
 *  AI). Rows are the seven rights ("what the owner is owed") and the
 *  instruments around them ("what to ask"). Each row knows which columns it
 *  reaches and the dated phases it comes into force by; the page draws every
 *  jurisdiction's rows at build time and the script only switches between
 *  them and moves the date.
 *
 *  Where a jurisdiction has nothing in a row's place, the row stays and says
 *  so: the absence is the content.
 */
import { getCollection } from 'astro:content';
import { trace, rights as getRights, articles as getArticles } from './knowledge';
import { PLACES } from './section';
import type { Phase } from './phases';
export type { Phase } from './phases';

/** Plain text of the paragraphs under a heading in a concept's body: links
 *  reduced to their words, footnote markers and emphasis removed. */
export function section(body: string | undefined, heading: string): string[] {
  const s = body?.split(new RegExp(`^# ${heading}\\n`, 'm'))[1]?.split(/\n# /)[0] ?? '';
  return s.trim().split(/\n\n+/)
    // An italic-only paragraph is the bundle's own register note ("*Paraphrase.*");
    // pages print their own, so drop it before emphasis is stripped.
    .filter((p) => p && !p.startsWith('|') && !p.startsWith('[^') && !/^\*[^*].*\*$/.test(p.trim()))
    .map((p) => p.replace(/^>\s?/gm, '').replace(/\[\^[^\]]+\]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*?([^*]+)\*\*?/g, '$1').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

const phaseList = (ps: { date: Date; what: string }[] = []): Phase[] =>
  ps.map((p) => ({ date: p.date.toISOString().slice(0, 10), what: p.what }));

export interface Row {
  key: string;                 // unique within a jurisdiction
  kind: 'right' | 'ask' | 'absent';
  label: string;
  cite: string;
  cells: boolean[];
  phases: Phase[];
  status?: string;             // for absent rows: none | sector | powers-only
  detail: Detail;
}
export interface Detail {
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  ask?: string;
  articles?: { n: number; title: string; precise: string; plain: string }[];
  stops: number[];
  links: { label: string; href: string }[];
  context?: string;
}

export async function rulebookData() {
  const T = await trace();
  const R = await getRights();
  const A = Object.fromEntries((await getArticles()).map((a) => [a.data.article, a]));
  const components = await getCollection('components');
  const instruments = Object.fromEntries((await getCollection('instruments')).map((i) => [i.id, i]));
  const jurisdictions = await getCollection('jurisdictions');

  /* Columns: the stops, then everything alongside the path. */
  const onPath = T.hops.map((h) => h.component);
  const alongside = components.map((c) => c.id).filter((id) => !onPath.includes(id));
  const columns = [
    ...T.hops.map((h) => ({ n: h.n as number | null, label: PLACES[h.component].label, place: h.place, line: !!h.crosses_property_line })),
    { n: null, label: 'Alongside', place: alongside.map((id) => components.find((c) => c.id === id)?.data.title ?? id).join(', '), line: false },
  ];
  const cellsFor = (ids: string[]) => [...onPath.map((c) => ids.includes(c)), alongside.some((c) => ids.includes(c))];
  const stopsFor = (ids: string[]) => T.hops.filter((h) => ids.includes(h.component)).map((h) => h.n);
  /** Where an instrument applies: the components whose asks name it. */
  const placedBy = (id: string) => components.filter((c) => c.data.asks.includes(id)).map((c) => c.id);

  const rightRow = (r: (typeof R)[number]): Row => ({
    key: r.id, kind: 'right', label: r.data.title,
    cite: r.data.articles.map((n) => `Art. ${n}`).join(' · '),
    cells: cellsFor(r.data.attaches_to), phases: phaseList(r.data.phases),
    detail: {
      eyebrow: 'What the owner is owed · EU Data Act',
      title: r.data.title,
      lead: r.data.description,
      paragraphs: section(r.body, 'The right').slice(1),
      articles: r.data.articles.map((n) => ({
        n, title: A[n]?.data.title.replace(/^Article \d+ — /, '') ?? '',
        precise: section(A[n]?.body, 'Precise reading')[0] ?? '',
        plain: section(A[n]?.body, 'Plain reading')[0] ?? '',
      })),
      stops: stopsFor(r.data.attaches_to),
      links: [{ label: 'Regulation (EU) 2023/2854', href: 'https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng' }],
    },
  });

  const instrumentRow = (id: string): Row => {
    const i = instruments[id];
    const at = placedBy(id);
    return {
      key: id, kind: 'ask', label: i.data.description ?? i.data.title, cite: i.data.title,
      cells: cellsFor(at), phases: phaseList(i.data.phases),
      detail: {
        eyebrow: `What to ask · ${i.data.title}`,
        title: i.data.description ?? i.data.title,
        lead: i.data.cite,
        paragraphs: [...section(i.body, 'The question it answers').slice(1), ...section(i.body, 'For a facilities manager')],
        ask: section(i.body, 'The ask')[0],
        stops: stopsFor(at),
        links: i.data.resource ? [{ label: i.data.cite ?? i.data.title, href: i.data.resource }] : [],
      },
    };
  };

  const groups = (rows: Row[]) => [
    { title: 'What the owner is owed', rows: rows.filter((r) => r.kind !== 'ask') },
    { title: 'What to ask', rows: rows.filter((r) => r.kind === 'ask') },
  ];

  const order = ['eu', 'uk', 'nz', 'au', 'us'];
  const views = jurisdictions
    .sort((a, b) => order.indexOf(a.data.jurisdiction) - order.indexOf(b.data.jurisdiction))
    .map((j) => {
      const rb = j.data.rulebook;
      const sources = (j.data.sources ?? []).map((s) => ({ label: s.title ?? s.resource, href: s.resource }));
      if ('source' in rb) {
        const rows = [
          ...R.map(rightRow),
          ...Object.values(instruments).filter((i) => i.data.type === 'Instrument').map((i) => instrumentRow(i.id)),
        ];
        return { id: j.data.jurisdiction, name: j.data.title, groups: groups(rows), pending: true };
      }
      const rows: Row[] = [
        ...R.map((r): Row => {
          const x = rb.rights[r.id];
          return {
            key: r.id, kind: 'absent', label: x.note, cite: `In the EU: ${r.data.title}`,
            cells: cellsFor([]), phases: [], status: x.status,
            detail: {
              eyebrow: `What the owner is owed · ${j.data.title}`,
              title: x.status === 'none' ? 'No equivalent right' : x.status === 'sector' ? 'Only in designated sectors' : 'Powers, not yet a right',
              lead: x.note,
              context: `In the EU: ${r.data.title} ${r.data.description ?? ''}`.trim(),
              paragraphs: [], stops: [], links: sources,
            },
          };
        }),
        ...rb.asks.map((a): Row => {
          if ('instrument' in a) return instrumentRow(a.instrument);
          const at = placedBy(a.placed_like);
          return {
            key: a.id, kind: 'ask', label: a.question, cite: a.name,
            cells: cellsFor(at), phases: phaseList(a.phases),
            detail: {
              eyebrow: `What to ask · ${a.name}`, title: a.question, lead: a.cite,
              paragraphs: [], ask: a.ask, stops: stopsFor(at), links: [{ label: a.name, href: a.url }],
            },
          };
        }),
      ];
      return { id: j.data.jurisdiction, name: j.data.title, groups: groups(rows), pending: false };
    });

  /* Every date anything comes into force, for the scrubber's ticks. */
  const dates = [...new Set(views.flatMap((v) => v.groups.flatMap((g) => g.rows.flatMap((r) => r.phases.map((p) => p.date)))))].sort();

  return { columns, views, dates, range: { from: '2024-01-01', to: '2028-12-31' } };
}

export type RulebookData = Awaited<ReturnType<typeof rulebookData>>;
