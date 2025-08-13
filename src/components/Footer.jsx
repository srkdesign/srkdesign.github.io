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
    <footer className="py-24 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 lg:px-24 gap-24 static *:w-full">
      <div className="flex flex-col xl:justify-self-start">
        <h3 className="text-3xl font-medium mb-10">Будет полезно</h3>
        <div className="flex gap-11 *:text-xl *:flex *:flex-col *:gap-4">
          <ul>
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
          </ul>
          <ul>
            <li>
              <AnimatedLink href="/apps/" openInNewTab={false}>
                Приложения
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink href="/time-machine/" openInNewTab={false}>
                Машина времени
              </AnimatedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col xl:justify-self-center">
        <h3 className="text-3xl font-medium mb-10">Другие ссылки</h3>
        <div className="flex lg:gap-24 *:text-xl *:flex *:flex-col *:gap-4">
          <ul className="w-52 md:w-auto">
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
            <li>
              <AnimatedLink href={MEDIA_URL_GITHUB} openInNewTab={true}>
                Github
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink
                href="https://www.reddit.com/user/1Sstudios1/"
                openInNewTab={true}
              >
                Reddit
              </AnimatedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col h-full gap-6 xl:justify-self-end">
        <div className="text-lg flex-grow">
          <ul className="flex gap-16">
            <li>
              <StatsItem number="90" description="выполненных проектов" />
            </li>
            <li>
              <StatsItem number="50" description="положительных отзывов" />
            </li>
          </ul>
        </div>
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
