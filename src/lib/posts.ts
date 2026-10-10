import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'posts'> & { slug: string; lang: Lang };

// Dosya yolu `<adres>/<dil>` → adres ve dil ayrılır.
export async function getPosts(lang?: Lang): Promise<Post[]> {
  const all = await getCollection('posts');
  const posts = all.map((p) => {
    const [slug, l] = p.id.split('/');
    return { ...p, slug, lang: l as Lang };
  });
  return posts
    .filter((p) => !lang || p.lang === lang)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function hasPost(lang: Lang, slug: string) {
  return (await getPosts(lang)).some((p) => p.slug === slug);
}
