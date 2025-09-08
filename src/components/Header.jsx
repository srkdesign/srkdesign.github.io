import { motion } from "motion/react";
import HeadingAnimation from "./HeadingAnimation.jsx";
import AnimatedLink from "./AnimatedLink.jsx";
import {
  MEDIA_URL_BOOSTY,
  MEDIA_URL_GITHUB,
  MEDIA_URL_KWORK,
} from "../consts.ts";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-[100] flex items-center justify-between flex-shrink-0 w-full gap-6 px-8 py-6 lg:px-24 mix-blend-difference mb-14 md:mb-0">
      <div id="logo" className="flex items-center gap-5">
        <motion.a href="/" whileHover={{ opacity: 0.6 }}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="mix-blend-difference w-9 h-auto md:w-full"
          />
        </motion.a>
        <HeadingAnimation />
      </div>
      <ul
        id="header-links"
        className="hidden md:flex flex-col md:flex-row gap-px md:gap-12 mix-blend-difference text-base pr-4 md:pr-0"
      >
        <li>
          <AnimatedLink href="/web-design/" openInNewTab={true}>
            Веб-дизайн
          </AnimatedLink>
        </li>
        {/* <li>
          <AnimatedLink href="/web-design/" openInNewTab={true}>
            Верстка сайтов
          </AnimatedLink>
        </li>
        <li>
          <AnimatedLink href="/web-design/" openInNewTab={true}>
            Сайты под ключ
          </AnimatedLink>
        </li> */}
        <li>
          <AnimatedLink href={MEDIA_URL_KWORK} openInNewTab={true}>
            Kwork
          </AnimatedLink>
        </li>
        <li>
          <AnimatedLink href={MEDIA_URL_BOOSTY} openInNewTab={true}>
            Boosty
          </AnimatedLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
