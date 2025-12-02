import { motion, transform } from "motion/react";
import { EASE } from "../../consts";

const BubbleText = ({ text }) => {
  const transition = {
    duration: 1,
    opacity: {
      duration: 0.1,
      ease: EASE,
    },
    y: {
      duration: 0.3,
      ease: EASE,
    },
    transform: {
      duration: 0.4,
      ease: EASE,
    },
  };

  const variants = {
    initial: { opacity: 1, transform: "skew(0)" },
    hover: { opacity: 0, transform: "skew(-0.03turn)" },
  };

  const overlayVariants = {
    initial: { opacity: 0, y: 5 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <h2 className="font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none firefox-leading -mb-[min(1.5rem,1.5%)] mix-blend-difference select-none text-zinc-50 relative z-[999999]">
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          className="relative inline-block"
          initial="initial"
          whileHover="hover"
        >
          <motion.span
            variants={variants}
            transition={transition}
            className="inline-block"
            style={{
              pointerEvents: "none",
              willChange: "opacity",
            }}
          >
            {char}
          </motion.span>
          <motion.span
            variants={overlayVariants}
            transition={transition}
            className="absolute inset-0 font-extralight italic inline-block"
            style={{
              pointerEvents: "none",
              willChange: "opacity, transform",
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </h2>
  );
};

export default BubbleText;
