import { motion, useMotionValue } from "motion/react";
import { useState } from "react";

const Icon = ({
  id,
  title,
  icon,
  initialX,
  initialY,
  hover,
  selected,
  index,
  onDragEnd,
}) => {
  const [grabbing, setGrabbing] = useState(false);
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  return (
    // Outer div: only handles x/y position + drag — no animate prop
    <motion.div
      className={`absolute select-none ${grabbing ? "cursor-grabbing!" : ""}`}
      drag
      onDragStart={() => setGrabbing(true)}
      onDragEnd={() => {
        setGrabbing(false);
        onDragEnd(id, x.get(), y.get());
      }}
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y }}
      whileDrag={{ scale: 1.03, zIndex: 50 }}
      data-icon
    >
      {/* Inner div: only handles entry animation — no position */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: Math.min(index * 0.04, 0.6),
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.3 },
        }}
      >
        <a
          className={`group block w-min h-min ${grabbing ? "cursor-grabbing!" : ""}`}
          onClick={(e) => e.preventDefault()}
          draggable={false}
          onDoubleClick={() => {
            location.href = `/apps/${id}`;
          }}
        >
          <article className="flex flex-col gap-1 items-center">
            <div
              className={`border border-transparent group-hover:border-white/20 group-hover:bg-white/10 rounded-md p-2 ${hover || selected ? "border-white/20 bg-white/10" : ""}`}
            >
              <img
                className="max-w-12 h-auto rounded-lg"
                src={icon}
                alt={`${title} icon`}
                draggable={false}
              />
            </div>
            <div
              className={`group-hover:bg-zinc-50 group-hover:text-zinc-950 rounded-md px-1 py-px text-sm font-medium max-w-full ${hover || selected ? "bg-zinc-50 text-zinc-950" : ""}`}
            >
              <h3 className="text-center leading-tight">{title}</h3>
            </div>
          </article>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Icon;
