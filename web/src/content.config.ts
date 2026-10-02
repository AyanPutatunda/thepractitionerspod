import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const episodes = defineCollection({
  // Files starting with "_" (like _TEMPLATE.md) are ignored.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/episodes' }),
  schema: z.object({
    title: z.string(),
    number: z.number().int().nonnegative(),
    season: z.number().int().positive().default(1),
    description: z.string(),
    pubDate: z.coerce.date(),
    duration: z.string().optional(),
    guests: z
      .array(
        z.object({
          name: z.string(),
          role: z.string().optional(),
          company: z.string().optional(),
          url: z.url().optional(),
        }),
      )
      .default([]),
    topics: z.array(z.string()).default([]),
    youtubeId: z.string().optional(),
    spotifyEpisodeId: z.string().optional(),
    appleUrl: z.url().optional(),
    audioUrl: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { episodes };
