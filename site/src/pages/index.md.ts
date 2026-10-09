/** The whole site as one markdown document (SPEC §4.5), generated from the
 *  same knowledge base and the same functions as the pages, so the two
 *  cannot drift. The prototype's markdown twin once described a retired
 *  version of itself because it was generated from a different file. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { articles, rights, chapters, milestones, totals, articleHref } from '@lib/knowledge';
import { traceData } from '@lib/trace-data';
import { rulebookData } from '@lib/rulebook-data';
import { section } from '@lib/rulebook-data';
import { longDate } from '@lib/phases';
import { DISCLAIMER } from '@lib/disclaimer';
import { SITE_NAME } from '@lib/scope';
import { abs } from '@lib/abs';

export const GET: APIRoute = async () => {
  const A = Object.fromEntries((await articles()).map((a) => [a.data.article, a]));
  const R = await rights();
  const C = await chapters();
  const M = Object.values(await milestones());
  const Tt = await totals();
  const T = await traceData();
  const RB = await rulebookData();
  const instruments = (await getCollection('instruments')).filter((i) => i.data.type === 'Instrument');
  const d = (x: Date) => longDate(x.toISOString().slice(0, 10));
  const L: string[] = [];

  L.push(`# ${SITE_NAME}`, '');
  L.push('Where a building’s data goes, who holds it at each step, and what the law says its owner is owed there.', '');
  L.push(`> ${DISCLAIMER}`, '');
  L.push(`Pages: [landing](${abs('/')}) · [the trace](${abs('/trace/')}) · [the rulebook](${abs('/rulebook/')}) · [the EU Data Act](${abs('/law/eu-data-act/')}) · [the rights](${abs('/rights/')}) · [sources](${abs('/sources/')}) · [knowledge base](${abs('/knowledge/index.md')})`, '');

  L.push('## The trace', '');
  L.push(`${T.intro}`, '');
  L.push('An illustrative building. Two ways to build its systems: from several makers’ parts (composite), or with one company running the path (governed). Counts follow stated definitions, not a measurement.', '');
  L.push('| Stop | Place | The event becomes | Several makers: held by | One maker: held by | Copies · companies · handoffs (several / one) |', '| --- | --- | --- | --- | --- | --- |');
  T.cards.forEach((c, i) => {
    const a = T.paths.composite.totals[i], b = T.paths.governed.totals[i];
    L.push(`| ${c.n} ${c.title} | ${c.place} | ${c.becomes} | ${c.holders.composite} | ${c.holders.governed} | ${a.copies} · ${a.hands} · ${a.seams} / ${b.copies} · ${b.hands} · ${b.seams} |`);
  });
  L.push('', `Both ways make ${Tt.composite.copies} copies. ${Tt.composite.hands} companies hold them in the composite stack and ${Tt.governed.hands} in the governed path; the data changes hands ${Tt.composite.seams} times against ${Tt.governed.seams}, before the owner sends it anywhere. Camera footage of the same moment leaves the site in the first and stays on site in the second.`, '');

  L.push('## The rights', '');
  for (const r of R) {
    L.push(`### ${r.data.title}`, '', `${r.data.description}`, '');
    for (const p of section(r.body, 'The right').slice(1)) L.push(p, '');
    L.push(`When: ${r.data.phases.map((p) => `${d(p.date)}, ${p.what.toLowerCase()}`).join('; ')}. Articles: ${r.data.articles.map((n) => `[${n}](${abs(articleHref(n))})`).join(', ')}. [Page](${abs(`/rights/${r.id}/`)})`, '');
  }

  L.push('## What to ask', '');
  for (const i of instruments) {
    const ask = section(i.body, 'The ask')[0];
    L.push(`- **${i.data.title}** (${i.data.cite}): ${i.data.description} ${ask ? `Ask: ${ask}` : ''}`);
  }
  L.push('');

  L.push('## Outside the EU', '');
  for (const v of RB.views.filter((v) => !v.pending)) {
    L.push(`### ${v.name}`, '');
    for (const g of v.groups) for (const r of g.rows) {
      L.push(r.kind === 'absent' ? `- ${r.cite.replace(/^In the EU: /, 'Instead of “')}”: ${r.label}` : `- Ask, ${r.cite}: ${r.label}${r.detail.ask ? ` ${r.detail.ask}` : ''}`);
    }
    L.push('');
  }

  L.push('## The EU Data Act', '', 'Regulation (EU) 2023/2854. Amendments are proposed in the Digital Omnibus and not agreed; it applies as written.', '');
  for (const m of M) L.push(`- ${d(m.date)}: ${m.name}`);
  L.push('');
  for (const c of C) {
    L.push(`### Chapter ${c.numeral}: ${c.name}`, '');
    for (const n of c.articles) L.push(`- [Article ${n}](${abs(articleHref(n))}), ${A[n].data.title.replace(/^Article \d+ — /, '')}: ${section(A[n].body, 'Plain reading')[0] ?? ''}`);
    L.push('');
  }

  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
