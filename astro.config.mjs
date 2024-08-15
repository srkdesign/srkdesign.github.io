import { defineConfig } from "astro/config";

// Astro Integrations
import tailwind from "@astrojs/tailwind";

// Markdown Plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";

// https://astro.build/config
export default defineConfig({
  site: "https://srkdesign.github.io/",
  integrations: [tailwind()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behaviour: "append" }],
      [
        rehypeToc,
        {
          headings: ["h2", "h3", "h4"],
          tight: true,
          ordered: true,
          cssClasses: {
            link: "anchor",
          },
        },
      ],
    ],
  },
});
