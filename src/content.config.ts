import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const text = z.object({ tr: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    status: z.enum(['live', 'beta', 'development']),
    category: text,
    tagline: text,
    description: text,
    features: z.object({ tr: z.array(z.string()), en: z.array(z.string()) }),
    tech: z.array(z.string()),
    repo: z.string(),
    links: z
      .array(z.object({ label: text, url: z.string().url() }))
      .default([]),
    accent: z.string(),
    icon: z.string(),
    screenshots: z
      .array(z.object({ src: z.string(), alt: text, portrait: z.boolean().default(false) }))
      .default([]),
    note: text.optional(),
  }),
});

// Blog yazıları: src/content/posts/<adres>/tr.md ve en.md (iki dil de zorunlu değil).
const posts = defineCollection({
  loader: glob({ pattern: '*/{tr,en}.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    project: z.string().optional(),
  }),
});

export const collections = { projects, posts };
