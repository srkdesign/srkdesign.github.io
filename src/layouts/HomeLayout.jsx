import { useEffect, useRef, useState } from "react";
import ProjectSlider from "../components/ProjectSlider/index.jsx";
import AnimatedLayout from "./AnimatedLayout";
import HorizontalScroll from "../components/HorizontalScroll/index.jsx";
import Accordion from "@/components/Accordion.jsx";
import Typewriter from "@/components/Typewriter.jsx";
import AutoPlayVideo from "@/components/AutoPlayVideo.jsx";
import ScrollingGrid from "@/components/ScrollingGrid.jsx";

import { useTranslation } from "react-i18next";

const HomeLayout = ({ projects, locale }) => {
  const { t } = useTranslation();
  return (
    <AnimatedLayout>
      {/* Hero */}
      <HorizontalScroll elements={projects} locale={locale}></HorizontalScroll>
      {/* About */}
      <section className="grid md:grid-cols-[25%,minmax(auto,40%),25%]  grid-col-1 justify-between px-8 lg:px-24">
        <div className="order-1 relative flex flex-col md:py-44 mb-8 z-10">
          <Typewriter
            lines={[
              t("home.about.heading.designer"),
              t("home.about.heading.developer"),
              t("home.about.heading.author"),
            ]}
            serif={["Graphic", "front-end", "Qrafik"]}
          />
        </div>

        <div className="mix-blend-lighten order-3 md:order-2">
          <AutoPlayVideo src="/videos/ascii_converted.mp4" threshold={0.3} />
        </div>

        <div className="order-2 md:order-3 md:py-44 flex flex-col justify-end items-end">
          <div className="flex flex-col gap-0">
            <Accordion
              title={t("home.about.accordion.designer.title")}
              description={t("home.about.accordion.designer.description")}
            />
            <Accordion
              title={t("home.about.accordion.developer.title")}
              description={t("home.about.accordion.developer.description")}
            />
            <Accordion
              title={t("home.about.accordion.author.title")}
              description={t("home.about.accordion.author.description")}
            />
          </div>
        </div>
      </section>
      {/* CTA */}
      <ScrollingGrid
        heading={t("home.grid.heading")}
        subheading={t("home.grid.subheading")}
      />
    </AnimatedLayout>
  );
};

export default HomeLayout;
