import { motion } from "motion/react";
import { CATEGORIES } from "../categories";
import { getRelativeLocaleUrl } from "astro:i18n";
import { useTranslation } from "react-i18next";

type PostLinkProps = {
  id: string;
  title: string;
  category?: string;
  date?: string;
  image?: string;
  tags?: Array<string>;
};

const PostLink = ({
  id,
  title,
  category,
  date,
  image,
  tags,
}: PostLinkProps) => {
  const { t } = useTranslation();
  const [locale, slug] = id.split("/");
  return (
    <motion.li
      className="border-t border-t-white/10 border-b border-b-zinc-950 relative lg:px-24 px-8 group-hover:opacity-30 hover:!opacity-100 hover:!border-b-white/10 duration-300 ease-in-out"
      initial="initial"
      whileHover="whileHover"
      key={id}
    >
      <a
        href={getRelativeLocaleUrl(locale, `blog/${id.split("/")[1]}`)}
        className="flex flex-col md:flex-row justify-between md:items-center pt-7 pb-8 lg:gap-24 gap-4"
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
        <div className="text-md md:text-xl lg:pl-1 flex lg:justify-start">
          <div className="uppercase flex flex-col gap-0">
            <p className="opacity-50">
              {tags ? t(`blog.tags.${tags[0].toString().toLowerCase()}`) : ""}
            </p>
          </div>
        </div>
      </a>
    </motion.li>
  );
};

export default PostLink;
