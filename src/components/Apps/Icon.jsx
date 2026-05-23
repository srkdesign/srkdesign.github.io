import { motion, useMotionValue } from "motion/react";
import { useState } from "react";

const Icon = ({ id, title, icon, initialX, initialY, hover, selected }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const active = hover || selected;

  return (
    <motion.div
      className={`absolute ${isGrabbing ? "cursor-grabbing!" : ""} select-none z-50`}
      drag
      onDragStart={() => setIsGrabbing(true)}
      onDragEnd={() => setIsGrabbing(false)}
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y }}
      whileDrag={{ scale: 1.03, zIndex: 50, cursor: "grabbing" }}
      data-icon
    >
      <a
        // href={`/apps/${id}`}
        className={`group block w-min h-min ${isGrabbing ? "cursor-grabbing!" : ""}`}
        onClick={(e) => e.preventDefault()}
        draggable={false}
        onDoubleClick={() => {
          location.href = `/apps/${id}`;
        }}
      >
        <article className="flex flex-col gap-1 items-center">
          <div
            className={`border border-transparent group-hover:border-white/20 group-hover:bg-white/10 rounded-md p-2 ${active ? "border-white/20 bg-white/10" : ""}`}
          >
            <img
              className="max-w-12 h-auto rounded-lg"
              src={icon}
              alt={`${title} Icon`}
              draggable={false}
            />
          </div>
          <div
            className={`group-hover:bg-zinc-50 group-hover:text-zinc-950 rounded-md px-1 py-px text-sm font-medium max-w-full ${active ? "bg-zinc-50 text-zinc-950" : ""}`}
          >
            <h3 className="text-center leading-tight">{title}</h3>
          </div>
        </article>
      </a>
    </motion.div>
  );
};

export default Icon;
