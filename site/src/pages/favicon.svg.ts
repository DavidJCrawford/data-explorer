import type { APIRoute } from 'astro';
import { logoSvg } from '@lib/logo';

export const GET: APIRoute = async () =>
  new Response(await logoSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
