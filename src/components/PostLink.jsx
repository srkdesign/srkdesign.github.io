import { motion } from "motion/react";
import { CATEGORIES } from "../categories";
import { getRelativeLocaleUrl } from "astro:i18n";

const PostLink = ({ id, title, category, date, image }) => {
  const [locale, slug] = id.split("/");
  return (
    <motion.li
      className="border-t border-white/10 relative lg:px-24 px-8 group-hover:opacity-50 hover:!opacity-100 hover:border-b duration-300 ease-in-out"
      initial="initial"
      whileHover="whileHover"
      key={id}
    >
      <a
        href={getRelativeLocaleUrl(locale, `blog/${id.split("/")[1]}`)}
        className="flex flex-col md:flex-row justify-between md:items-center pt-5 pb-6 lg:gap-24 gap-4"
      >
        <h4 className="md:text-3xl text-2xl max-w-5xl line-clamp-2 overflow-visible">
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
        <div className="text-md md:text-xl lg:w-48 lg:pl-1 flex lg:justify-start">
          <div>
            <p className="opacity-50">{date}</p>
            <p>{CATEGORIES[category]}</p>
          </div>
        </div>
      </a>
    </motion.li>
  );
};

export default PostLink;
