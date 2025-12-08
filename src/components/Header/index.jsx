import { motion, AnimatePresence } from "motion/react";
import Phrase from "./Phrase.jsx";
import Button from "./Button.jsx";
import Image from "./Image.jsx";
import Link from "./Link.jsx";
import Navigation from "./Navigation.jsx";
import { useEffect, useState } from "react";
import { EASE } from "../../consts.js";
import { useTranslation } from "react-i18next";
import { getRelativeLocaleUrl } from "astro:i18n";
import FormatLocale from "../../utils/FormatLocale.js";

const Header = () => {
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
    document.dispatchEvent(new Event("swup:contentReplaced"));
  };

  useEffect(() => {
    const soup = window.soup;
    if (!soup) return;

    soup.on("transitionStart", closeMenu);
    return () => soup.off("transitionStart", closeMenu);
  }, []);

  return (
    <header
      className={`lg:px-24 px-8 py-6 flex justify-between items-center sticky top-0 left-0 z-[999] ${
        menuOpen || langOpen ? "" : "mix-blend-difference"
      }`}
    >
      <div
        id="logo"
        className="flex items-center gap-5 mix-blend-difference z-[1000]"
      >
        <motion.a
          href={getRelativeLocaleUrl(i18n.language, "")}
          className=""
          whileHover={{ opacity: 0.6 }}
          onClick={closeMenu}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="mix-blend-difference w-9 h-auto md:w-full"
          />
        </motion.a>
        <Phrase></Phrase>
      </div>
      <div className="flex items-center">
        {/* <LanguagePicker></LanguagePicker> */}
        <Button
          label={FormatLocale(i18n.language)}
          isMaxWidth={true}
          isActive={langOpen}
          setIsActive={setLangOpen}
        ></Button>
        <AnimatePresence>
          {langOpen && (
            <motion.div
              className="fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-[500] origin-top"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{
                x: "100%",
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 20,
                mass: 0.8,
                ease: EASE,
                duration: 0.3,
              }}
            >
              <motion.div className="flex flex-col gap-10 -full h-full justify-end px-24 pb-24">
                <motion.a
                  href={getRelativeLocaleUrl("ru", "")}
                  data-soup
                  className="md:text-5xl text-3xl w-fit group transition-transform cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={() => changeLanguage("ru")}
                >
                  <Link label="Русский"></Link>
                  {/* {link.label} */}
                </motion.a>
                <motion.a
                  href={getRelativeLocaleUrl("en", "")}
                  data-soup
                  className="md:text-5xl text-3xl w-fit group transition-transform cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={() => changeLanguage("en")}
                >
                  <Link label="English"></Link>
                  {/* {link.label} */}
                </motion.a>
                <motion.a
                  href={getRelativeLocaleUrl("az", "")}
                  data-soup
                  className="md:text-5xl text-3xl w-fit group transition-transform cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={() => changeLanguage("az-AZ")}
                >
                  <Link label="Azerbaycan dili"></Link>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          label={t("nav.btn.default")}
          isActive={menuOpen}
          setIsActive={setMenuOpen}
        ></Button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-[500] origin-top"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{
                x: "100%",
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 20,
                mass: 0.8,
                ease: EASE,
                duration: 0.3,
              }}
            >
              <motion.div className="md:grid flex flex-col justify-between w-full h-full grid-cols-2 grid-flow-col [grid-template-rows:auto]">
                {/* md:grid-cols-2 grid-cols-1 md:grid-flow-col
              md:[&>*:nth-child(-n+4)]:col-start-1
              md:[&>*:nth-child(n+5)]:col-start-2 */}
                <Navigation onHover={setSelectedLink} onNavigate={closeMenu} />
                <Image hovered={selectedLink} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
