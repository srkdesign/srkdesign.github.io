import { motion } from "motion/react";
import { CATEGORIES } from "../categories";

const PostLink = ({ id, title, category, date, image }) => {
  return (
    <motion.li
      className="border-t last:border-b border-white/10 relative lg:px-24 px-8"
      initial="initial"
      whileHover="whileHover"
      key={id}
    >
      <a
        href={`/blog/${id}/`}
        className="flex flex-col md:flex-row justify-between md:items-center pt-10 pb-11 lg:gap-24 gap-4"
      >
        <h4 className="lg:text-5xl md:text-5xl text-2xl max-w-5xl line-clamp-2">
          {title}
        </h4>
        <motion.img
          src={image}
          alt={title}
          className="md:w-96 absolute top-1/2 left-[70%] z-10 w-0"
          variants={{
            initial: {
              x: "-15%",
              scale: 0,
              rotate: "30deg",
              translateX: "-50%",
              translateY: "-50%",
            },
            whileHover: { x: 0, scale: 1.1, rotate: "0deg" },
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        <div className="text-md md:text-2xl lg:w-40 flex lg:justify-start">
          <div>
            <p>{date}</p>
            <p className="opacity-50">{CATEGORIES[category]}</p>
          </div>
        </div>
      </a>
    </motion.li>
  );
};

export default PostLink;
