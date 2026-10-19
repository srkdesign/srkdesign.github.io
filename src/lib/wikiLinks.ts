import { visit } from "unist-util-visit";
import { readFileSync, existsSync } from "fs";
import { join, dirname, resolve, relative, sep } from "path";
import { slug as slugify } from "github-slugger";
import matter from "gray-matter";
import type { Root, Text, Link, Image, Parent } from "mdast";
import type { VFile } from "vfile";

interface RemarkWikiLinksOptions {
  debug?: boolean;
}

interface AstroFrontmatter {
  locale?: string;
}

interface VFileData {
  astro?: { frontmatter?: AstroFrontmatter };
  frontmatter?: AstroFrontmatter;
}

// ───────────── Locales & URL scheme ─────────────
const LOCALES = ["ru", "en", "az"];
const DEFAULT_LOCALE = "ru"; // served without a URL prefix
const BLOG_ROOT = resolve(process.cwd(), "src/content/blog"); // must match your glob base

// The only place that knows how a note maps to a URL.
const noteUrl = (locale: string, slugPath: string) =>
  `${locale === DEFAULT_LOCALE ? "" : `/${locale}`}/blog/${slugPath ? `${slugPath}/` : ""}`;

// ───────────── Note links ─────────────
const SKIP = /^([a-z][a-z0-9+.-]*:|\/\/|#)/i; // https:, mailto:, //cdn, #anchor

// "../../ru/foo/index.md#x" -> "/blog/foo/#x"; undefined = leave the link alone
function rewriteNoteLink(url: string, filePath: string): string | undefined {
  if (SKIP.test(url)) return;

  const [, rawPath = "", suffix = ""] = url.match(/^([^?#]*)([?#].*)?$/)!;
  if (!/\.mdx?$/i.test(rawPath) || rawPath.startsWith("/")) return;

  let decoded: string;
  try {
    decoded = decodeURI(rawPath); // Obsidian encodes spaces as %20
  } catch {
    return;
  }

  // Resolve against the source file, then express the target relative to the blog collection
  const rel = relative(BLOG_ROOT, resolve(dirname(filePath), decoded))
    .split(sep)
    .join("/")
    .replace(/\.mdx?$/i, "");
  if (rel === ".." || rel.startsWith("../")) return; // outside the collection

  const [locale, ...rest] = rel.split("/");
  if (!LOCALES.includes(locale)) return;
  if (rest.at(-1) === "index") rest.pop(); // my-post/index -> my-post

  return noteUrl(locale, rest.map((s) => slugify(s)).join("/")) + suffix;
}

// ───────────── Image embeds ─────────────
// Image embeds like ![[pic.png]] are turned into standard Markdown images so
// Astro's own image handling picks them up. Only these extensions count.
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg|bmp|tiff?)$/i;

// Obsidian size hints such as "300" or "300x200" are not alt text.
const SIZE_HINT = /^\d+(x\d+)?$/;

function toImage(target: string, alias?: string): Image {
  const path = target.trim();
  // Astro resolves image paths relative to the post file, so the embed's bare
  // filename is treated as a sibling of the post.
  const relative = /^(\.{1,2}\/|\/)/.test(path) ? path : `./${path}`;
  const alt = (alias ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s && !SIZE_HINT.test(s))
    .join(" ");
  return { type: "image", url: encodeURI(relative), alt };
}

export default function remarkWikiLinks({
  debug = false,
}: RemarkWikiLinksOptions = {}) {
  return (tree: Root, file: VFile & { data: VFileData }) => {
    const locale =
      file.data?.astro?.frontmatter?.locale || file.data?.frontmatter?.locale;

    if (debug) {
      console.log(
        "[remark-wikilinks] file.path:",
        file.path,
        "locale:",
        locale,
      );
    }

    if (file.path) {
      visit(tree, "link", (node: Link) => {
        const next = rewriteNoteLink(node.url, file.path!);
        if (debug) console.log("[note-links]", node.url, "->", next);
        if (next) node.url = next;
      });
    }

    visit(
      tree,
      "text",
      (node: Text, index: number | undefined, parent: Parent | undefined) => {
        const value = node.value;
        if (!value || !value.includes("[[")) return;

        // The optional leading "!" marks an Obsidian embed.
        const regex = /(!)?\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;
        const parts: (Text | Link | Image)[] = [];
        let lastIndex = 0;

        for (const match of value.matchAll(regex)) {
          const [fullMatch, bang, page, alias] = match;
          const offset = match.index!;

          if (offset > lastIndex) {
            parts.push({ type: "text", value: value.slice(lastIndex, offset) });
          }

          if (bang && IMAGE_EXT.test(page.trim())) {
            if (debug) {
              console.log("Image embed resolved:", { page, alias });
            }
            parts.push(toImage(page, alias));
            lastIndex = offset + fullMatch.length;
            continue;
          }

          const slug = page.trim().toLowerCase().replace(/\s+/g, "-");
          let title = alias || page;

          try {
            const base = join(dirname(file.path!), slug);
            const filePath = existsSync(`${base}.mdx`)
              ? `${base}.mdx`
              : `${base}.md`;
            const { data } = matter(readFileSync(filePath, "utf-8"));
            title = alias || data.title || page;
          } catch {}

          if (debug) {
            console.log("Wikilink resolved:", { page, slug, title });
          }

          const localeMatch = file
            .path!.replace(/\\/g, "/")
            .match(/blog\/([^/]+)\//);
          const url = noteUrl(localeMatch?.[1] ?? DEFAULT_LOCALE, slug);

          parts.push({
            type: "link",
            url,
            children: [{ type: "text", value: title }],
          });

          lastIndex = offset + fullMatch.length;
        }

        if (lastIndex < value.length) {
          parts.push({ type: "text", value: value.slice(lastIndex) });
        }

        if (parent && index !== undefined) {
          parent.children.splice(index, 1, ...(parts as Parent["children"]));
        }
      },
    );
  };
}
