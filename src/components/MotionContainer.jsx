import { motion } from "motion/react";
import { memo, Suspense, useEffect, useState } from "react";
import { EASE } from "../consts";

const MotionContainer = memo(({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  return (
    <motion.main
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      // exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.main>
  );
});

export default MotionContainer;
