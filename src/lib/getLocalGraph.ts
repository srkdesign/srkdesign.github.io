interface GraphNode {
  title: string;
  outgoing: string[];
  incoming: string[];
}

type Graph = Record<string, GraphNode>;

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

export function getLocalGraph(graph: Graph, currentSlug: string): LocalGraph {
  const nodes = new Map<string, LocalNode>();
  const links: LocalLink[] = [];

  function addNode(id: string): void {
    if (!nodes.has(id)) {
      nodes.set(id, {
        id,
        label: graph[id]?.title ?? id,
      });
    }
  }

  addNode(currentSlug);

  const current = graph[currentSlug];
  if (!current) {
    return { nodes: [], links: [] };
  }

  for (const target of current.outgoing) {
    addNode(target);
    links.push({ source: currentSlug, target });
  }

  for (const source of current.incoming) {
    addNode(source);
    links.push({ source, target: currentSlug });
  }

  return {
    nodes: Array.from(nodes.values()),
    links,
  };
}
