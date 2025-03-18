import { motion, useScroll, useTransform } from "motion/react";

const ProjectPhrase = ({ heading, subheading }) => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section className="overflow-hidden z-50">
      <motion.div
        style={{ x }}
        className="relative items-center flex whitespace-nowrap *:text-5xl lg:*:text-9xl *:whitespace-nowrap *:inline-block gap-10 px-4"
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
