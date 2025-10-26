import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Image = ({ hovered }) => {
  return (
    <div className="hidden md:block md:w-full md:h-full justify-self-stretch overflow-hidden">
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            className="block w-auto h-full pointer-events-none"
            aria-hidden
          >
            <motion.picture>
              <source srcSet={`${hovered}.webp`} type="image/webp" />
              <img
                src={`${hovered}.png`}
                className="w-full h-full object-cover select-none pointer-events-none bg-center"
              />
            </motion.picture>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Image;
