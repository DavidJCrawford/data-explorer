/** llms.txt: what the site is and where to start, for language models. */
import type { APIRoute } from 'astro';
import { DISCLAIMER } from '@lib/disclaimer';
import { SITE_NAME } from '@lib/scope';
import { abs } from '@lib/abs';

export const GET: APIRoute = () => new Response([
  `# ${SITE_NAME}`,
  '',
  '> One door event in an illustrative office building, followed from the reader on the front door to the cloud: who holds the data at each step, how many copies and companies there are, and what the EU Data Act and the instruments around it say the building’s owner is owed there. Also the UK, New Zealand, Australia and the United States.',
  '',
  DISCLAIMER,
  '',
  '## Start here',
  '',
  `- [The whole site as markdown](${abs('/index.md')}): the trace, the rights, what to ask, other countries and every article, in one file`,
  `- [The knowledge base manifest](${abs('/knowledge/manifest.json')}): every concept the site is built from, with its type, title and description (Open Knowledge Format)`,
  `- [The knowledge base index](${abs('/knowledge/index.md')})`,
  '',
  '## Pages',
  '',
  `- [The trace](${abs('/trace/')}): the interactive path; \`?hop=0-5&path=composite|governed\` opens at a stop`,
  `- [The rulebook](${abs('/rulebook/')}): the law laid along the same stops; \`?j=eu|uk|nz|au|us&at=YYYY-MM-DD&sel=<row>\``,
  `- [The EU Data Act](${abs('/law/eu-data-act/')}): all fifty articles, each with its own page`,
  `- [The rights](${abs('/rights/')}): seven, in plain words`,
  `- [Sources](${abs('/sources/')}): sources, method, and the definitions behind the counts`,
  '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
