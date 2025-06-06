import { motion } from "motion/react";
import { useState } from "react";

const HeadingAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const transition = {
    duration: 0.2,
    ease: [0.33, 1, 0.68, 1],
  };

  const variants = {
    initial: { y: 0 },
    whileHover: { y: "-102%" },
  };

  const variantsOverlay = {
    initial: { opacity: 0, y: "100%" },
    whileHover: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative block overflow-hidden whitespace-nowrap font-extralight text-lg lg:text-xl w-56"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
    >
      <motion.div
        initial="initial"
        variants={variants}
        animate={isHovered ? "whileHover" : "initial"}
        transition={transition}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          pointerEvents: "none",
        }}
      >
        <p className="flex flex-col *:leading-none">
          <span>
            <span className="font-serif italic">web</span> дизайнер
          </span>
          <span>
            &nbsp;и&nbsp;
            <span className="font-serif italic">front-end</span> разработчик
          </span>
        </p>
      </motion.div>
      <motion.div
        initial="initial"
        className="absolute inset-0"
        variants={variantsOverlay}
        animate={isHovered ? "whileHover" : "initial"}
        transition={transition}
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
          pointerEvents: "none",
        }}
      >
        <h2 className="flex flex-col *:leading-none">
          <span>Удобный для верстки</span>
          <span>дизайн и сайты под ключ</span>
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default HeadingAnimation;
