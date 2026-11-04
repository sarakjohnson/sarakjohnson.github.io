import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema-first is deliberate: a half-written case study fails the build rather
// than shipping a page with a missing spec row or no metrics.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  // The image() helper resolves paths at build time, so a broken reference
  // fails the build instead of shipping a missing image.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      role: z.string(),
      period: z.string(),
      teamSize: z.string(),
      // One line on what changed because you were there. Shown on the index and as the lede.
      oneLiner: z.string(),
      // Which hat you wore. Drives the grouping on /work so product-owned work
      // leads and engineering-owned work is labelled rather than blurred into it.
      roleType: z.enum(['product', 'engineering']),
      // Controls order within a group — lower first.
      order: z.number().int(),
      featured: z.boolean().default(false),
      stack: z.array(z.string()).min(1),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            note: z.string().optional(),
          }),
        )
        .min(1)
        .max(4),
      // Rendered as an "Artifacts" section at the end of the case study.
      // alt is required because these carry real information, not decoration.
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
