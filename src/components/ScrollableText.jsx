import { useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "../consts";

const ScrollableText = ({
  from = "0%",
  to = "-50%",
  style = "*:text-5xl lg:*:text-9xl",
  padding,
  heading,
  subheading,
}) => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], [`${from}`, `${to}`]);

  return (
    <section className="overflow-hidden z-50">
      <motion.div
        style={{ x }}
        transition={{ ease: EASE }}
        className={`relative items-center flex justify-start whitespace-nowrap ${style} translate-x-0 *:whitespace-nowrap *:inline-block gap-10 px-4 ${padding}`}
      >
        <h1 className="after:content-['—'] after:pl-10" data-heading="scroll">
          {heading}
        </h1>
        <h2 className="after:content-['—'] after:pl-10" data-heading="scroll">
          {subheading}
        </h2>
      </motion.div>
    </section>
  );
};

export default ScrollableText;
