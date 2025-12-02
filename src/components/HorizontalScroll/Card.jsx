import React from "react";
import { motion } from "motion/react";

const Card = ({ element }) => {
  return (
    <motion.div
      className="static flex-shrink-0 md:w-[50vw] w-screen aspect-video"
      initial="initial"
      whileHover="hover"
      key={element.id}
    >
      <a href={`/projects/${element.id}`} className="relative block">
        <motion.div
          className="absolute top-0 left-0 z-10 w-full h-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="w-full h-full bg-zinc-950/90 backdrop-blur-sm">
            <div className="flex flex-col gap-1 p-8 mix-blend-difference">
              <h3 className="text-3xl">{element.data.title}</h3>
              <p className="uppercase text-md">
                {element.data.responsibilities}
              </p>
            </div>
          </div>
        </motion.div>
        <img
          className="w-full h-full object-cover object-top z-0"
          src={element.data.heroImage}
          alt={element.data.title}
          loading="lazy"
        />
      </a>
    </motion.div>
  );
};

export default Card;
