import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

import { useTranslation } from "react-i18next";

const images = [
  "/images/projects/bezpart/hero.png",
  "/images/projects/royalsteam/hero_updated.png",
  "/images/projects/cristal-print/hero.png",
  "/images/projects/bezpart/hero_final.png",
  "/images/projects/solidt/page.png",
  "/images/projects/bezpart/shirt.png",
  "/images/projects/belarus-remont/hero.png",
  "/images/projects/cristal-print/hero_updated.png",
  "/images/projects/project-svs/hero.png",
];

// Helper function to generate a random number between min and max
const random = (min, max) => Math.random() * (max - min) + min;

export default function ScrollingGrid({ heading, subheading }) {
  const { t } = useTranslation();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scatter = useMemo(
    () =>
      images.map(() => ({
        x: random(-200, 200),
        y: random(-200, 200),
        scale: random(0.2, 0.8),
      })),
    [images],
  );

  return (
    <section ref={ref} className="h-[350vh]">
      <div className="sticky top-0 h-screen grid grid-cols-3 grid-rows-3 gap-0 overflow-y-visible">
        {/* Text */}
        <motion.div
          className="absolute w-full h-full flex flex-col items-center justify-center z-20 text-center gap-4"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
          }}
        >
          <h2 className="text-5xl md:text-7xl">{heading}</h2>
          <p className="text-zinc-400">{subheading}</p>
        </motion.div>

        {/* Images */}
        {images.map((src, i) => {
          const t = scatter[i];
          const x = useTransform(scrollYProgress, [0, 1], [t.x, 0]);
          const y = useTransform(scrollYProgress, [0, 1], [t.y, 0]);
          const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

          return (
            <motion.div
              key={i}
              style={{ x, y, scale, backgroundImage: `url(${src})` }}
              className="w-full h-full block bg-cover bg-top m-0 p-0"
            />
          );
        })}
      </div>
    </section>
  );
}
