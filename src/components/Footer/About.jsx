import React from "react";
import { SITE_URL } from "../../consts.js";
import GetYear from "../../utils/GetYear.js";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full max-w-fit xl:justify-self-end">
      <div className="text-lg flex gap-4 items-center">
        <img src="/logo_alt.svg" alt="" className="hidden lg:block size-12" />
        <p id="footer-copyright" className="md:flex flex-col">
          <span>
            © {GetYear()} {SITE_URL}. {t("nav.copyright")}
          </span>
          {/* <span id="footer-disclaimer">
            На сайте используются реферальные ссылки.
          </span> */}
          <span id="footer-acknowledgements">{t("nav.acknowledgements")}</span>
        </p>
        {/* <ul className="flex gap-4 *:size-6">
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
        </ul> */}
      </div>
    </div>
  );
};

export default About;
