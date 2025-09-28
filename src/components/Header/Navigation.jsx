import React from "react";
import { motion } from "motion/react";

import { MENU_LINKS } from "../../consts.ts";

const Navigation = ({ onHover }) => {
  const links = Array.isArray(MENU_LINKS)
    ? MENU_LINKS
    : Object.entries(MENU_LINKS).map(([key, value]) => ({ key, ...value }));
  return (
    <motion.div className="flex flex-col justify-end gap-6 text-white lg:px-24 px-8 lg:py-24 py-8 pt-36">
      {links.map((link) => (
        <motion.a
          key={link.key}
          href={link.href}
          className="md:text-5xl text-3xl w-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onMouseEnter={() => onHover(link.image)}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Navigation;
