import fs from "fs";
import path from "path";

const WIKILINK_REGEX = /(?<!!)\[\[([^\]]+)\]\]/g; // skips ![[embeds]]
// [text](target) and [text](target "title"); skips ![images](...)
const MD_LINK_REGEX =
  /(?<!!)\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+["'][^)]*["'])?\s*\)/g;
const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---/;

const EXTERNAL_REGEX = /^([a-z][a-z0-9+.-]*:|\/\/)/i; // https:, mailto:, //cdn...
const ASSET_EXT_REGEX = /\.(png|jpe?g|gif|webp|avif|svg|pdf|mp[34]|webm|mov)$/i;
const NOTE_EXT_REGEX = /\.mdx?$/i;
const INDEX_REGEX = /^index(\.mdx?)?$/i;

// true: links to pages that aren't notes still create a bare node (like before)
// false: only keep links that point at real posts
const KEEP_MISSING_TARGETS = true;

export interface GraphNode {
  title: string;
  outgoing: string[];
  incoming: string[];
}

export type Graph = Record<string, GraphNode>;

export function slugify(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, "-");
}

/**
 * Turns any path-like string into a post slug.
 *   "post.mdx"                -> "post"
 *   "post/index.mdx"          -> "post"
 *   "../other-post/index.md"  -> "other-post"
 *   "/blog/other-post/"       -> "other-post"
 *   "post/index" (collection id) -> "post"
 */
export function toSlug(p: string): string | null {
  let value = p;
  try {
    value = decodeURIComponent(value); // %20 -> space, encoded Cyrillic
  } catch {
    /* malformed encoding: use as-is */
  }

  const segments = value
    .split(/[\\/]/)
    .filter((s) => s && s !== "." && s !== "..");

  let last = segments.pop();
  if (last && INDEX_REGEX.test(last)) last = segments.pop(); // folder name wins
  if (!last || ASSET_EXT_REGEX.test(last)) return null;

  return slugify(last.replace(NOTE_EXT_REGEX, "")) || null;
}

// Frontmatter and code shouldn't produce links
function stripNonProse(content: string): string {
  return content
    .replace(FRONTMATTER_REGEX, "")
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\n]*`/g, "");
}

function extractLinks(content: string): string[] {
  const body = stripNonProse(content);
  const slugs = new Set<string>();

  // [[Note]], [[Note|alias]], [[Note#Heading]]
  for (const m of body.matchAll(WIKILINK_REGEX)) {
    const page = m[1].split("|")[0].split("#")[0];
    const slug = toSlug(page);
    if (slug) slugs.add(slug);
  }

  // [text](../other-post/index.md), [text](Other%20Post.md#part), ...
  for (const m of body.matchAll(MD_LINK_REGEX)) {
    let target = m[1].trim();
    if (target.startsWith("<") && target.endsWith(">"))
      target = target.slice(1, -1);
    if (!target || target.startsWith("#") || EXTERNAL_REGEX.test(target))
      continue;

    target = target.split("#")[0].split("?")[0];
    const slug = toSlug(target);
    if (slug) slugs.add(slug);
  }

  return [...slugs];
}

function extractTitle(content: string, fallback: string): string {
  const fm = content.match(FRONTMATTER_REGEX)?.[1];
  const match = fm?.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].trim() : fallback;
}

// Finds .md/.mdx files at any depth (post.mdx and post/index.mdx)
function collectNotes(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectNotes(full));
    else if (NOTE_EXT_REGEX.test(entry.name)) out.push(full);
  }
  return out;
}

export function buildGraph(contentDir: string): Graph {
  const graph: Graph = {};

  for (const fullPath of collectNotes(contentDir)) {
    const slug = toSlug(path.relative(contentDir, fullPath));
    if (!slug) continue;

    const raw = fs.readFileSync(fullPath, "utf8");
    const outgoing = extractLinks(raw).filter((t) => t !== slug); // no self-links

    graph[slug] = { title: extractTitle(raw, slug), outgoing, incoming: [] };
  }

  for (const source in graph) {
    // iterate over a copy: we may drop entries
    for (const target of [...graph[source].outgoing]) {
      if (!graph[target]) {
        if (!KEEP_MISSING_TARGETS) {
          graph[source].outgoing = graph[source].outgoing.filter(
            (t) => t !== target,
          );
          continue;
        }
        graph[target] = { title: target, outgoing: [], incoming: [] };
      }
      graph[target].incoming.push(source);
    }
  }

  return graph;
}
