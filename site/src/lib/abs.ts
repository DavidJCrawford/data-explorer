/** Absolute URLs, for the files agents and crawlers read off-site
 *  (llms.txt, index.md, sitemap.xml, robots.txt). */
import { u } from './url';

const SITE = 'https://davidjcrawford.github.io';
export const abs = (path: string): string => `${SITE}${u(path)}`;
