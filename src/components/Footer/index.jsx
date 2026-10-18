import { SITE_URL } from "../../consts.js";
import GetYear from "../../utils/GetYear.js";
import Link from "./Link.jsx";
import Navigation from "./Navigation.jsx";
import About from "./About.jsx";
import { useEffect, useState } from "react";

const Footer = () => {
  return (
    <footer className="lg:px-16 px-8 lg:py-14 py-8 flex flex-col gap-8">
      <Navigation></Navigation>
      <About></About>
    </footer>
  );
};

export default Footer;
