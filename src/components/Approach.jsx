import Paragraph from "./Text/Paragraph";

// Solid, fully opaque neon fills, sampled from the reference image.
// Order = left to right. Cycles if you add more items.
const FILLS = ["#F45434", "#29D697", "#926CF9"];

// Placeholder content: [description, title, svg icon paths]
const CONTENT = [
  ["Визуал", "Формирует впечатление и доверие"],
  ["Структура", "Помогает быстро понять ценность и следующий шаг"],
  ["Система", "Позволяет легко редактировать и развивать сайт после запуска"],
].map(([title, description], i) => ({
  title,
  description,
  accent: FILLS[i % FILLS.length],
}));

const accentOf = (item, i) => item.accent ?? FILLS[i % FILLS.length];

const LENS = `relative isolate
  before:absolute before:[inset:calc(var(--gap)_*_-1)] before:-z-10 before:rounded-full
  before:[border:var(--gap)_solid_var(--bg)]
  before:[background-color:var(--overlap)]
  before:[translate:0_calc(var(--ov)_-_100%)]
  before:[clip-path:circle(calc(50%_-_var(--gap))_at_50%_calc(150%_-_var(--ov)))]
  md:before:[translate:calc(var(--ov)_-_100%)_0]
  md:before:[clip-path:circle(calc(50%_-_var(--gap))_at_calc(150%_-_var(--ov))_50%)]`;

const Approach = () => (
  <ul
    className="[--ink:#0a0a0c] [--overlap:#F6F1E7] [--gap:0px] [--ov:40px] md:[--ov:clamp(60px,7.5vw,120px)]
      px-8 md:px-16 w-full grid grid-cols-1 md:grid-cols-3
      *:[margin-inline:calc(var(--ov)_/_-2)] *:-mt-5 *:-mb-5
      *:[border:var(--gap)_solid_var(--bg)]
      *:[background-color:var(--accent)]
      *:text-[var(--ink)] *:transition-[filter] *:duration-500 *:hover:brightness-110
      *:rounded-full *:flex *:flex-col *:items-center *:justify-center
      *:md:row-start-1 *:aspect-square *:md:[padding-inline:var(--ov)]
      [&>*>h3]:text-2xl [&>*>h3]:md:text-[length:clamp(1.25rem,2.9vw,3rem)] [&>*>h3]:font-medium
      [&>*>h3]:tracking-tight [&>*>h3]:leading-[1.05] [&>*>h3]:text-center
      [&>*>h3]:whitespace-normal [&>*>h3]:md:mb-8 [&>*>h3]:mb-4 [&>*>p]:text-center [&>*>p]:max-w-[24ch]"
  >
    {CONTENT.map((item, i) => (
      <li
        key={i}
        className={`group ${i > 0 ? LENS : ""}`}
        style={{ "--accent": accentOf(item, i) }}
      >
        <h3>{item.title}</h3>
        <Paragraph>{item.description}</Paragraph>
      </li>
    ))}
  </ul>
);

export default Approach;
