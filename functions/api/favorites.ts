import { json, readSession, type Env } from '../_lib/auth';

const KEY = 'favorites';
const SLUG = /^[a-z0-9-]{1,60}$/;

async function load(env: Env): Promise<string[]> {
  try {
    const parsed = JSON.parse((await env.FAVORITES?.get(KEY)) || '[]');
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string' && SLUG.test(s)) : [];
  } catch {
    return [];
  }
}

// Herkes okuyabilir: ana sayfa öne çıkanları buradan seçer.
export const onRequestGet = async ({ env }: { env: Env }) =>
  json({ slugs: await load(env), configured: Boolean(env.FAVORITES) }, 200, { 'Cache-Control': 'public, max-age=15' });

// Yalnızca giriş yapmış yönetici yazabilir.
export const onRequestPut = async ({ request, env }: { request: Request; env: Env }) => {
  if (!(await readSession(env, request))) return json({ error: 'yetkisiz' }, 401);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'yasak' }, 403);
  if (!env.FAVORITES) return json({ error: 'KV ayarlanmamış' }, 503);

  const body = (await request.json().catch(() => null)) as { slugs?: unknown } | null;
  const slugs = body?.slugs;
  if (!Array.isArray(slugs) || slugs.length > 12 || !slugs.every((s) => typeof s === 'string' && SLUG.test(s))) {
    return json({ error: 'geçersiz liste' }, 400);
  }
  const unique = [...new Set(slugs as string[])];
  await env.FAVORITES.put(KEY, JSON.stringify(unique));
  return json({ slugs: unique });
};
