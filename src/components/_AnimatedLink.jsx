import { motion } from "motion/react";

const AnimatedLink = ({ openInNewTab, href, children }) => {
  return (
    <motion.a
      href={href}
      target={openInNewTab ? "_blank" : ""}
      rel="noopener noreferrer"
      className="relative whitespace-nowrap"
      initial="initial"
      whileHover="whileHover"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <motion.span
        className="absolute -bottom-px left-0 w-full h-px bg-white/75 overflow-x-hidden"
        variants={{
          initial: { clipPath: "inset(0 100% 0 0)" },
          whileHover: { clipPath: "inset(0 0 0 0)" },
          exit: { clipPath: "inset(0 100% 0 0)" },
        }}
      ></motion.span>
    </motion.a>
  );
};

export default AnimatedLink;
