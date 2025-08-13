import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { CATEGORY_SLUGS } from "./categories";

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    isDraft: z.boolean().optional(),
    isFullWidth: z.boolean().optional(),
    responsibilities: z.array(z.string()).optional(),
    stack: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_SLUGS as [string, ...string[]]),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isDraft: z.boolean().optional(),
  }),
});

const apps = defineCollection({
  loader: glob({ base: "./src/content/apps", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    heroImage: z.string(),
    platform: z.array(z.string()),
    size: z.number().optional(),
    tags: z.array(z.string()).optional(),
    links: z
      .record(
        z.object({
          title: z.string(),
          href: z.string().url(),
        })
      )
      .optional(),
    isDraft: z.boolean().optional(),
  }),
});

export const collections = { projects, blog, apps };
