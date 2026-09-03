import AnimatedLayout from "./AnimatedLayout";
import HorizontalScroll from "../components/HorizontalScroll/index.jsx";
import Accordion from "@/components/Accordion.jsx";
import Typewriter from "@/components/Typewriter.jsx";
import AutoPlayVideo from "@/components/AutoPlayVideo.jsx";
import ScrollingGrid from "@/components/ScrollingGrid.jsx";
import Services from "@/components/Services.jsx";

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
            serif={["Graphic", "front-end", "Qrafik", "web", "Web"]}
          />
        </div>

        <div className="mix-blend-lighten order-3 md:order-2">
          <AutoPlayVideo
            src="/videos/ascii_mobile.mp4"
            poster="/images/ascii_mobile.png"
            threshold={0.3}
          />
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
      {/* Numbers */}
      {/* <section className="flex flex-col gap-8 md:grid grid-cols-6 grid-rows-3 [&>*>h3]:font-serif [&>*>h3]:font-thin  [&>*>h3]:flex [&>*>h3]:gap-2 [&>*>h3]:items-baseline [&>*>h3]:text-7xl md:[&>*>h3]:text-[clamp(4.5rem,_3.4078rem_+_4.6602vw,_9rem)] [&>*>h3]:leading-none px-8 lg:px-24 [&>*>p]:font-sans [&>*>p]:text-2xl lg:py-24 lg:pb-48 py-8">
        <div className="col-start-1 row-start-2">
          <h3>150</h3>
          <p>коммерческих&nbsp;проектов выполнено</p>
        </div>
        <div className="col-start-3 row-start-3">
          <h3>
            99 <span className="text-7xl">%</span>
          </h3>
          <p>проектов&nbsp;сдано&nbsp;вовремя</p>
        </div>
        <div className="col-start-4 row-start-1">
          <h3>
            60 <span className="text-7xl">%</span>
          </h3>
          <p>повторных заказов</p>
        </div>
        <div className="col-start-6 row-start-1">
          <h3>
            99 <span className="text-7xl">%</span>
          </h3>
          <p>положительных отзывов</p>
        </div>
      </section> */}
      {/* Pricing */}

      {/* <section className="lg:px-24 px-8 lg:pb-32">
        <Services />
      </section> */}

      {/* CTA */}
      {/* <ScrollingGrid
        heading={t("home.grid.heading")}
        subheading={t("home.grid.subheading")}
      /> */}
    </AnimatedLayout>
  );
};

export default HomeLayout;
