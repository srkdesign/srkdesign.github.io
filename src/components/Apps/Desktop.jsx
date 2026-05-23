import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Icon from "./Icon";
import { Album } from "lucide-react";

const CELL_SIZE = 96;
const MOVE_THRESHOLD = 5;

function generateGridScatter(count, width, height) {
  const TOP_RESERVED = 96;

  const cols = Math.floor(width / CELL_SIZE);
  const rows = Math.floor((height - TOP_RESERVED) / CELL_SIZE);

  const NO_GO_WIDTH = 800;
  const NO_GO_HEIGHT = 400;

  const noGoX = (width - NO_GO_WIDTH) / 2;
  const noGoY = TOP_RESERVED + (height - TOP_RESERVED - NO_GO_HEIGHT) / 2;

  const cells = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * CELL_SIZE;
      const y = row * CELL_SIZE + TOP_RESERVED;

      // Skip cells inside the no-go zone
      const insideNoGo =
        x >= noGoX &&
        x < noGoX + NO_GO_WIDTH &&
        y >= noGoY &&
        y < noGoY + NO_GO_HEIGHT;

      if (!insideNoGo) {
        cells.push({ x, y });
      }
    }
  }

  // Fisher-Yates shuffle — deterministic & unbiased
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return cells.slice(0, count);
}

const Desktop = ({ apps }) => {
  const [containerSize, setContainerSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectBox, setSelectBox] = useState(null);
  const [hoveredIds, setHoveredIds] = useState(new Set());
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Track pointer state in a ref so event handlers always read fresh values
  const pointerRef = useRef({
    startX: 0,
    startY: 0,
    isDown: false,
    draggingIcon: false,
    moved: false,
  });

  // Keep latest hoveredIds accessible inside pointer handlers without stale closure
  const hoveredIdsRef = useRef(hoveredIds);
  useEffect(() => {
    hoveredIdsRef.current = hoveredIds;
  }, [hoveredIds]);

  // Recalculate scatter on resize
  useEffect(() => {
    const onResize = () =>
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scatter = useMemo(
    () =>
      generateGridScatter(
        apps.length,
        containerSize.width,
        containerSize.height,
      ),
    // Recalculate only when app count or container size changes
    [apps.length, containerSize.width, containerSize.height],
  );

  const getOverlappingIds = useCallback(
    (box) => {
      const left = Math.min(box.x1, box.x2);
      const right = Math.max(box.x1, box.x2);
      const top = Math.min(box.y1, box.y2);
      const bottom = Math.max(box.y1, box.y2);

      return new Set(
        apps
          .filter((_, idx) => {
            const { x, y } = scatter[idx];
            return (
              x < right &&
              x + CELL_SIZE > left &&
              y < bottom &&
              y + CELL_SIZE > top
            );
          })
          .map((app) => app.id),
      );
    },
    [apps, scatter],
  );

  const onPointerDown = useCallback((e) => {
    const isIcon = !!e.target.closest("[data-icon]");
    pointerRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDown: true,
      draggingIcon: isIcon,
      moved: false,
    };

    // Clear selection when clicking on empty space (not an icon)
    if (!isIcon) setSelectedIds(new Set());
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      const p = pointerRef.current;
      if (!p.isDown || p.draggingIcon) return;

      const dx = e.clientX - p.startX;
      const dy = e.clientY - p.startY;
      p.moved = Math.hypot(dx, dy) > MOVE_THRESHOLD;
      if (!p.moved) return;

      const box = { x1: p.startX, y1: p.startY, x2: e.clientX, y2: e.clientY };
      setSelectBox(box);
      setHoveredIds(getOverlappingIds(box));
    },
    [getOverlappingIds],
  );

  const onPointerUp = useCallback((e) => {
    const p = pointerRef.current;
    if (!p.isDown) return;

    if (p.moved) {
      // Commit whatever is currently hovered as the new selection
      setSelectedIds(new Set(hoveredIdsRef.current));
    } else if (!p.draggingIcon) {
      // Plain click on empty space → clear selection (already done in pointerDown)
      setSelectedIds(new Set());
    }

    setHoveredIds(new Set());
    setSelectBox(null);
    pointerRef.current = { ...pointerRef.current, isDown: false, moved: false };
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      // Release drag if pointer leaves the window
      onPointerLeave={onPointerUp}
    >
      {/* Selection rectangle */}
      {selectBox && (
        <div
          className="absolute border border-blue-400 bg-blue-400/20 pointer-events-none"
          style={{
            left: Math.min(selectBox.x1, selectBox.x2),
            top: Math.min(selectBox.y1, selectBox.y2),
            width: Math.abs(selectBox.x2 - selectBox.x1),
            height: Math.abs(selectBox.y2 - selectBox.y1),
          }}
        />
      )}

      {apps.map((app, idx) => (
        <Icon
          key={app.id}
          id={app.id}
          title={app.data.title}
          icon={app.data.icon}
          initialX={scatter[idx].x}
          initialY={scatter[idx].y}
          hover={hoveredIds.has(app.id)}
          selected={selectedIds.has(app.id)}
        />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2rem,0.6154rem+6.1538vw,8rem)] z-0 select-none">
        <h1 className="text-center font-normal">Приложения</h1>
      </div>
      {/* Header */}
      {/* <div className="flex items-center justify-between p-6 pr-8">
        <div className="">
          <div className="[&>*:not(:last-child)]:after:content-['/'] [&>*:not(:last-child)]:after:px-1 [&>*:last-child]:pl-1.5 [&>*:not(:last-child)]:after:hidden md:[&>*:not(:last-child)]:after:inline-block">
            <span>
              <a
                className="py-1 px-1.5 hover:bg-white hover:text-zinc-950 rounded-md hover:mr-2 hover:font-medium transition-all duration-150 ease-in-out"
                href="/"
              >
                srkdesign
              </a>
            </span>
            <span className="hidden md:inline-block lowercase">Приложения</span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2rem,0.6154rem+6.1538vw,8rem)] z-0 select-none">
            <h1 className="text-center font-normal">Приложения</h1>
          </div>
        </div>
        <div className="flex gap-2 *:p-1.5 hover:*:bg-white/10 *:rounded-md">
          <a href="/blog/">
            <Album size={20} strokeWidth={1.25} />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Desktop;
