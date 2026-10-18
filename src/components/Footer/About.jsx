import React from "react";
import { SITE_URL } from "../../consts.js";
import GetYear from "../../utils/GetYear.js";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className=" h-full w-full">
      <div className="text-lg flex gap-4 justify-center opacity-50 col-span-2 col-start-3">
        {/* <img
          src="/logo_alt.svg"
          alt=""
          className="hidden lg:inline-block size-10"
        /> */}
        <p id="footer-copyright" className="md:flex text-center leading-tight">
          <span className="text-base">
            © {GetYear()} {SITE_URL}. {t("nav.copyright")}{" "}
            {t("nav.acknowledgements")}
          </span>
          {/* <span id="footer-disclaimer">
            На сайте используются реферальные ссылки.
          </span> */}
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
