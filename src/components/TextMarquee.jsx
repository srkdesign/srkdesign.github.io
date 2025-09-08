import { animate, motion } from "motion/react";

const TextMarquee = ({ from, to, children }) => {
  const animation = {
    duration: 30,
    repeat: Infinity,
    ease: "linear",
  };
  return (
    <div className="flex text-7xl *:flex *:flex-shrink-0 *:gap-24 *:px-12 bg-zinc-50 py-8 text-black w-full">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={animation}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={animation}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextMarquee;
