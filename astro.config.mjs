// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeCallouts from "rehype-callouts";

import playformCompress from "@playform/compress";

const prettyCodeOptions = {
  theme: "github-dark",
  wrap: true,
  keepBackground: true,
  transformers: [
    transformerCopyButton({
      visibility: "always",
      feedbackDuration: 3_000,
    }),
  ],
};

const calloutOptions = {
  theme: "obsidian",
  callouts: {
    tip: {
      indicator:
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-lightbulb-icon lucide-lightbulb'><path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'/><path d='M9 18h6'/><path d='M10 22h4'/></svg>",
    },
    chatbot: {
      title: "Ai",
      indicator:
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-bot-icon lucide-bot'><path d='M12 8V4H8'/><rect width='16' height='12' x='4' y='8' rx='2'/><path d='M2 14h2'/><path d='M20 14h2'/><path d='M15 13v2'/><path d='M9 13v2'/></svg>",
    },
    promo: {
      indicator:
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-gem-icon lucide-gem'><path d='M6 3h12l4 6-10 13L2 9Z'/><path d='M11 3 8 9l4 13 4-13-3-6'/><path d='M2 9h20'/></svg>",
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://srkdesign.pro/",
  integrations: [
    mdx(),
    sitemap(),
    react({
      experimentalReactChildren: false,
    }),
    tailwind(),
    playformCompress({
      JavaScript: false,
    }),
  ],
  markdown: {
    // extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [rehypeCallouts, calloutOptions],
    ],
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru"],
  },
});
