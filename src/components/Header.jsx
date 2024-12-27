import { motion } from "motion/react";
import HeadingAnimation from "./_HeadingAnimation.jsx";
import AnimatedLink from "./_AnimatedLink.jsx";
import { MEDIA_URL_GITHUB, MEDIA_URL_KWORK } from "../consts.ts";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-[100] flex items-center justify-between flex-shrink-0 w-full gap-6 px-8 py-6 lg:px-24 mix-blend-difference mb-14 md:mb-0">
      <div id="logo" className="flex items-center gap-2 md:gap-5">
        <motion.a href="/" whileHover={{ opacity: 0.6 }}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="mix-blend-difference size-14 md:size-full"
          />
        </motion.a>
        <HeadingAnimation />
      </div>
      <ul
        id="header-links"
        className="flex flex-col md:flex-row gap-px md:gap-8 capitalize mix-blend-difference text-base pr-4 md:pr-0"
      >
        <li>
          <AnimatedLink href={MEDIA_URL_KWORK} openInNewTab={true}>
            Kwork
          </AnimatedLink>
        </li>
        <li>
          <AnimatedLink href={MEDIA_URL_GITHUB} openInNewTab={true}>
            Github
          </AnimatedLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
