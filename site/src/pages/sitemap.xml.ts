/** Every page, from the same collections the pages are built from. */
import type { APIRoute } from 'astro';
import { articles, rights, articleHref } from '@lib/knowledge';
import { abs } from '@lib/abs';

export const GET: APIRoute = async () => {
  const paths = [
    '/', '/trace/', '/rulebook/', '/law/eu-data-act/', '/rights/', '/sources/',
    ...(await articles()).map((a) => articleHref(a.data.article)),
    ...(await rights()).map((r) => `/rights/${r.id}/`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${abs(p)}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
