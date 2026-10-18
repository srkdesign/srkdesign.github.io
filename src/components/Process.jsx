import { useEffect, useRef, useState } from "react";

import ElementHeading from "./Text/ElementHeading";
import {
  FlaskRound,
  Layers,
  Lightbulb,
  Pencil,
  RefreshCcw,
  Rocket,
  Search,
  Target,
} from "lucide-react";

const RING = 0.36; // ring radius as a fraction of the stage
const LENS = 0.16; // circle diameter as a fraction of the stage
const ICON = 0.32; // icon size as a fraction of its circle
const HYSTERESIS = 0.05; // steps past a boundary before the text swaps (no flicker at the edge)

const DIM = { opacity: 1, blur: 2.5, scale: 0.94 }; // circles you are not hovering
const MOTION_BLUR = { max: 3, gain: 5, smooth: 90 }; // px cap, px per (turn/s), easing time constant in ms

const TRAVEL = 28; // px a text line drifts as it enters or leaves
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)"; // long, soft landing
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)"; // accelerates away
const EASE_SOFT = "cubic-bezier(0.4, 0, 0.2, 1)"; // gentle start and finish, for things settling back to rest

// Dark palette. Override the page colours with `style` / `className` on the section.
const BG = "#09090b";
const FG = "#fafafa";

// Default accent per circle (any CSS colour works for `accent` on an item).
const PALETTE = [
  "#29D697",
  "#29D697",
  "#29D697",
  "#F45434",
  "#F45434",
  "#F45434",
  "#926CF9",
  "#926CF9",
];

// The blur clears a little before the drift finishes, so text is sharp on arrival.
const enterTransition = (d) =>
  `transform 0.9s ${EASE_OUT} ${d}s, filter 0.7s ${EASE_OUT} ${d}s, opacity 0.6s ease-out ${d}s`;
const leaveTransition = (d) =>
  `transform 0.4s ${EASE_IN} ${d}s, filter 0.4s ${EASE_IN} ${d}s, opacity 0.25s ease-out ${d}s`;

// Circle hover states. Others recede slowly; the hovered one lights up faster.
// When the cursor leaves, the ring eases back to rest on a soft in-out curve.
// Its gentle start is what absorbs a quick hop across the gap between two
// circles (together with a tiny delay), so nothing flashes bright and dim again.
const trio = (d, delay = 0, ease = EASE_OUT) =>
  `opacity ${d}s ${ease} ${delay}s, filter ${d}s ${ease} ${delay}s, scale ${d + 0.1}s ${ease} ${delay}s`;
const RECEDE = trio(0.6);
const LIGHT_UP = trio(0.45);
const RESTORE = trio(0.55, 0.06, EASE_SOFT);

// Dark card by default; override with the tooltipClassName prop to match your page.
const TOOLTIP_CLASS =
  "rounded-full border border-white/15 bg-zinc-50 px-6 py-3 text-zinc-950";

/** `pct`% of colour `c` mixed into `base`. Used to tint borders, glows and fills from one accent. */
const mix = (c, pct, base = "transparent") =>
  `color-mix(in srgb, ${c} ${pct}%, ${base})`;

/** Wraps icon paths in a 24x24 stroke SVG that takes its colour from the circle (currentColor). */
export function OrbitIcon({ children, strokeWidth = 0.9 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block"
    >
      {children}
    </svg>
  );
}

