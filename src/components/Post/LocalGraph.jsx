import { useEffect, useRef } from "react";
import ForceGraph from "force-graph";
import * as d3 from "d3-force";

export default function LocalGraph({ graphData, currentId }) {
  const wrapperRef = useRef(null);
  const graphRef = useRef(null);
  const fittedRef = useRef(false);

  const hoveredNodeRef = useRef(null);
  const neighborsRef = useRef(new Set());

  useEffect(() => {
    if (!wrapperRef.current || !graphRef.current) return;

    let fg = null;
    let initialized = false;

    const init = (width, height) => {
      if (initialized) return;
      initialized = true;

      // -----------------------------
      // BUILD NEIGHBORS (ONCE PER INIT)
      // -----------------------------
      const neighbors = new Set();
      graphData.links.forEach((l) => {
        const s = l.source?.id ?? l.source;
        const t = l.target?.id ?? l.target;
        if (s === currentId) neighbors.add(t);
        if (t === currentId) neighbors.add(s);
      });

      neighborsRef.current = neighbors;

      fg = ForceGraph()(graphRef.current)
        .graphData(graphData)
        .width(width)
        .height(height)
        .nodeId("id")
        .nodeLabel("label")

        // -----------------------------
        // PERFORMANCE: reduce recalcs
        // -----------------------------
        .nodeRelSize(1)
        .d3AlphaDecay(0.04) // faster stabilization = less CPU

        .nodeVal((n) => {
          if (n.id === currentId) return 30;
          if (neighbors.has(n.id)) return 12;
          return 5;
        })

        .nodeColor(() => "#d4d4d8")

        // -----------------------------
        // LINK COLOR (FAST REF LOOKUP)
        // -----------------------------
        .linkColor((l) => {
          const hovered = hoveredNodeRef.current;

          const s = l.source?.id ?? l.source;
          const t = l.target?.id ?? l.target;

          if (!hovered) {
            return s === currentId || t === currentId
              ? "rgba(160,180,200,0.5)"
              : "rgba(160,180,200,0.12)";
          }

          return s === hovered.id || t === hovered.id
            ? "rgba(160,180,200,0.6)"
            : "rgba(160,180,200,0.04)";
        })

        .linkWidth(1)

        // -----------------------------
        // NODE RENDER (OPTIMIZED)
        // -----------------------------
        .nodeCanvasObject((node, ctx) => {
          const hovered = hoveredNodeRef.current;
          const neighbors = neighborsRef.current;

          const isCurrent = node.id === currentId;
          const isNeighbor = neighbors.has(node.id);
          const isHovered = hovered?.id === node.id;

          const isRelated =
            !hovered ||
            node.id === hovered.id ||
            (hovered.id === currentId
              ? neighbors.has(node.id)
              : node.id === currentId || node.id === hovered.id);

          const baseR = isCurrent ? 6 : isNeighbor ? 4 : 2;

          ctx.save();
          ctx.globalAlpha = isRelated ? 1 : 0.15;
          ctx.translate(node.x, node.y);

          // slight scale only on hover (cheap)
          if (isHovered) ctx.scale(1.2, 1.2);

          ctx.beginPath();
          ctx.arc(0, 0, baseR, 0, 2 * Math.PI);

          ctx.fillStyle = isCurrent
            ? "#d4d4d8"
            : isNeighbor
              ? "#52525c"
              : "#3f3f46";

          ctx.fill();
          ctx.restore();
        })

        // -----------------------------
        // STABLE HIT DETECTION (FIXED)
        // -----------------------------
        .nodePointerAreaPaint((node, color, ctx) => {
          const neighbors = neighborsRef.current;

          const baseR =
            node.id === currentId ? 7 : neighbors.has(node.id) ? 5 : 3;

          ctx.beginPath();
          ctx.arc(node.x, node.y, baseR * 2, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        })

        // -----------------------------
        // FORCES (PERFORMANCE MODE)
        // -----------------------------
        .d3Force("charge", d3.forceManyBody().strength(-28))
        .d3Force(
          "link",
          d3
            .forceLink()
            .id((d) => d.id)
            .distance(28)
            .strength(1),
        )
        .d3Force("collision", d3.forceCollide(6))
        .d3Force("center", d3.forceCenter(0, 0));

      // -----------------------------
      // HOVER (REF-BASED → NO FREEZE)
      // -----------------------------
      fg.onNodeHover((node) => {
        hoveredNodeRef.current = node;
        graphRef.current.style.cursor = node ? "pointer" : "default";
      });

      // -----------------------------
      // CLICK
      // -----------------------------
      fg.onNodeClick((node) => {
        const url = window.location.pathname;
        const newUrl = url.replace(/(blog\/).*/, `$1${node.id}`);
        if (node?.id) window.location.href = newUrl;
      });

      // -----------------------------
      // INITIAL ZOOM (ONLY ONCE)
      // -----------------------------
      setTimeout(() => {
        const node = graphData.nodes.find((n) => n.id === currentId);

        if (node?.x != null) {
          fg.centerAt(node.x, node.y, 0);
          fg.zoom(1, 0); // 👈 stable zoom-out default
        }
      }, 200);
    };

    // -----------------------------
    // RESIZE OBSERVER
    // -----------------------------
    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (!width) return;

      const height = width;
      wrapperRef.current.style.height = `${height}px`;

      if (!initialized) {
        init(width, height);
      } else if (fg) {
        fg.width(width).height(height);
      }
    });

    ro.observe(wrapperRef.current);

    return () => {
      fittedRef.current = false;
      ro.disconnect();
    };
  }, [graphData, currentId]);

  return (
    <section
      ref={wrapperRef}
      className="w-full h-full overflow-hidden rounded-2xl mb-6 border border-white/20 order-2"
    >
      <div ref={graphRef} className="w-full h-full" />
    </section>
  );
}
