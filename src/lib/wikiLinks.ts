import { visit } from "unist-util-visit";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import matter from "gray-matter";
import type { Root, Text, Link, Parent } from "mdast";
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

    visit(
      tree,
      "text",
      (node: Text, index: number | undefined, parent: Parent | undefined) => {
        const value = node.value;
        if (!value || !value.includes("[[")) return;

        const regex = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;
        const parts: (Text | Link)[] = [];
        let lastIndex = 0;

        for (const match of value.matchAll(regex)) {
          const [fullMatch, page, alias] = match;
          const offset = match.index!;

          if (offset > lastIndex) {
            parts.push({ type: "text", value: value.slice(lastIndex, offset) });
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
          const resolvedLocale = localeMatch?.[1];
          const prefix =
            !resolvedLocale || resolvedLocale === "ru"
              ? "/blog/"
              : `/${resolvedLocale}/blog/`;
          const url = `${prefix}${slug}`;

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
