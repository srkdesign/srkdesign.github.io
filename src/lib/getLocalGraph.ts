import { toSlug, type Graph } from "./buildGraph"; // adjust path

interface LocalNode {
  id: string;
  label: string;
}

interface LocalLink {
  source: string;
  target: string;
}

interface LocalGraph {
  nodes: LocalNode[];
  links: LocalLink[];
}

export function getLocalGraph(graph: Graph, rawSlug: string): LocalGraph {
  // accepts "post", "post/index", "post/index.mdx", "post.mdx", encoded values...
  const currentSlug = toSlug(rawSlug) ?? rawSlug;

  const nodes = new Map<string, LocalNode>();
  const links: LocalLink[] = [];

  function addNode(id: string): void {
    if (!nodes.has(id)) {
      nodes.set(id, { id, label: graph[id]?.title ?? id });
    }
  }

  const current = graph[currentSlug];
  if (!current) return { nodes: [], links: [] };

  addNode(currentSlug);

  for (const target of current.outgoing) {
    addNode(target);
    links.push({ source: currentSlug, target });
  }

  for (const source of current.incoming) {
    addNode(source);
    links.push({ source, target: currentSlug });
  }

  return { nodes: Array.from(nodes.values()), links };
}
