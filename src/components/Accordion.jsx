import { useState } from "react";
import { animate, motion } from "motion/react";
import { EASE } from "../consts";

const Accordion = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.section
      className="relative w-full flex flex-col h-fit"
      initial="initial"
      whileHover="whileHover"
      exit="exit"
      transition={{ duration: 0.4, ease: EASE }}
    >
      <button
        className="flex justify-between items-start gap-8 py-8 w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="md:text-3xl text-xl text-left">{title}</h3>
        <div className="relative flex mt-1 min-w-6 h-6">
          <motion.span className="absolute right-0 block w-full md:h-[2px] h-px bg-zinc-50 bottom-[calc(50%-1px)]"></motion.span>
          <motion.span
            className="absolute right-[calc(50%-1px)] block md:w-[2px] h-full w-px bg-zinc-50"
            animate={{ rotate: isOpen ? 90 : 0 }}
          ></motion.span>
        </div>
      </button>
      <motion.div
        className={`overflow-hidden transition duration-300 ease-in-out ${
          isOpen ? "h-auto" : "h-0"
        }`}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="leading-relaxed md:text-lg text-base overflow-hidden pb-10 opacity-75 font-normal">
          {description}
        </p>
      </motion.div>
      <motion.span
        className="absolute -bottom-px left-0 w-full h-px bg-white/75 overflow-x-hidden"
        variants={{
          initial: { clipPath: "inset(0 100% 0 0)" },
          whileHover: { clipPath: "inset(0 0 0 0)" },
          exit: { clipPath: "inset(0 100% 0 0)" },
        }}
      ></motion.span>
      <span
        className={`absolute -bottom-px left-0 w-full h-px overflow-x-hidden ${
          isOpen ? "bg-white/75" : "bg-white/30"
        } transition-all ease-in-out`}
      ></span>
    </motion.section>
  );
};

export default Accordion;
