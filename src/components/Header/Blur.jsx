/**
 * Progressive header blur — seam-free version of the single-layer overlay.
 *
 * WHY THE ORIGINAL HAS A HARD EDGE:
 * `backdrop-filter: blur(6px)` behind a gradient *mask* only fades that
 * layer's opacity in and out — the blur radius stays frozen at 6px
 * everywhere the mask is non-zero. So the instant the mask lifts off 0%,
 * you get a patch of pixels already blurred by the full 6px, just faint.
 * There's no "2px blurred" step in between sharp and 6px — it jumps
 * straight there. That jump is the seam.
 *
 * THE FIX:
 * CSS has no native "blur radius gradient," so the standard workaround
 * (used for essentially every smooth frosted-nav effect on the web) is
 * to stack several blur layers with radii that roughly double —
 * 0.5, 1, 2, 4, 8, 16, 32, 64px — each masked to only a narrow,
 * overlapping band of the header's height. Near the top edge, several
 * strong layers overlap and compound into a heavy blur. Moving down,
 * the strongest layers fade out first, then the next, then the next —
 * so the *effective* blur ramps down continuously instead of a single
 * radius popping in and fading. That continuous ramp is what reads as
 * smooth instead of hard-edged.
 */

const HEIGHT = 192; // px — same as your original

// Each layer's blur roughly doubles; its gradient band slides toward
// y=0 as the blur gets stronger, so bands overlap ~50% with their
// neighbors. Together the 8 layers span the full 0–192px range exactly.
const LAYERS = [
  {
    blur: 0.5,
    stops: "transparent 120px, black 144px, black 168px, transparent 192px",
  },
  {
    blur: 1,
    stops: "transparent 96px, black 120px, black 144px, transparent 168px",
  },
  {
    blur: 2,
    stops: "transparent 72px, black 96px, black 120px, transparent 144px",
  },
  {
    blur: 4,
    stops: "transparent 48px, black 72px, black 96px, transparent 120px",
  },
  {
    blur: 8,
    stops: "transparent 24px, black 48px, black 72px, transparent 96px",
  },
  {
    blur: 16,
    stops: "transparent 0px, black 24px, black 48px, transparent 72px",
  },
  { blur: 24, stops: "black 0px, black 24px, transparent 48px" },
  { blur: 64, stops: "black 0px, transparent 24px" },
];

export default function Blur() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[998] pointer-events-none"
      style={{ height: HEIGHT }}
    >
      {LAYERS.map(({ blur, stops }, i) => {
        const mask = `linear-gradient(to bottom, ${stops})`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

// TUNING
// - Too strong / too GPU-heavy: drop the last layer or two (64px, 32px)
//   — cutting to 5-6 layers still looks smooth, just less "melted."
// - Different height: rescale every px value proportionally (each band
//   is exactly HEIGHT/8 = 24px wide at the default 192px height).
// - Blur behind a *bottom* bar instead: flip `linear-gradient(to bottom, ...)`
//   to `linear-gradient(to top, ...)` and anchor the wrapper with `bottom-0`
//   instead of `top-0`.
