import AnimatedLayout from "./AnimatedLayout";
import HorizontalScroll from "../components/HorizontalScroll/index.jsx";
import Accordion from "@/components/Accordion.jsx";
import Typewriter from "@/components/Typewriter.jsx";
import AutoPlayVideo from "@/components/AutoPlayVideo.jsx";
import ScrollingGrid from "@/components/ScrollingGrid.jsx";
import Services from "@/components/Services.jsx";
import Button from "@components/Header/Button.jsx";
import Process from "@/components/Process.jsx";
import Approach from "@/components/Approach.jsx";

import SectionHeading from "@/components/Text/SectionHeading.jsx";
import Paragraph from "@/components/Text/Paragraph.jsx";

import { useTranslation } from "react-i18next";

import { ArrowUpRight, MoveUpRight } from "lucide-react";

const HomeLayout = ({ projects, locale }) => {
  const { t } = useTranslation();
  return (
    <AnimatedLayout>
      {/* WHAT DO I DO AND HOW CAN I HELP */}
      {/* HERO */}
      <HorizontalScroll elements={projects} locale={locale}></HorizontalScroll>

      {/* APPROACH */}
      <section className="px-8 md:px-14 pt-48 mb-36 lg:pb-32 flex flex-col items-center gap-4 md:gap-12">
        <h3 className="opacity-50 text-xl">Подход</h3>
        <h2 className="text-4xl lg:text-7xl max-w-[32ch] text-center mb-20">
          Сайт должен <span className="font-serif italic">(1)</span> выглядеть
          хорошо,
          <br />
          <span className="font-serif italic">(2)</span> быстро объяснять
          ценность бизнеса, <br />{" "}
          <span className="font-serif italic">(3)</span> и&nbsp;быть простым в
          управлении
        </h2>
        <Approach />
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
      {/*
      /* Services
      */}
      <section className="lg:pb-32 flex flex-col md:gap-12">
        <div className="flex flex-col gap-4 md:grid grid-cols-3 md:gap-12 lg:px-14 px-8">
          <h3 className="opacity-50 text-xl">Компетенции</h3>
          <div className="col-start-2 col-span-2 flex flex-col gap-8 mb-16">
            <h2 className="text-4xl lg:text-7xl max-w-[16ch]">
              От идеи до&nbsp;готового цифрового продукта{" "}
            </h2>
          </div>
        </div>
        <Services />
      </section>
      {/*
      /* Services
      */}
      <section className="px-8 md:px-14 pt-36 mb-36 lg:pb-32 flex flex-col items-center gap-4">
        <h3 className="opacity-50 text-xl">Процесс</h3>
        <div className="text-center max-w-[42ch]">
          <SectionHeading>Каждый шаг имеет&nbsp;смысл</SectionHeading>
        </div>
        <Process slot={60} offsetTop="32px" />
      </section>
      {/*
      /* FAQ
      */}
      <section className="flex flex-col md:gap-12">
        <div className="flex flex-col gap-4 md:grid grid-cols-3 md:gap-28 lg:px-14 px-8">
          <div className="order-2 sm:-order-none flex flex-col">
            <h3 className="hidden sm:block opacity-50 text-xl">Вопросы</h3>
            <div className="mix-blend-lighten order-3 md:order-2">
              <AutoPlayVideo
                src="/videos/ascii_mobile.mp4"
                poster="/images/ascii_mobile.png"
                threshold={0.3}
              />
            </div>
          </div>

          <div className="order-1 col-start-2 col-span-2 flex flex-col justify-between gap-8 pb-[14%]">
            <div className="flex flex-col gap-4">
              <h3 className="sm:hidden block opacity-50 text-xl">Вопросы</h3>
              <h2 className="text-4xl lg:text-7xl max-w-[16ch]">
                От идеи до&nbsp;готового результата{" "}
              </h2>
            </div>

            <div className="">
              <Accordion
                title="Зачем платить, если можно собрать сайт с ИИ за 5 минут?"
                description="ИИ просто рисует картинку. Сайт же нужен не для красоты, а чтобы вам писали и звонили. Для того чтобы знать что именно и в каком порядке показывать на сайте нужны знания из сразу нескольких областей. Помимо визуала, нужно также проработать архитектуру сайта, учитывая все технические ограничения. Это комплексная работа, которая даже с учетом ИИ займет далеко не 5 минут. Вы можете потратить десятки часов на изучение всего необходимого и сотню токенов на создание хорошего сайта с ИИ или же можете сразу обратиться к специалисту."
              />
              <Accordion
                title="Нужен ли сайт, если у меня уже есть соцсети?"
                description="Страницы в соцсетях почти не появляются в результатах поиска, дают мало контроля над дизайном и системой бронирования, а еще платформа может ограничить или удалить страницу без предупреждения. Поэтому, да, сайт нужен. Соцсети помогают людям узнать о бизнесе, но именно сайт большинство проверяет, чтобы решить, можно ли доверять этому бизнесу. И это единственная площадка в интернете, которой бизнес владеет и управляет по-настоящему. "
              />
              <Accordion
                title="Сколько занимает создание сайта под ключ?"
                description="Лендинг создается примерно 7-14 дней, многостраничный сайт или магазин – 3-6 недель. Точные даты по каждому этапу будут известные после заполнения брифа."
              />
              <Accordion
                title="Что нужно от меня?"
                description="Достаточно ответить на пару вопросов в брифе (займет 5 минут), и вовремя дать обратную связь."
              />
              <Accordion
                title="Сайт будет удобным на телефоне и найдется в поиске?"
                description="Да. Сайт будет адаптивным, будет быстро загружаться и сразу будет настроен под основы SEO благодаря семантической верстке. Ваш сайт смогут найти и с компьютера, и с телефона."
              />
              <Accordion
                title="Что будет после запуска?"
                description="В первые 7 дней после запуска я бесплатно исправляю любые технические мелочи. Дальше вы можете остаться на поддержке (обновления, правки, резервные копии) или управлять сайтом сами, инструкцию предоставлю."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <ScrollingGrid
        heading={t("home.grid.heading")}
        subheading={t("home.grid.subheading")}
      /> */}
    </AnimatedLayout>
  );
};

export default HomeLayout;
