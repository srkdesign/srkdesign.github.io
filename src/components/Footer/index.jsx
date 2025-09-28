import { SITE_URL } from "../../consts.js";
import GetYear from "../../utils/GetYear.js";
import AnimatedLink from "./Link.jsx";

import { MENU_LINKS } from "../../consts.js";
import { MEDIA_LINKS } from "../../consts.js";

const Footer = () => {
  return (
    <footer className="relative py-24 flex flex-col md:flex-row justify-between px-8 lg:px-24 gap-24 *:w-full ">
      <div className="flex flex-col xl:justify-self-start max-w-96">
        <h3 className="text-3xl font-medium mb-10">Будет полезно</h3>
        <div className="*:text-xl">
          <ul className="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4">
            {Object.entries(MENU_LINKS).map(([key, { label, href }]) => (
              <li key={key}>
                <AnimatedLink href={href} openInNewTab={false}>
                  {label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col xl:justify-self-start max-w-96">
        <h3 className="text-3xl font-medium mb-10">Другие ссылки</h3>
        <div className="*:text-xl">
          <ul className="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4">
            {Object.entries(MEDIA_LINKS).map(([key, { label, href }]) => (
              <li key={key}>
                <AnimatedLink href={href} openInNewTab={false}>
                  {label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col h-full max-w-fit xl:justify-self-end">
        <div className="text-base">
          <p id="footer-copyright" className="*:mr-1 mb-5 md:flex flex-col">
            <span>
              © {GetYear()} {SITE_URL}. Все права соблюдены.
            </span>
            <span id="footer-disclaimer">
              На сайте используются реферальные ссылки.
            </span>
            <span id="footer-acknowledgements">Особая благодарность osk.</span>
          </p>
          <ul className="flex gap-4 *:size-6">
            <li>
              <img src="/icons/figma.png" alt="Figma" />
            </li>
            <li>
              <img src="/icons/vs-code.png" alt="Vs Code" />
            </li>
            <li>
              <img src="/icons/astro.png" alt="Astro" />
            </li>
            <li>
              <img src="/icons/react.png" alt="React" />
            </li>
            <li>
              <img src="/icons/tailwind.png" alt="Tailwind" />
            </li>
            <li>
              <img src="/icons/github.png" alt="Github" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
