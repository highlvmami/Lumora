import { json, type Env } from '../../_lib/auth';

// Yönetici yazıları: herkese açık liste (başlık, açıklama, tarih). İçerik tek tek okunur.
export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const lang = new URL(request.url).searchParams.get('lang');
  const { keys } = (await env.FAVORITES?.list({ prefix: 'post:' })) ?? { keys: [] };
  const posts = keys
    .map((k) => k.metadata as { slug: string; title: string; description: string; lang: string; date: string } | undefined)
    .filter((m): m is NonNullable<typeof m> => Boolean(m) && (!lang || m!.lang === lang))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return json({ posts }, 200, { 'Cache-Control': 'public, max-age=15' });
};
