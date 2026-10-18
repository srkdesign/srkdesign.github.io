import React from "react";
import Link from "./Link.jsx";
import ElementHeading from "../Text/ElementHeading.jsx";

import { MENU_LINKS, WORK_LINKS } from "../../consts.js";
import { MEDIA_LINKS } from "../../consts.js";
import { useTranslation } from "react-i18next";
import { getRelativeLocaleUrl } from "astro:i18n";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
      <div className="hidden sm:flex flex-col gap-1 leading-none *:md:text-4xl">
        <a href="mailto:hello@srkdesign.pro">hello@srkdesign.pro</a>
        <a href="https://t.me/srkdsgn">@srkdsgn</a>
      </div>
      <div className="grid md:grid-cols-3 gap-16 grid-cols-1 text-sm uppercase [&>*>p]:opacity-60 pt-2 *:grid *:grid-cols-2 [&>*>ul]:flex [&>*>ul]:flex-col [&>*>ul]:gap-2">
        {" "}
        <div>
          <p>{t("nav.useful")}</p>
          <ul className="flex flex-col gap-1">
            {Object.entries(MENU_LINKS).map(([key, { label, href }]) => (
              <li key={key}>
                <Link
                  href={getRelativeLocaleUrl(locale, href)}
                  openInNewTab={false}
                >
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>{t("nav.other")}</p>
          <ul className="flex flex-col gap-1">
            {Object.entries(MEDIA_LINKS).map(([key, { label, href }]) => (
              <li key={key}>
                <Link href={href} openInNewTab={true}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>{t("nav.work")}</p>
          <ul>
            {Object.entries(WORK_LINKS).map(([key, { label, href }]) => (
              <li key={key}>
                <Link href={href} openInNewTab={true}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
