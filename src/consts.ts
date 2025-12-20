// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import i18n from "i18next";
import { getRelativeLocaleUrl } from "astro:i18n";

export const SITE_TITLE = "srkdesign";
export const SITE_DESCRIPTION =
  "Портфолио веб-дизайнера и front-end разработчика. Создание адаптивных сайтов: UX/UI дизайн, верстка, React, JavaScript, WordPress, Elementor";
export const SITE_URL = "srkdesign.pro";

export const MENU_LINKS = [
  {
    label: "nav.links.webdesign",
    href: "/web-design",
    image: "/images/menu/webdesign",
  },
  {
    label: "nav.links.blog",
    href: "/blog",
    image: "/images/menu/blog",
  },
  {
    label: "nav.links.apps",
    href: "/apps",
    image: "/images/menu/apps",
  },
  {
    label: "nav.links.resources",
    href: "/resources",
    image: "/images/menu/resources",
  },
];

export const MEDIA_LINKS = [
  { label: "Medium", href: "https://medium.com/@srkdesign" },
  { label: "Youtube", href: "https://www.youtube.com/@srkdesignpro" },
];

export const EASE = [0.33, 1, 0.68, 1];
