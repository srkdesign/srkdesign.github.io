// components/TableOfContents.tsx
import { useCallback, useEffect, useRef, useState } from "react";

const VISIBLE_AT_ONCE = 5;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);

    const handler = (e) => setIsDesktop(e.matches);

    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

const TableOfContents = ({ headings }) => {
  const [activeSlug, setActiveSlug] = useState(null);
  const listRef = useRef(null);
  const viewportRef = useRef(null);
  const itemHeight = useRef(0);
  const isDesktop = useIsDesktop();

  const measureItemHeight = useCallback(() => {
    const items = listRef.current?.querySelectorAll("li");
    if (!items || items.length < 2) return;

    const tops = Array.from(items).map((el) => el.getBoundingClientRect().top);
    const gaps = tops.slice(1).map((top, i) => top - tops[i]);
    const avg = gaps.reduce((sum, g) => sum + g, 0) / gaps.length;

    if (avg === 0) return;
    itemHeight.current = avg;
    if (viewportRef.current) {
      viewportRef.current.style.height = `${VISIBLE_AT_ONCE * avg}px`;
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      if (viewportRef.current) viewportRef.current.style.height = "auto";
      if (listRef.current) listRef.current.style.transform = "none";
      if (listRef.current) listRef.current.style.height = "auto";
      return;
    }

    measureItemHeight();
    const ro = new ResizeObserver(measureItemHeight);
    const firstItem = listRef.current?.querySelector("li");
    if (firstItem) ro.observe(firstItem);
    return () => ro.disconnect();
  }, [isDesktop, measureItemHeight]);

  useEffect(() => {
    const content = document.querySelectorAll(".prose h2");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ai = headings.findIndex((h) => h.slug === a.target.id);
            const bi = headings.findIndex((h) => h.slug === b.target.id);
            return ai - bi;
          });
        if (visible.length) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );
    content.forEach((h) => observer.observe(h));
    return () => content.forEach((h) => observer.unobserve(h));
  }, [headings]);

  useEffect(() => {
    if (!isDesktop) return;

    const h = itemHeight.current;
    if (!h || !listRef.current) return;
    const activeIdx = headings.findIndex((h) => h.slug === activeSlug);
    if (activeIdx === -1) return;
    const maxOffset = Math.max(0, headings.length - VISIBLE_AT_ONCE);
    let offset = activeIdx - Math.floor(VISIBLE_AT_ONCE / 2);
    offset = Math.max(0, Math.min(offset, maxOffset));
    listRef.current.style.transform = `translateY(${-offset * h}px)`;
  }, [activeSlug, headings, isDesktop]);
  return (
    <div
      ref={viewportRef}
      className="relative md:overflow-hidden after:content-['']  after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-zinc-950 after:pointer-events-none md:after:opacity-100 after:opacity-0"
    >
      <ul
        ref={listRef}
        className="flex flex-col gap-2 ease-in-out mb-16 md:mb-0"
        data-toc
      >
        {headings?.map((heading, idx) => (
          <li key={idx}>
            <a
              href={`#${heading.slug}`}
              className={`flex md:text-base text-xl toc-link transition-colors duration-500 ease-in-out ${activeSlug === heading.slug ? "text-zinc-50" : "text-neutral-400"}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
