/** Everything the trace needs, worked out at build time from the knowledge
 *  base and the section's geometry. The page renders the cards and marks from
 *  this, and hands the client script only the numbers it moves with.
 *
 *  Coordinates here are the drawing's 2D units: the 3D model in
 *  lib/section.ts projected isometrically (`iso`), y down.
 */
import { getCollection } from 'astro:content';
import { trace, rights } from './knowledge';
import { ledger, steps } from './ledger.mjs';
import { PLACES, RUNS, PROPERTY, EXTENT, FOOTAGE_LINE, LOT_Z, iso } from './section';

export type Path = 'composite' | 'governed';
export const PATHS: Path[] = ['composite', 'governed'];
export type { Pt } from './geometry';
import { along, length, dist, type Pt } from './geometry';

/** Plain text from the first paragraph under a markdown heading. */
function para(body: string | undefined, heading: string): string {
  const s = body?.split(`# ${heading}\n`)[1]?.trim().split('\n\n')[0] ?? '';
  return s.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
}

export async function traceData() {
  const T = await trace();
  const entry = (await getCollection('trace'))[0];
  const R = await rights();
  const components = Object.fromEntries((await getCollection('components')).map((c) => [c.id, c]));
  const instruments = Object.fromEntries((await getCollection('instruments')).map((c) => [c.id, c]));

  /* The event's route, leg by leg. Leg n arrives at hop n. A leg that does not
     begin where the last one ended is a jump: the copy sent to the third party
     leaves from the cloud, not from the model. */
  const legs = T.hops.slice(1).map((h, i) => {
    const run = RUNS.find((r) => r.stream === 'event' && r.to === h.component);
    if (!run) throw new Error(`no event run arrives at ${h.component}`);
    const points = run.points.map((p) => iso(p) as Pt);
    /* Segments, so the travelled route can be drawn as the reference draws
       it: solid along a floor or duct, dotted where it drops between them. */
    let acc = 0;
    const segs = run.points.slice(1).map((b3, k) => {
      const a3 = run.points[k];
      const a = points[k], b = points[k + 1], len = dist(a, b);
      const drop = a3[0] === b3[0] && a3[1] === b3[1];
      // Fast where there is nothing to look at: dropping between floors, or in a duct.
      const s = { a, b, from: acc, len, drop, fast: drop || (a3[2] < LOT_Z && b3[2] < LOT_Z) };
      acc += len;
      return s;
    });
    return { n: h.n, points, segs, run, length: length(points), jump: run.from !== T.hops[i].component };
  });
  const at = [0];
  for (const l of legs) at.push(at[at.length - 1] + l.length);

  /* Where the event crosses the property line: found in the 3D model (the
     duct passing the lot's far edge, underground), then measured along the
     drawn line. The projection is linear, so the fraction along a segment is
     the same in both. */
  const crossLeg = T.hops.findIndex((h) => h.crosses_property_line);
  const cl = legs[crossLeg - 1];
  let cross = -1;
  for (const s of cl.segs) {
    const k = cl.segs.indexOf(s), a3 = cl.run.points[k], b3 = cl.run.points[k + 1];
    if ((a3[0] - PROPERTY.x1) * (b3[0] - PROPERTY.x1) <= 0 && a3[0] !== b3[0]) {
      cross = s.from + Math.abs((PROPERTY.x1 - a3[0]) / (b3[0] - a3[0])) * s.len;
      break;
    }
  }
  if (cross < 0) throw new Error('the event never crosses the property line on the leg that should cross it');

  const stops = T.hops.map((h) => { const [x, y] = iso(PLACES[h.component].at); return { n: h.n, x, y }; });

  /* Per archetype: running totals, what happened at each hop, the seam ticks
     (at the middle of the leg the data changed hands on) and the copies left
     behind (small marks beside the stop, one per copy). */
  /** Short names for a party, for the ledger's one-line chain. */
  const short = (h: string) => ({ C: 'Brand C', D: 'Host D', E: 'AI provider E', S: 'The steward', R: 'Recipient R' } as Record<string, string>)[h] ?? `Maker ${h}`;

  const paths = Object.fromEntries(PATHS.map((path) => {
    const tot = ledger(T.hops, path);
    const st = steps(T.hops, path);
    const seams = st.filter((s) => s.seam).map((s) => {
      const l = legs[s.n - 1];
      const { p, dir } = along(l.points, l.length / 2);
      return { n: s.n, x: p[0], y: p[1], dx: dir[0], dy: dir[1], from: s.seam!.from, to: s.seam!.to, chosen: s.seam!.chosen };
    });
    const copies = st.flatMap((s) => Array.from({ length: s.made }, (_, k) => {
      const a = stops[s.n];
      // Beside the ring, away from the label, one mark per copy.
      const p = PLACES[T.hops[s.n].component];
      const side = (p.dx ?? 2) > 0 ? -1 : 1;
      return { n: s.n, x: a.x + side * (0.95 + k * 0.5), y: a.y + 0.55 };
    }));
    const chain = st.map((s) => {
      const parts = [s.holders.map(short).join(' + ')];
      if (s.made) parts.push(s.made === 1 ? '1 copy' : `${s.made} copies`);
      if (s.seam) parts.push(s.seam.chosen ? 'sent at the owner’s request' : `seam ${s.seam.from.join('+')}→${s.seam.to.join('+')}`);
      return parts.filter(Boolean).join(' · ');
    });
    return [path, { totals: tot, steps: st, seams, copies, chain }];
  })) as Record<Path, {
    totals: ReturnType<typeof ledger>;
    steps: ReturnType<typeof steps>;
    seams: { n: number; x: number; y: number; dx: number; dy: number; from: string[]; to: string[]; chosen: boolean }[];
    copies: { n: number; x: number; y: number }[];
    chain: string[];
  }>;

  /* The camera footage: where its copies sit, inside and beyond. */
  /* The footage's marks: its copy in the recorder, its copy in the cloud
     (where its route ends), and where it would cross the property line. */
  const footRun = RUNS.find((r) => r.stream === 'sensitive' && r.only === 'composite')!;
  const footage = {
    recorder: iso(PLACES.recorder.at) as Pt,
    cloud: iso(footRun.points[footRun.points.length - 1]) as Pt,
    crossAt: iso(FOOTAGE_LINE) as Pt,
    onSite: T.sensitive.on_site,
    beyond: { composite: T.sensitive.composite, governed: T.sensitive.governed },
  };

  /* The ask for a component: its first instrument's question and the ask
     itself, from the instrument's "# The ask" blockquote. */
  const askFor = (component: string) => {
    const id = components[component]?.data.asks[0];
    const inst = id ? instruments[id] : undefined;
    if (!inst) return null;
    const ask = inst.body?.split('# The ask\n')[1]?.trim().split('\n\n')[0].replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim();
    return { name: inst.data.title, question: inst.data.description ?? '', ask: ask ?? '' };
  };

  const names = (holders: string[]) => holders.map((h) => T.parties[h]).join(' and ');
  const cards = T.hops.map((h) => {
    const c = components[h.component];
    return {
      n: h.n,
      place: h.place,
      title: c?.data.title ?? PLACES[h.component].label,
      line: c?.data.description ?? '',
      becomes: h.becomes,
      byRight: !!h.by_right,
      holders: { composite: names(h.composite.holders), governed: names(h.governed.holders) },
      rights: R.filter((r) => r.data.attaches_to.includes(h.component)).map((r) => ({ id: r.id, statement: r.data.title, articles: r.data.articles })),
      ask: askFor(h.component),
      alternative: h.alternative?.governed
        ? { title: components[h.alternative.governed]?.data.title ?? h.alternative.governed, line: components[h.alternative.governed]?.data.description ?? '', totals: paths.governed.totals[T.hops.findIndex((x) => x.crosses_property_line) - 1] }
        : null,
    };
  });

  return {
    intro: para(entry?.body, 'The event'),
    hops: T.hops.map((h) => ({ n: h.n, component: h.component, place: h.place, label: PLACES[h.component].label })),
    parties: T.parties,
    legs, at, stops, crossLeg, cross, footage, paths, cards,
    extent: EXTENT,
  };
}

export type TraceData = Awaited<ReturnType<typeof traceData>>;
