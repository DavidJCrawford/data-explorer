/** The site's name, in one place: the masthead, every page title and the
 *  landing page read it from here. Plain on purpose (SPEC §9). */
export const SITE_NAME = 'Data Explorer';

/** What this site is about, in one place, as the siblings hold a season or a
 *  river. Everything the site draws happens to this one event in this one
 *  building; a second building would be a second entry. */
export const SUBJECT = {
  event: 'Front entrance, 07:42',
  building: 'A four-storey office',
  /** The jurisdiction the rulebook opens on. */
  jurisdiction: 'eu',
} as const;

/** Where a concept in the knowledge base can be read. Until phase 6 publishes
 *  the bundle with the site, that is the repository. Change this one function
 *  then and every source link follows. */
const REPO = 'https://github.com/DavidJCrawford/data-explorer/blob/main/Docs/knowledge';
export const kb = (concept: string): string => `${REPO}/${concept.replace(/^\//, '')}.md`;

/** The Data Act in the Official Journal. */
export const DATA_ACT_ELI = 'https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng';
