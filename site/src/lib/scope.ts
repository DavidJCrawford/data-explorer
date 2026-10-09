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
