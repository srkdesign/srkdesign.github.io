import React from "react";
import { motion } from "motion/react";
import Link from "./Link.jsx";

import { EASE, MENU_LINKS } from "../../consts.ts";

const Navigation = ({ onHover, onNavigate }) => {
  const links = Array.isArray(MENU_LINKS)
    ? MENU_LINKS
    : Object.entries(MENU_LINKS).map(([key, value]) => ({ key, ...value }));

  const handleClick = () => {
    if (onNavigate) onNavigate();
  };
  return (
    <motion.div className="flex flex-col justify-end gap-6 text-white lg:px-24 px-8 lg:py-24 py-8 pt-36">
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          data-soup
          className="md:text-5xl text-3xl w-fit group transition-transform cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.3, ease: EASE }}
          onMouseEnter={() => onHover(link.image)}
          onClick={handleClick}
        >
          <Link label={link.label}></Link>
          {/* {link.label} */}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Navigation;
