import { useState } from "react";
import { animate, motion } from "motion/react";

const BorderedCard = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="w-full flex flex-col md:gap-8 gap-5 pt-8 pr-4"
      initial="initial"
      whileHover="whileHover"
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="relative">
        <motion.span
          className="absolute -bottom-px left-0 w-full h-px bg-white/75 overflow-x-hidden"
          variants={{
            initial: { clipPath: "inset(0 100% 0 0)" },
            whileHover: { clipPath: "inset(0 0 0 0)" },
            exit: { clipPath: "inset(0 100% 0 0)" },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        ></motion.span>
        <span
          className={`absolute -bottom-px left-0 w-full h-px overflow-x-hidden bg-white/30`}
        ></span>
      </div>
      <div className="flex gap-4 items-center">
        <img
          src={`/icons/${icon}.png`}
          alt=""
          className="md:size-[30px] size-6"
        />
        <h3 className="md:text-3xl text-2xl">{title}</h3>
      </div>
      <p className="md:text-xl text-base opacity-75 mb-8">{description}</p>
    </motion.div>
  );
};

export default BorderedCard;
