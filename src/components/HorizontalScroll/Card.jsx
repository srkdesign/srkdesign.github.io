import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "../../consts";
import { getRelativeLocaleUrl } from "astro:i18n";

const Card = ({ project, locale }) => {
  const [isHovered, setIsHovered] = useState(false);
  const parentVariants = {
    initial: {},
    hover: {},
  };
  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: EASE,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };
  const listVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        ease: EASE,
      },
    },
  };
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.2, ease: EASE },
        y: { duration: 0.5, ease: EASE },
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="static flex-shrink-0 md:w-[50vw] w-screen aspect-video"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variants={parentVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        key={project.id}
      >
        <a
          href={getRelativeLocaleUrl(
            locale,
            `/projects/${
              project.id.includes("/") ? project.id.split("/")[1] : project.id
            }`
          )}
          className="relative block"
        >
          <motion.div
            className="absolute top-0 left-0 z-10 w-full h-full hidden md:block"
            variants={overlayVariants}
          >
            <div className="w-full h-full bg-zinc-950/90 backdrop-blur-sm">
              <div className="flex flex-col gap-4 p-12">
                <div className="flex justify-between items-end">
                  <motion.h3 className="text-4xl" variants={itemVariants}>
                    {project.data.title}
                  </motion.h3>
                  <motion.img
                    className="size-7"
                    variants={itemVariants}
                    src="/icons/arrow.svg"
                    alt=""
                  />
                </div>
                <motion.ul className="flex" variants={listVariants}>
                  {project.data.tags.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="uppercase text-sm border border-white/20 px-4 py-2 rounded-full"
                      variants={itemVariants}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.p
                  className="pt-8 text-xl text-zinc-50/50 text-pretty pr-16"
                  variants={itemVariants}
                >
                  {project.data.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
          <img
            className="w-full h-full object-cover object-top z-0"
            src={project.data.heroImage}
            alt={project.data.title}
            loading="lazy"
          />
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
