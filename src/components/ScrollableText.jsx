import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "../consts";

const ProjectPhrase = ({
  from = "0%",
  to = "-50%",
  style = "*:text-5xl lg:*:text-9xl",
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
        className={`relative items-center flex whitespace-nowrap ${style} *:whitespace-nowrap *:inline-block gap-10 px-4`}
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

export default ProjectPhrase;
