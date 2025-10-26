import { motion, AnimatePresence } from "motion/react";
import Phrase from "./Phrase.jsx";
import Button from "./Button.jsx";
import Image from "./Image.jsx";
import Link from "./Link.jsx";
import Navigation from "./Navigation.jsx";
import { useEffect, useState } from "react";
import { EASE } from "../../consts.js";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
  }, [isActive]);

  return (
    <header
      className={`lg:px-24 px-8 py-6 flex justify-between items-center sticky top-0 left-0 z-[999] ${
        isActive ? "" : "mix-blend-difference"
      }`}
    >
      <div
        id="logo"
        className="flex items-center gap-5 mix-blend-difference z-[1000]"
      >
        <motion.a href="/" className="" whileHover={{ opacity: 0.6 }}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="mix-blend-difference w-9 h-auto md:w-full"
          />
        </motion.a>
        <Phrase></Phrase>
      </div>
      <Button isActive={isActive} setIsActive={setIsActive}></Button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-[500] origin-top"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 20,
              mass: 0.8,
              ease: "easeOut",
              duration: 0.35,
            }}
          >
            <motion.div className="md:grid flex flex-col justify-between w-full h-full grid-cols-2 grid-flow-col [grid-template-rows:auto]">
              {/* md:grid-cols-2 grid-cols-1 md:grid-flow-col
              md:[&>*:nth-child(-n+4)]:col-start-1
              md:[&>*:nth-child(n+5)]:col-start-2 */}
              <Navigation onHover={setSelectedLink} />
              <Image hovered={selectedLink} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
