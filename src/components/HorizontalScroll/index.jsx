import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Card from "./Card";

const HorizontalScroll = ({ elements }) => {
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
  }, [elements]);

  const { scrollYProgress } = useScroll({
    target: sectionWrapper,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <main
      ref={sectionWrapper}
      className="relative min-h-screen"
      style={{
        height: `${elements.length * 100}vh`,
      }}
    >
      <section className="sticky xl:top-[15%] top-1/3 left-0">
        <h1 className="font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none firefox-leading -mb-[min(1.5rem,1.5%)] z-50 mix-blend-difference select-none block text-zinc-50">
          srkdesign
        </h1>
        <div className="overflow-x-auto hide-scrollbar">
          <motion.div style={{ x }} ref={scrollContent} className="flex">
            {elements.map((el) => (
              <Card element={el} key={el.id} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HorizontalScroll;
