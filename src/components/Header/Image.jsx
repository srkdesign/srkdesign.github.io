import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Image = ({ hovered }) => {
  return (
    <div className="md:w-full md:h-full justify-self-stretch">
      <AnimatePresence mode="wait">
        <motion.div
          style={{
            backgroundImage: `url("${hovered}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            // Safari rendering hints
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            willChange: "opacity, transform",
          }}
          className="block w-auto h-full pointer-events-none"
          aria-hidden
        ></motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Image;
