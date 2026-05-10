import fs from "fs";
import path from "path";

const WIKILINK_REGEX = /\[\[([^\]]+)\]\]/g;
const FRONTMATTER_TITLE_REGEX = /^---[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m;

interface GraphNode {
  title: string;
  outgoing: string[];
  incoming: string[];
}

type Graph = Record<string, GraphNode>;

function slugify(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, "-");
}

function extractLinks(content: string): string[] {
  return [...content.matchAll(WIKILINK_REGEX)].map((m) => {
    const page = m[1].split("|")[0];
    return slugify(page);
  });
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(FRONTMATTER_TITLE_REGEX);
  return match ? match[1].trim() : fallback;
}

export function buildGraph(contentDir: string): Graph {
  const graph: Graph = {};
  const files = fs.readdirSync(contentDir);

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const slug = slugify(file.replace(".mdx", ""));
    const outgoing = extractLinks(raw);
    const title = extractTitle(raw, slug);

    graph[slug] = { title, outgoing, incoming: [] };
  }

  for (const source in graph) {
    for (const target of graph[source].outgoing) {
      if (!graph[target]) {
        graph[target] = { title: target, outgoing: [], incoming: [] };
      }
      graph[target].incoming.push(source);
    }
  }

  return graph;
}
