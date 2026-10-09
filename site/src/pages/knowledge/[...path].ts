/** The knowledge base, published as it is (SPEC §4.5): every file under
 *  Docs/knowledge served at the same path under /knowledge/, so an agent can
 *  read the source of everything the site says. Plain markdown, unchanged;
 *  its links are bundle-relative, as OKF writes them. */
import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const BUNDLE = path.resolve(process.cwd(), '../Docs/knowledge');

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith('.md') ? [path.join(dir, d.name)] : []);
}

/** A concept marked `publish: false` stays out (the Trends Report article,
 *  until it is published). */
const held = (f: string) => /^publish:\s*false\s*$/m.test(fs.readFileSync(f, 'utf8').split('\n---')[0]);

export const getStaticPaths = (() =>
  walk(BUNDLE).filter((f) => !held(f)).map((f) => ({ params: { path: path.relative(BUNDLE, f).split(path.sep).join('/') } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(fs.readFileSync(path.join(BUNDLE, params.path!), 'utf8'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
