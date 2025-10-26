import React from "react";
import { easeInOut, motion } from "motion/react";
import Link from "./Link";

const Button = ({ isActive, setIsActive }) => {
  return (
    <div
      className="cursor-pointer  text-zinc-300  uppercase text-sm font-medium overflow-hidden w-[88px] h-9 select-none rounded-full border border-white/20 mix-blend-difference z-[999] relative"
      onClick={() => setIsActive(!isActive)}
    >
      <motion.div
        className="group w-full h-full *:flex *:items-center *:justify-center *:h-full *:w-full relative"
        animate={{
          translateY: isActive ? "-100%" : "0",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      >
        <motion.div
          animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.95 : 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* <ShiftText label="Меню" /> */}
          <Link label="Меню"></Link>
        </motion.div>
        <motion.div
          className="absolute top-full left-0 bg-zinc-50 text-zinc-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
            delay: isActive ? 0.05 : 0,
          }}
        >
          <Link label="Закрыть"></Link>
          {/* <ShiftText label="Закрыть" /> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

function ShiftText({ label }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-4 group-hover:-translate-y-full transition-transform duration-300 ease-in-out leading-none">
        <p>{label}</p>
        <p className="absolute top-full left-0">{label}</p>
      </div>
    </div>
  );
}

export default Button;
