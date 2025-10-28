import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Card from "./Card";
import BubbleText from "./BubbleText";

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
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionWrapper,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <main
      ref={sectionWrapper}
      className="relative min-h-screen bg-zinc-950"
      style={{
        height: `${elements.length * 100}vh`,
      }}
    >
      <section className="sticky xl:top-[15%] top-1/3 left-0">
        <div className="">
          <BubbleText text="srkdesign"></BubbleText>
        </div>

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
