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
