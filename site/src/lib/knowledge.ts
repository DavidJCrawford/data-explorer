/** Reading the knowledge base. Pages go through these rather than calling
 *  getCollection themselves, so the ordering and the shapes they rely on are
 *  decided once. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { ledger } from './ledger.mjs';

export type Trace = CollectionEntry<'trace'>['data'];

export async function trace(): Promise<Trace> {
  const e = await getEntry('trace', 'the-trace');
  if (!e) throw new Error('Docs/knowledge/building/the-trace.md is missing');
  return e.data;
}

/** Articles in statute order. */
export async function articles() {
  return (await getCollection('articles')).sort((a, b) => a.data.article - b.data.article);
}

/** Rights in the bundle's own order: rights/index.md lists them as read. */
const RIGHT_ORDER = ['yours', 'share', 'born-open', 'leave', 'fair-terms', 'borders', 'event-log'];
export async function rights() {
  return (await getCollection('rights')).sort((a, b) => RIGHT_ORDER.indexOf(a.id) - RIGHT_ORDER.indexOf(b.id));
}

/** Final totals for both archetypes. */
export async function totals() {
  const t = await trace();
  const last = <T>(xs: T[]) => xs[xs.length - 1];
  return {
    hops: t.hops.length,
    composite: last(ledger(t.hops, 'composite')),
    governed: last(ledger(t.hops, 'governed')),
  };
}

/** The Data Act's milestones by id. */
export async function milestones() {
  const e = await getEntry('milestones', 'milestones');
  if (!e) throw new Error('Docs/knowledge/law/eu-data-act/milestones.md is missing');
  return Object.fromEntries(e.data.milestones.map((m) => [m.id, m]));
}

/** A concept from the whole bundle by its path, e.g. 'law/eu-data-act/actors'. */
export async function concept(id: string) {
  const e = await getEntry('knowledge', id);
  if (!e) throw new Error(`Docs/knowledge/${id}.md is missing`);
  return e;
}

/** The Act's roles, by id (law/eu-data-act/actors.md). */
export async function actors(): Promise<Record<string, string>> {
  const list = (await concept('law/eu-data-act/actors')).data.actors as { id: string; name: string }[];
  return Object.fromEntries(list.map((a) => [a.id, a.name]));
}

/** The Act's chapters, in order (law/eu-data-act/chapters.md). */
export async function chapters(): Promise<{ numeral: string; name: string; articles: number[] }[]> {
  return (await concept('law/eu-data-act/chapters')).data.chapters as { numeral: string; name: string; articles: number[] }[];
}

/** An article's page, by number. One helper, so no page builds this by hand. */
export const articleHref = (n: number) => `/law/eu-data-act/article-${n}/`;
