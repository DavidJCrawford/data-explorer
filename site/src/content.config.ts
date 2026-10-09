/** The knowledge base is the content (Docs/knowledge/decisions/okf-as-content-source.md).
 *
 *  Every collection here is a view over ../Docs/knowledge. There is no second
 *  copy of the content in JSON. The schemas are the contract between the bundle
 *  and the pages: a concept the site relies on that does not fit fails the
 *  build here, before scripts/verify.mjs checks what schemas cannot (links,
 *  references between concepts, staleness, the ledger).
 *
 *  `index.md` and `log.md` are reserved by OKF and are not concepts.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const BASE = '../Docs/knowledge';
const RESERVED = ['!**/index.md', '!**/log.md'];

/* The OKF families every concept may carry (OKF v0.2 §4–5), plus this
   project's own `legal_review`. Unknown keys pass through: OKF says consumers
   must not reject them. */
const actor = z.object({ by: z.string(), at: z.coerce.date() });
const concept = z.object({
  type: z.string().min(1),
  title: z.string(),
  description: z.string().optional(),
  resource: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'stable', 'deprecated']).default('stable'),
  generated: actor.optional(),
  verified: z.union([actor, z.array(actor)]).optional(),
  stale_after: z.coerce.date().optional(),
  legal_review: z.enum(['none', 'reviewed']).optional(),
  sources: z.array(z.object({ id: z.string().optional(), resource: z.string(), title: z.string().optional() })).optional(),
}).loose();

const ids = z.array(z.string());

export const collections = {
  /** Every concept in the bundle, loosely typed: for the raw publication, the
   *  agent surfaces and anything that only needs a title and a description. */
  knowledge: defineCollection({
    loader: glob({ base: BASE, pattern: ['**/*.md', ...RESERVED] }),
    schema: concept,
  }),

  articles: defineCollection({
    loader: glob({ base: `${BASE}/law/eu-data-act/articles`, pattern: ['article-*.md'] }),
    schema: concept.extend({
      type: z.literal('Statutory Article'),
      instrument: z.literal('eu-data-act'),
      article: z.number().int().min(1).max(50),
      chapter: z.string(),
      binds: ids,
      applies_from: z.coerce.date(),
      cross_refs: z.array(z.number().int()),
      attaches_to: ids,
      legal_review: z.enum(['none', 'reviewed']),
    }),
  }),

  rights: defineCollection({
    loader: glob({ base: `${BASE}/rights`, pattern: ['*.md', ...RESERVED] }),
    schema: concept.extend({
      type: z.literal('Right'),
      articles: z.array(z.number().int()),
      applies_from: z.coerce.date(),
      attaches_to: ids,
      pairs_with: ids,
      legal_review: z.enum(['none', 'reviewed']),
    }),
  }),

  components: defineCollection({
    loader: glob({ base: `${BASE}/building/components`, pattern: ['*.md', ...RESERVED] }),
    schema: concept.extend({
      type: z.literal('Building Component'),
      component: z.string(),
      layer: z.string(),
      data_classes: ids,
      articles: z.array(z.number().int()),
      asks: ids,
      sensitive: z.boolean().optional(),
    }),
  }),

  instruments: defineCollection({
    loader: glob({ base: `${BASE}/law/wider-rulebook`, pattern: ['*.md', ...RESERVED] }),
    schema: concept.extend({
      type: z.enum(['Instrument', 'Pending Amendment']),
      kind: z.string(),
      cite: z.string().optional(),
      attaches_to: ids.optional(),
      legal_review: z.enum(['none', 'reviewed']),
    }),
  }),

  jurisdictions: defineCollection({
    loader: glob({ base: `${BASE}/law/jurisdictions`, pattern: ['*.md', ...RESERVED] }),
    schema: concept.extend({
      type: z.literal('Jurisdiction'),
      jurisdiction: z.string(),
      device_data_right: z.enum(['general', 'powers-only', 'sector-designations', 'none']),
      legal_review: z.enum(['none', 'reviewed']),
    }),
  }),

  /** The Data Act's dates, as data. The rulebook's time axis and the landing
   *  page's lead read them from here. */
  milestones: defineCollection({
    loader: glob({ base: `${BASE}/law/eu-data-act`, pattern: ['milestones.md'] }),
    schema: concept.extend({
      milestones: z.array(z.object({
        id: z.string(),
        date: z.coerce.date(),
        name: z.string(),
        articles: z.array(z.number().int()),
      })),
    }),
  }),

  /** The trace: one concept, and the structured model the ledger is computed
   *  from. See lib/ledger.mjs. */
  trace: defineCollection({
    loader: glob({ base: `${BASE}/building`, pattern: ['the-trace.md'] }),
    schema: concept.extend({
      parties: z.record(z.string(), z.string()),
      hops: z.array(z.object({
        n: z.number().int(),
        component: z.string(),
        place: z.string(),
        becomes: z.string(),
        by_right: z.boolean().optional(),
        crosses_property_line: z.boolean().optional(),
        alternative: z.record(z.string(), z.string()).optional(),
        composite: z.object({ holders: ids, copies: z.number().int() }),
        governed: z.object({ holders: ids, copies: z.number().int() }),
      })),
      sensitive: z.object({
        component: z.string(),
        on_site: z.object({
          composite: z.object({ holders: ids, copies: z.number().int() }),
          governed: z.object({ holders: ids, copies: z.number().int() }),
        }),
        composite: z.object({ holders: ids, copies: z.number().int(), leaves_site: z.boolean() }),
        governed: z.object({ holders: ids, copies: z.number().int(), leaves_site: z.boolean() }),
      }),
    }),
  }),
};
