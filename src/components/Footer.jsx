import { SITE_URL, MEDIA_URL_KWORK, MEDIA_URL_GITHUB } from "../consts";
import GetYear from "../utils/GetYear";
import AnimatedLink from "./_AnimatedLink.jsx";

const Footer = () => {
  return (
    <footer className="py-24 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 lg:px-24 gap-24 static">
      <div className="flex flex-col xl:justify-self-start">
        <h3 className="text-3xl font-medium mb-10">Будет полезно</h3>
        <div className="flex lg:gap-24 gap-12 *:text-xl *:flex *:flex-col *:gap-4">
          <ul>
            <li>
              <AnimatedLink href="/blog/" openInNewTab={false}>
                Статьи
              </AnimatedLink>
            </li>
            <li>
              <a>
                Обучающие материалы <br />
                (скоро)
              </a>
            </li>
            <li>
              <AnimatedLink href="/resources/" openInNewTab={false}>
                Ресурсы
              </AnimatedLink>
            </li>
          </ul>
          <ul>
            <li>
              <a>Шаблоны (скоро)</a>
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
              <a>Behance (скоро)</a>
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
          <p id="footer-copyright" className="">
            © {GetYear()} {SITE_URL}. Все права соблюдены.
          </p>
          <p id="footer-disclaimer">
            На сайте используются реферальные ссылки.
          </p>
          <p id="footer-acknowledgements">Особая благодарность osk.</p>
        </div>
        <a href="https://astro.build">
          <img
            src="https://astro.badg.es/v2/built-with-astro/small.svg"
            alt="Built with Astro"
            width="192"
            height="32"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
