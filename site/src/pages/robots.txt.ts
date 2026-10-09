/** Everyone is welcome, AI crawlers by name: the site is written to be read
 *  by agents as well as people (SPEC §4.5). */
import type { APIRoute } from 'astro';
import { abs } from '@lib/abs';

const NAMED = ['GPTBot', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended'];

export const GET: APIRoute = () => new Response([
  ...NAMED.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
  'User-agent: *', 'Allow: /', '',
  `Sitemap: ${abs('/sitemap.xml')}`, '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
