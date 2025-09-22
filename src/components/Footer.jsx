import {
  SITE_URL,
  MEDIA_URL_KWORK,
  MEDIA_URL_BOOSTY,
  MEDIA_URL_GITHUB,
} from "../consts";
import GetYear from "../utils/GetYear";
import AnimatedLink from "./AnimatedLink.jsx";
import StatsItem from "./StatsItem.jsx";

const Footer = () => {
  return (
    <footer className="relative py-24 flex justify-between px-8 lg:px-24 gap-24 *:w-full ">
      <div className="flex flex-col xl:justify-self-start max-w-[36ch]">
        <h3 className="text-3xl font-medium mb-10">Будет полезно</h3>
        <div className="*:text-xl">
          <ul className="grid grid-cols-2 auto-rows-auto gap-x-10 gap-y-4">
            <li>
              <AnimatedLink href="/blog/" openInNewTab={false}>
                Статьи
              </AnimatedLink>
            </li>
            <li>
              <a>Курсы (скоро)</a>
            </li>
            <li>
              <AnimatedLink href="/resources/" openInNewTab={false}>
                Ресурсы
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink href="/apps/" openInNewTab={false}>
                Приложения
              </AnimatedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col h-full max-w-fit xl:justify-self-end">
        <div className="text-base">
          <p id="footer-copyright" className="*:mr-1 mb-5 flex flex-col">
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
