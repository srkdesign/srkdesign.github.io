import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Icon from "./Icon";
import { Album } from "lucide-react";

const CELL_SIZE = 96;
const MOVE_THRESHOLD = 5;

function gridScatter(count, w, h) {
  const cols = Math.floor(w / CELL_SIZE);
  const rows = Math.floor((h - 96) / CELL_SIZE);
  const cells = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      cells.push({ x: c * CELL_SIZE, y: r * CELL_SIZE + 96 });
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells.slice(0, count);
}

const Desktop = ({ apps }) => {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const scatter = useMemo(
    () => gridScatter(apps.length, size.w, size.h),
    [apps.length, size.w, size.h],
  );

  const [positions, setPositions] = useState(() =>
    Object.fromEntries(apps.map((app, i) => [app.id, scatter[i]])),
  );
  useEffect(() => {
    setPositions(
      Object.fromEntries(apps.map((app, i) => [app.id, scatter[i]])),
    );
  }, [scatter]);
  useEffect(() => {
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [box, setBox] = useState(null);
  const [hovered, setHovered] = useState(new Set());
  const [selected, setSelected] = useState(new Set());

  const ptr = useRef({ x: 0, y: 0, down: false, icon: false, moved: false });
  const hovRef = useRef(hovered);
  useEffect(() => {
    hovRef.current = hovered;
  }, [hovered]);

  const hit = useCallback(
    (b) => {
      const l = Math.min(b.x1, b.x2),
        r = Math.max(b.x1, b.x2);
      const t = Math.min(b.y1, b.y2),
        bt = Math.max(b.y1, b.y2);
      return new Set(
        apps
          .filter((app) => {
            const { x, y } = positions[app.id] ?? { x: 0, y: 0 };
            return x < r && x + CELL_SIZE > l && y < bt && y + CELL_SIZE > t;
          })
          .map((a) => a.id),
      );
    },
    [apps, positions],
  );

  const onPointerDown = useCallback((e) => {
    const icon = !!e.target.closest("[data-icon]");
    ptr.current = {
      x: e.clientX,
      y: e.clientY,
      down: true,
      icon,
      moved: false,
    };
    if (!icon) setSelected(new Set());
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      const p = ptr.current;
      if (!p.down || p.icon) return;
      p.moved = Math.hypot(e.clientX - p.x, e.clientY - p.y) > MOVE_THRESHOLD;
      if (!p.moved) return;
      const b = { x1: p.x, y1: p.y, x2: e.clientX, y2: e.clientY };
      setBox(b);
      setHovered(hit(b));
    },
    [hit],
  );

  const onPointerUp = useCallback(() => {
    if (ptr.current.moved) setSelected(new Set(hovRef.current));
    setHovered(new Set());
    setBox(null);
    ptr.current = { ...ptr.current, down: false, moved: false };
  }, []);

  const onIconDragEnd = useCallback(
    (id, x, y) => setPositions((p) => ({ ...p, [id]: { x, y } })),
    [],
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {box && (
        <div
          className="absolute border border-blue-400 bg-blue-400/20 pointer-events-none"
          style={{
            left: Math.min(box.x1, box.x2),
            top: Math.min(box.y1, box.y2),
            width: Math.abs(box.x2 - box.x1),
            height: Math.abs(box.y2 - box.y1),
          }}
        />
      )}

      {apps.map((app, i) => (
        <Icon
          key={app.id}
          index={i}
          id={app.id}
          title={app.data.title}
          icon={app.data.icon}
          initialX={scatter[i].x}
          initialY={scatter[i].y}
          hover={hovered.has(app.id)}
          selected={selected.has(app.id)}
          onDragEnd={onIconDragEnd}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(2rem,0.6154rem+6.1538vw,8rem)] z-0 select-none">
        <h1 className="text-center font-normal">Приложения</h1>
      </div>
    </div>
  );
};

export default Desktop;
