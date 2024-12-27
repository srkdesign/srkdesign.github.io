import { motion } from "motion/react";

const PostLink = ({ id, title, date, image }) => {
  return (
    <motion.li
      className="border-t last:border-b border-white/10 gap-2 relative"
      initial="initial"
      whileHover="whileHover"
    >
      <a
        href={`/blog/${id}/`}
        className="flex flex-col md:flex-row justify-between md:items-center pt-10 pb-11"
      >
        <h4 className="lg:text-7xl md:text-5xl text-2xl max-w-5xl">{title}</h4>
        <motion.img
          src={image}
          alt={title}
          className="md:w-96 absolute top-1/2 left-3/4 z-10 w-0"
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
        <p className="text-md md:text-2xl">{date}</p>
      </a>
    </motion.li>
  );
};

export default PostLink;
