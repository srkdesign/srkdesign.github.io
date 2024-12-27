import { motion } from "motion/react";

const MotionContainer = ({ children }) => {
  return (
    <motion.main
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
};

export default MotionContainer;
