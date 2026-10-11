import { json, requireAdmin, type Env } from '../../_lib/auth';

const SLUG = /^[a-z0-9-]{1,80}$/;

type Ctx = { request: Request; env: Env; params: { slug: string } };

export const onRequestGet = async ({ env, params }: Ctx) => {
  if (!SLUG.test(params.slug)) return json({ error: 'bulunamadı' }, 404);
  const raw = await env.FAVORITES?.get(`post:${params.slug}`);
  return raw ? new Response(raw, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } }) : json({ error: 'bulunamadı' }, 404);
};

// Oluşturur ya da günceller (aynı adres).
export const onRequestPut = async ({ request, env, params }: Ctx) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  if (!SLUG.test(params.slug)) return json({ error: 'geçersiz adres' }, 400);

  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const str = (v: unknown, max: number) => (typeof v === 'string' && v.trim() && v.length <= max ? v.trim() : null);
  const title = str(b?.title, 120);
  const description = str(b?.description, 240);
  const body = str(b?.body, 50000);
  const lang = b?.lang === 'tr' || b?.lang === 'en' ? b.lang : null;
  const date = typeof b?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b.date) ? b.date : new Date().toISOString().slice(0, 10);
  if (!title || !description || !body || !lang) return json({ error: 'başlık, açıklama, dil ve metin gerekli' }, 400);

  const meta = { slug: params.slug, title, description, lang, date };
  // KV üst verisi 1024 bayttır; Türkçe karakterler ve emojiler bayt sayısını artırır.
  if (new TextEncoder().encode(JSON.stringify(meta)).length > 1000) return json({ error: 'başlık ve açıklama çok uzun' }, 400);

  await env.FAVORITES!.put(`post:${params.slug}`, JSON.stringify({ ...meta, body }), { metadata: meta });
  return json(meta);
};

export const onRequestDelete = async ({ request, env, params }: Ctx) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  if (!SLUG.test(params.slug)) return json({ error: 'geçersiz adres' }, 400);
  await env.FAVORITES!.delete(`post:${params.slug}`);
  return json({ ok: true });
};
