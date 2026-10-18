import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Card from "./Card";
import BubbleText from "./BubbleText";

const HorizontalScroll = ({ elements, locale }) => {
  const sectionWrapper = useRef(null);
  const scrollContent = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    const updateScrollWidth = () => {
      if (scrollContent.current) {
        const totalWidth = scrollContent.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(totalWidth - viewportWidth);
      }
    };
    updateScrollWidth();
    window.addEventListener("resize", updateScrollWidth);
    return () => window.removeEventListener("resize", updateScrollWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionWrapper,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={sectionWrapper}
      className="relative min-h-screen bg-zinc-950"
      style={{
        height: `${elements.slice(0, 5).length * 100}vh`,
      }}
    >
      <section className="sticky top-1/3 md:top-0 left-0 h-screen flex flex-col">
        <div className="md:flex-grow"></div>

        <div className="relative mb-1 sm:mb-4">
          <BubbleText text="srkdesign"></BubbleText>
          <h1 className="hidden sm:grid absolute xl:-bottom-[10px] 2xl:-bottom-[4px] w-full md:px-14 text-xl *:flex *:justify-between grid-cols-2 [&>*:not(:last-child)]:pr-16">
            <span>
              <span>Сайты под ключ, которые</span>
              <span>вызывают доверие,</span>
            </span>
            <span>
              <span>удобны для посетителей</span>
              <span>и просты в управлении</span>
            </span>
          </h1>
        </div>

        <div className="static overflow-x-auto hide-scrollbar z-0 isolate">
          <motion.div
            style={{ x }}
            ref={scrollContent}
            className="flex static "
          >
            {elements.slice(0, 5).map((el) => (
              <Card project={el} key={el.id} locale={locale} />
            ))}
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default HorizontalScroll;
