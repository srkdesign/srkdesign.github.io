import React from "react";
import Link from "./Link.jsx";

import { MENU_LINKS } from "../../consts.js";
import { MEDIA_LINKS } from "../../consts.js";

const Navigation = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 text-xl [&>*>p]:opacity-75 mb-8">
      <div className="grid grid-cols-2">
        <p>Будет полезно</p>
        <ul className="flex flex-col gap-1">
          {Object.entries(MENU_LINKS).map(([key, { label, href }]) => (
            <li key={key}>
              <Link href={href} openInNewTab={false}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2">
        <p>Другие ссылки</p>
        <ul className="flex flex-col gap-1">
          {Object.entries(MEDIA_LINKS).map(([key, { label, href }]) => (
            <li key={key}>
              <Link href={href} openInNewTab={false}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <ul>
        <li>Другие ссылки</li>
        {Object.entries(MEDIA_LINKS).map(([key, { label, href }]) => (
          <li key={key}>
            <Link href={href} openInNewTab={false}>
              {label}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Navigation;
