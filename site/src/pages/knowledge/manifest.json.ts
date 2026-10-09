/** A manifest of the published knowledge base: every concept's path, type,
 *  title, description and status, so an agent can choose what to read
 *  without reading everything. Built from the same collection the pages use. */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { u } from '@lib/url';

export const GET: APIRoute = async () => {
  const all = (await getCollection('knowledge')).filter((c) => c.data.publish !== false).sort((a, b) => a.id.localeCompare(b.id));
  const body = {
    format: 'Open Knowledge Format',
    okf_version: '0.2',
    index: u('/knowledge/index.md'),
    log: u('/knowledge/log.md'),
    note: 'Not legal advice. Legal concepts carry legal_review: none: the author\'s reading, not reviewed by a lawyer.',
    concepts: all.map((c) => ({
      path: u(`/knowledge/${c.id}.md`),
      type: c.data.type,
      title: c.data.title,
      description: c.data.description ?? null,
      status: c.data.status,
      legal_review: c.data.legal_review ?? null,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
