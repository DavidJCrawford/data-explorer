import type { APIRoute } from 'astro';
import { iconPng } from '@lib/icon-png';

export const GET: APIRoute = async () =>
  new Response(await iconPng(32), { headers: { 'Content-Type': 'image/png' } });
