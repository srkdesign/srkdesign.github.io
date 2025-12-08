import { motion } from "motion/react";
import { useState } from "react";
import { EASE } from "../../consts";
import { useTranslation, Trans } from "react-i18next";

const HeadingAnimation = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const transition = {
    duration: 0.3,
    ease: EASE,
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
          <Trans
            i18nKey="nav.phrase.default"
            components={{
              0: <span></span>,
              1: <span></span>,
              2: <span className="font-serif italic"></span>,
              3: <span></span>,
              4: <span className="font-serif italic"></span>,
            }}
          />
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
          <Trans
            i18nKey="nav.phrase.hover"
            components={{
              0: <span></span>,
              1: <span></span>,
              2: <span></span>,
            }}
          />
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default HeadingAnimation;