// Placeholder content: eight icon circles, each with its own text.
const CONTENT = [
  ["Шаг 1", "Понимаем задачу", <Target className="stroke-[1.5] sm:stroke-1" />],
  [
    "Шаг 2",
    "Исследуем контекст",
    <Search className="stroke-[1.5] sm:stroke-1" />,
  ],
  [
    "Шаг 3",
    "Формулируем идею",
    <Lightbulb className="stroke-[1.5] sm:stroke-1" />,
  ],
  ["Шаг 4", "Рисуем прототип", <Pencil className="stroke-[1.5] sm:stroke-1" />],
  [
    "Шаг 5",
    "Проверяем гипотезы",
    <FlaskRound className="stroke-[1.5] sm:stroke-1" />,
  ],
  [
    "Шаг 6",
    "Собираем решение",
    <Layers className="stroke-[1.5] sm:stroke-1" />,
  ],
  [
    "Шаг 7",
    "Запускаем и замеряем",
    <Rocket className="stroke-[1.5] sm:stroke-1" />,
  ],
  [
    "Шаг 8",
    "Улучшаем снова",
    <RefreshCcw className="stroke-[1.5] sm:stroke-1" />,
  ],
].map(([description, title, paths], i) => ({
  icon: <OrbitIcon>{paths}</OrbitIcon>,
  title,
  description,
  accent: PALETTE[i % PALETTE.length],
}));

const SPIN = "rotate(calc(var(--turn, 0) * 1deg))";
const UNSPIN = "rotate(calc(var(--turn, 0) * -1deg))";

/** Style for one circle given what is hovered. At rest the filter is `none`, so it renders crisp. */
const circleState = (hovered, i, reduce) => {
  const dimmed = hovered !== null && hovered !== i;
  if (reduce)
    return {
      opacity: dimmed ? DIM.opacity : 1,
      transition: "opacity 0.3s ease",
    };
  return {
    opacity: dimmed ? DIM.opacity : 1,
    filter: dimmed ? `blur(${DIM.blur}px)` : "none",
    scale: dimmed ? String(DIM.scale) : "1", // the individual `scale` property never fights the scroll-driven transform
    transition: dimmed ? RECEDE : hovered === null ? RESTORE : LIGHT_UP,
  };
};

/** Tooltip card: rises in out of a blur, then settles back out on the same soft curve as the ring. */
const cardState = (shown, reduce) => ({
  opacity: shown ? 1 : 0,
  transform: shown || reduce ? "none" : "translateY(8px) scale(0.96)",
  filter: shown || reduce ? "none" : "blur(8px)",
  transformOrigin: "0 0",
  transition: reduce
    ? "opacity 0.2s ease"
    : shown
      ? `opacity 0.35s ease-out, transform 0.5s ${EASE_OUT}, filter 0.4s ${EASE_OUT}`
      : `opacity 0.22s ease-out 0.06s, transform 0.3s ${EASE_SOFT} 0.06s, filter 0.3s ${EASE_SOFT} 0.06s`,
});

/** One of the stacked tooltip texts: crossfades with a little blur when you move between circles. */
const tipTextState = (live, reduce) => ({
  gridArea: "1 / 1",
  opacity: live ? 1 : 0,
  filter: live || reduce ? "none" : "blur(4px)",
  transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
});

/**
 * One line of text that drifts and blurs in and out.
 * rel: 0 = on screen, 1 = waiting below, -1 = already gone above.
 */
function Swap({ rel, reduce, enterDelay, leaveDelay, blur, children }) {
  const live = rel === 0;
  const moving = !live && !reduce; // reduced motion: opacity only
  return (
    <div
      style={{
        opacity: live ? 1 : 0,
        transform: moving ? `translateY(${rel * TRAVEL}px)` : "none",
        filter: moving ? `blur(${blur}px)` : "none",
        transition: reduce
          ? "opacity 0.4s ease"
          : live
            ? enterTransition(enterDelay)
            : leaveTransition(leaveDelay),
      }}
    >
      {children}
    </div>
  );
}

/**
 * @param {object}   props
 * @param {{ icon: import("react").ReactNode, title: string, description: string, accent?: string }[]} [props.items]
 *                                         Circles are spaced clockwise from the top, in order.
 *                                         `icon` is any node that draws with currentColor; `accent` is any CSS colour.
 * @param {number}   [props.scrollHeight]  Scroll track height in svh. Defaults to 100 + 60 per item.
 * @param {boolean}  [props.upright]       Keep each circle (and its icon) upright while the ring turns.
 * @param {string}   [props.tooltipClassName] Classes for the tooltip card (colours, radius, padding).
 */
