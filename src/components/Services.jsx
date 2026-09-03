import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Дизайн сайта",
    description:
      "Визуальное оформление сайта с акцентом на понятность и удержание внимания.",
    tags: ["Дизайн страницы", "Дизайн блока/элемента", "Редизайн сайта"],
  },
  {
    number: "02",
    title: "Верстка сайта",
    description:
      "Превращение готового макета в рабочий сайт с корректным отображением на компьютере и телефоне.",
    tags: [
      "Верстка страницы",
      "Верстка блока",
      "Чистый код",
      "Визуальный конструктор",
    ],
  },
  {
    number: "03",
    title: "Сайт под ключ",
    description:
      "Полный путь от макета до запуска: дизайн, верстка, тексты и настройка в одном проекте, без передачи между разными исполнителями.",
    tags: [
      "Дизайн и разработка",
      "Наполнение контентом",
      "Запуск и настройка",
      "WordPress",
    ],
  },
  {
    number: "04",
    title: "Доработка и настройка сайта",
    description:
      "Правки, новый функционал и настройка интеграций на готовом сайте без риска задеть то, что уже работает.",
    tags: [
      "Добавление функционала",
      "Внесение правок",
      "Настройка",
      "Персонализация",
    ],
  },
  {
    number: "05",
    title: "Юзабилити аудит сайта",
    description:
      "Проверка сайта на удобство для посетителей и ошибки в верстке с конкретным списком того, что мешает.",
    tags: ["Юзабилити аудит", "Ревью верстки"],
  },
  {
    number: "06",
    title: "Реализация ИИ-дизайна",
    description:
      "Превращение изображения, сгенерированного нейросетью, в полноценный рабочий сайт.",
    tags: [
      "Верстка ИИ-макета",
      "Доработка дизайна нейросети",
      "Адаптация под сайт",
    ],
  },
  {
    number: "07",
    title: "Логотип и фирменный стиль",
    description:
      "Логотип, цвета, шрифты и правила их применения. Стиль, по которому узнают бренд.",
    tags: ["Разработка логотипа", "Разработка фирменного стиля", "Брендбук"],
  },
  {
    number: "08",
    title: "Векторизация логотипа",
    description:
      "Перевод логотипа в векторный формат для увеличения и печати без потери качества.",
    tags: [
      "Перевод в вектор",
      "Восстановление логотипа",
      "Подготовка для печати",
    ],
  },
];

function ServiceItem({ service, index, activeIndex, setActiveIndex }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "center 40%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.25,
  });

  /*
   * Let every item participate in scroll activation,
   * including item 01.
   */
  useMotionValueEvent(progress, "change", (value) => {
    if (value > 0.5) {
      setActiveIndex(index);
    }
  });

  const isActive = activeIndex === index;

  return (
    <motion.div ref={ref} className="border-t last:border-b border-white/10">
      {/* Header */}
      <button
        type="button"
        onClick={() => setActiveIndex(index)}
        aria-expanded={isActive}
        className="flex w-full items-center gap-4 py-8 text-left text-2xl"
      >
        <div className="w-full grid grid-cols-3 gap-24 items-center">
          <span className="hidden sm:block opacity-40 text-2xl">
            {service.number}
          </span>
          {/* Title */}
          <motion.span
            animate={{
              opacity: isActive ? 1 : 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="col-span-2 flex-1 md:text-5xl text-2xl whitespace-normal"
          >
            {service.title}
          </motion.span>
        </div>

        {/* Arrow */}
        <motion.span
          animate={{
            rotate: isActive ? 45 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="shrink-0"
        >
          <ArrowUpRight size={30} strokeWidth={1.75} />
        </motion.span>
      </button>

      {/* Description */}
      <motion.div
        initial={false}
        animate={{
          gridTemplateRows: isActive ? "1fr" : "0fr",
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="grid grid-cols-1 md:grid-cols-3 md:gap-12"
      >
        <div className="col-start-2 min-h-0">
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 12,
            }}
            transition={{
              duration: 0.45,
              delay: isActive ? 0.05 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pb-8 pr-8"
          >
            <p className="w-full md:max-w-2xl text-xl">{service.description}</p>
            <ul className="flex pt-12 pb-3">
              {service.tags?.map((t, idx) => (
                <motion.li
                  key={idx}
                  className="uppercase text-sm border border-white/20 px-4 py-2 rounded-full text-nowrap"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ScrollServices({
  services = SERVICES,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Keep track of the last active item so we don't
   * unnecessarily trigger React state updates.
   */
  const lastActiveIndex = useRef(0);

  const handleSetActiveIndex = (index) => {
    if (lastActiveIndex.current === index) {
      return;
    }

    lastActiveIndex.current = index;
    setActiveIndex(index);
  };

  /*
   * Make sure the first item is active on mount.
   */
  useEffect(() => {
    lastActiveIndex.current = 0;
    setActiveIndex(0);
  }, []);

  return (
    <div className={className}>
      {services.map((service, index) => (
        <ServiceItem
          key={service.number ?? index}
          service={service}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={handleSetActiveIndex}
        />
      ))}
    </div>
  );
}
