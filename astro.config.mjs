// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

import playformCompress from "@playform/compress";

const prettyCodeOptions = {
  theme: "min-dark",
  wrap: true,
  keepBackground: true,
  transformers: [
    transformerCopyButton({
      visibility: "hover",
      feedbackDuration: 3_000,
    }),
  ],
};

const remarkTocOptions = {
  heading: "toc",
  maxDepth: 3,
};

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    react({
      experimentalReactChildren: false,
    }),
    tailwind(),
    playformCompress(),
  ],
  markdown: {
    // extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