export default function Process({
  items = CONTENT,
  scrollHeight = 100 + items.length * 60,
  upright = true,
  slot = 0,
  offsetTop = "0px",
  tooltipClassName = TOOLTIP_CLASS,
  className,
  style,
}) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const tipRef = useRef(null);
  const activeRef = useRef(0); // read inside the scroll handler without re-subscribing
  const hoverRef = useRef(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [hovered, setHovered] = useState(null); // circle under the cursor, or null
  const [tipIndex, setTipIndex] = useState(0); // kept after leaving so the tooltip can fade out with its text
  const count = items.length;

  const accentOf = (item, i) => item.accent ?? PALETTE[i % PALETTE.length];

  // Tooltip placement: bottom-right of the cursor, flipped near the viewport edges.
  // The card has a constant size (all texts are stacked), so this never jumps.
  const place = (x, y) => {
    const tip = tipRef.current;
    if (!tip) return;
    const pad = 12;
    const gap = 18;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let left = x + gap;
    let top = y + gap;
    if (left + w > window.innerWidth - pad) left = x - gap - w;
    if (top + h > window.innerHeight - pad) top = y - gap - h;
    tip.style.transform = `translate3d(${Math.max(pad, left)}px, ${Math.max(pad, top)}px, 0)`;
  };
  const enter = (e, i) => {
    if (e.pointerType === "touch") return; // hover is a desktop feature
    hoverRef.current = i;
    setHovered(i);
    setTipIndex(i);
    place(e.clientX, e.clientY);
  };
  const move = (e, i) => {
    if (e.pointerType === "touch") return;
    // after a scroll the browser may not re-fire enter, so re-arm here
    if (hoverRef.current !== i) enter(e, i);
    else place(e.clientX, e.clientY);
  };
  const leave = () => {
    hoverRef.current = null;
    setHovered(null);
  };

  useEffect(() => {
    // Reduced motion: the ring stays still and everything just crossfades.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) setReduce(true);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const ring = ringRef.current;
    let frame = 0;
    let prev = -1; // progress at the previous update
    let time = 0; // timestamp of the previous update
    let blur = 0; // smoothed motion blur in px
    let written = 0; // blur currently written to the DOM

    const update = () => {
      frame = 0;
      const now = performance.now();
      const dt = Math.max(now - time, 1);
      time = now;

      const range = section.offsetHeight - pin.offsetHeight; // distance the hero stays pinned
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0; // where the pin sticks, in px
      const scrolled = pinTop - section.getBoundingClientRect().top;
      const progress =
        range > 0 ? Math.min(1, Math.max(0, scrolled / range)) : 0;

      if (progress !== prev) {
        if (!reduceMotion) stage.style.setProperty("--turn", -progress * 360);

        // Text i owns steps i..i+1. Swap at each boundary, with a little
        // hysteresis so hovering on the edge does not flip back and forth.
        const step = progress * count;
        let next = activeRef.current;
        while (next < count - 1 && step >= next + 1 + HYSTERESIS) next++;
        while (next > 0 && step < next - HYSTERESIS) next--;
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActive(next);
        }
      }

      if (!reduceMotion) {
        // Blur follows how fast the ring turns (turns per second), smoothed in
        // and out over time so it neither pops on nor sticks after you stop.
        const speed = prev < 0 ? 0 : (Math.abs(progress - prev) / dt) * 1000;
        const target = Math.min(MOTION_BLUR.max, speed * MOTION_BLUR.gain);
        blur += (target - blur) * (1 - Math.exp(-dt / MOTION_BLUR.smooth));
        if (blur < 0.05) blur = 0;
        if (blur !== written) {
          written = blur;
          ring.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : "none";
        }
        if (blur) request(); // keep easing out after the scroll stops
      }
      prev = progress;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      // the ring is moving under the cursor, so drop the (now stale) hover
      if (hoverRef.current !== null) {
        hoverRef.current = null;
        setHovered(null);
      }
      request();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", request);
    };
  }, [count]);

  const shown = hovered !== null;

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: `${scrollHeight}svh`,
        background: BG,
        color: FG,
        ...style,
      }}
    >
      <div
        ref={pinRef}
        style={{
          position: "sticky",
          top: offsetTop,
          height: `calc(100svh - ${offsetTop})`,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={stageRef}
          style={{
            position: "relative",
            width: `min(94vw, calc((100svh - ${offsetTop}) * 0.94))`,
            aspectRatio: "1",
          }}
        >
          {/* soft light in the middle of the stage, so the dark discs have something to sit against */}
          {/* faint orbit track the circles ride on */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${50 - RING * 100}%`,
              top: `${50 - RING * 100}%`,
              width: `${RING * 200}%`,
              height: `${RING * 200}%`,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.16)",
              pointerEvents: "none",
            }}
          />

          <div
            ref={ringRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              transform: SPIN,
              willChange: "transform",
            }}
          >
            {items.map((item, i) => {
              const accent = accentOf(item, i);
              const angle =
                (slot * Math.PI) / 180 + ((i + 0.5) / count) * 2 * Math.PI; // half-step offset: the active slot sits between two circles at each swap
              return (
                <div
                  key={i}
                  onPointerEnter={(e) => enter(e, i)}
                  onPointerMove={(e) => move(e, i)}
                  onPointerLeave={leave}
                  style={{
                    position: "absolute",
                    // positioned by the box centre, so scaling pivots on the circle itself
                    left: `${50 + Math.sin(angle) * RING * 100 - LENS * 50}%`,
                    top: `${50 - Math.cos(angle) * RING * 100 - LENS * 50}%`,
                    width: `${LENS * 100}%`,
                    height: `${LENS * 100}%`,
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    color: accent,
                    background: `${mix(accent, 100, "#0d0d10")}`,
                    border: `1px solid ${mix(accent, 100)}`,
                    transform: upright ? UNSPIN : "none",
                    willChange: upright ? "transform" : undefined,
                    ...circleState(hovered, i, reduce),
                  }}
                >
                  {/* lights up while this circle is the one at the top (matches the centre text) */}
                  <span
                    style={{
                      position: "absolute",
                      inset: -1,
                      borderRadius: "50%",
                      background: "#F6F1E7",
                      opacity: active === i ? 1 : 0,
                      transition: reduce
                        ? "opacity 0.3s ease"
                        : "opacity 0.7s ease",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      width: `${ICON * 100}%`,
                      height: `${ICON * 100}%`,
                      display: "grid",
                      placeItems: "center",
                      color: "#0A0A0B",
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>

          {/* pointer-events none: this layer covers the whole stage and must not block the circles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* every text shares one grid cell, so the block never changes size or position */}
            <div style={{ width: "54%", display: "grid", textAlign: "center" }}>
              {items.map(({ title, description }, i) => {
                const rel = Math.sign(i - active);
                return (
                  <div
                    key={i}
                    style={{ gridArea: "1 / 1", alignSelf: "center" }}
                  >
                    <Swap
                      rel={rel}
                      reduce={reduce}
                      enterDelay={0.14}
                      leaveDelay={0}
                      blur={6}
                    >
                      <h3 className="opacity-50 text-xl text-center">
                        {description}
                      </h3>
                    </Swap>
                    <Swap
                      rel={rel}
                      reduce={reduce}
                      enterDelay={0.22}
                      leaveDelay={0.04}
                      blur={10}
                      className="!max-w-[16ch] text-center"
                    >
                      <ElementHeading>{title}</ElementHeading>
                    </Swap>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* The tooltip text duplicates the circle's item, so it is hidden from assistive tech. */}
      <div
        ref={tipRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 50,
          width: "17rem",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div className={tooltipClassName} style={cardState(shown, reduce)}>
          {/* all texts stacked in one cell: the card keeps one size and crossfades between them */}
          <div style={{ display: "grid" }}>
            {items.map((item, i) => {
              const accent = accentOf(item, i);
              return (
                <div key={i} style={tipTextState(i === tipIndex, reduce)}>
                  <div className="flex align-baseline gap-2">
                    <div className="opacity-60">({item.description})</div>
                    <div className="">{item.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
