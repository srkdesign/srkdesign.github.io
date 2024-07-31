import { z, defineCollection } from "astro:content";

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    coverImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    stack: z.array(z.string()).optional(),
    amountOfWork: z.string().optional(),
    publishDate: z.date(),
    duration: z.string().optional(),
  }),
});

const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()),
    publishDate: z.date(),
  }),
});

export const collections = {
  project: projectCollection,
  article: articleCollection,
};
