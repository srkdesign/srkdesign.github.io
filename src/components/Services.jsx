import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

const SERVICES = [
  {
    number: "(1)",
    title: "Дизайн сайта",
    description:
      "Визуальное оформление сайта с акцентом на понятность и удержание внимания.",
    tags: ["Дизайн страницы", "Дизайн блока/элемента", "Редизайн сайта"],
  },
  {
    number: "(2)",
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
    number: "(3)",
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
    number: "(4)",
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
    number: "(5)",
    title: "Юзабилити аудит сайта",
    description:
      "Проверка сайта на удобство для посетителей и ошибки в верстке с конкретным списком того, что мешает.",
    tags: ["Юзабилити аудит", "Ревью верстки"],
  },
  {
    number: "(6)",
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
    number: "(7)",
    title: "Логотип и фирменный стиль",
    description:
      "Логотип, цвета, шрифты и правила их применения. Стиль, по которому узнают бренд.",
    tags: ["Разработка логотипа", "Разработка фирменного стиля", "Брендбук"],
  },
  {
    number: "(8)",
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

/* -------------------------------------------------------------------------- */
/* Motion                                                                     */
/* -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1];

const TRANSITION = {
  duration: 0.72,
  ease: EASE,
};

const DESCRIPTION_TRANSITION = {
  duration: 0.8,
  ease: EASE,
};

const ACTIVATION_BAND = "-42% 0px -42% 0px";

/*
 * Background is rendered at a fixed base height and then stretched
 * with scaleY().
 *
 * This is much smoother than animating CSS height directly.
 */
const BACKGROUND_BASE_HEIGHT = 400;

/*
 * Only a tiny overscan is used to prevent a 1px dark seam.
 */
const BACKGROUND_OVERSCAN = 1;

/*
 * Separate timings:
 *
 * top -> moves relatively quickly to the next element
 * scale -> grows/shrinks more slowly
 *
 * This makes the background feel like it is flowing rather than
 * snapping to the new element height.
 */
const BACKGROUND_Y_DURATION = 0.78;
const BACKGROUND_SCALE_DURATION = 1.0;

/* -------------------------------------------------------------------------- */
/* Service item                                                               */
/* -------------------------------------------------------------------------- */

const ServiceItem = memo(function ServiceItem({
  service,
  index,
  activeIndex,
  setActiveIndex,
  registerRow,
}) {
  const rowRef = useRef(null);

  const isInBand = useInView(rowRef, {
    margin: ACTIVATION_BAND,
  });

  const reduceMotion = useReducedMotion();

  const isActive = activeIndex === index;

  useLayoutEffect(() => {
    const element = rowRef.current;

    registerRow(index, element);

    return () => {
      registerRow(index, null);
    };
  }, [index, registerRow]);

  useEffect(() => {
    if (isInBand) {
      setActiveIndex(index);
    }
  }, [isInBand, index, setActiveIndex]);

  const handleHeaderClick = useCallback(() => {
    setActiveIndex(isActive ? null : index);
  }, [isActive, index, setActiveIndex]);

  const textTransition = reduceMotion ? { duration: 0 } : TRANSITION;

  const descriptionTransition = reduceMotion
    ? { duration: 0 }
    : DESCRIPTION_TRANSITION;

  return (
    <motion.div
      ref={rowRef}
      className={`
        relative
        z-10
        border-t
        last:border-b
        transition-colors
        duration-700
        ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:px-24
        px-8
        ${isActive ? "border-zinc-950/10" : "border-white/10"}
      `}
    >
      <div
        className={`
          relative
          z-10
          transition-colors
          duration-700
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isActive ? "text-zinc-950" : "text-white"}
        `}
      >
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                             */}
        {/* ------------------------------------------------------------------ */}

        <button
          type="button"
          onClick={handleHeaderClick}
          aria-expanded={isActive}
          className="
            flex
            w-full
            items-center
            gap-3
            sm:gap-4
            py-6
            sm:py-8
            text-left
          "
        >
          <div
            className="
              w-full
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-1
              sm:gap-8
              md:gap-24
              items-center
            "
          >
            <motion.span
              animate={{
                opacity: isActive ? 0.45 : 0.4,
              }}
              transition={textTransition}
              className="
                hidden
                sm:block
                text-lg
                md:text-3xl
              "
            >
              {service.number}
            </motion.span>

            <motion.span
              animate={{
                opacity: isActive ? 1 : 0.7,
              }}
              transition={textTransition}
              className="
                sm:col-span-2
                flex-1
                text-2xl
                md:text-5xl
                leading-snug
                whitespace-normal
                break-words
              "
            >
              {service.title}
            </motion.span>
          </div>

          <motion.span
            animate={{
              rotate: isActive ? 45 : 0,
              opacity: isActive ? 1 : 0.33,
              scale: isActive ? 1 : 0.92,
            }}
            transition={textTransition}
            className="shrink-0"
          >
            <Plus
              className="
                w-7
                h-7
                md:w-[32px]
                md:h-[32px]
              "
              strokeWidth={1.75}
            />
          </motion.span>
        </button>

        {/* ------------------------------------------------------------------ */}
        {/* Description                                                        */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          initial={false}
          animate={{
            gridTemplateRows: isActive ? "1fr" : "0fr",
          }}
          transition={descriptionTransition}
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            sm:gap-8
            md:gap-12
          "
        >
          <div className="sm:col-start-2 min-h-0 overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 14,
                filter: isActive ? "blur(0px)" : "blur(4px)",
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.6,
                      delay: isActive ? 0.08 : 0,
                      ease: EASE,
                    }
              }
              className="
                pb-6
                sm:pb-8
                pr-0
                sm:pr-8
              "
            >
              <p
                className="
                  w-full
                  md:max-w-2xl
                  text-base
                  sm:text-xl
                "
              >
                {service.description}
              </p>

              <ul
                className="
                  flex
                  flex-wrap
                  gap-2
                  pt-6
                  sm:pt-12
                  pb-3
                "
              >
                {service.tags?.map((tag, tagIndex) => (
                  <motion.li
                    key={tagIndex}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 8,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.45,
                            delay: isActive ? 0.1 + tagIndex * 0.025 : 0,
                            ease: EASE,
                          }
                    }
                    className="
                      uppercase
                      text-xs
                      sm:text-sm
                      border
                      border-zinc-500/40
                      px-3
                      sm:px-4
                      py-1.5
                      sm:py-2
                      rounded-full
                      text-nowrap
                      font-medium
                    "
                  >
                    {tag}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function ScrollServices({
  services = SERVICES,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const rowsRef = useRef(new Map());

  /*
   * The background is represented by:
   *
   * top    -> where the top edge should be
   * height -> actual target height
   * visible -> whether there is an active row
   */
  const [background, setBackground] = useState({
    top: 0,
    height: 1,
    visible: true,
  });

  const reduceMotion = useReducedMotion();

  /* ------------------------------------------------------------------------ */
  /* Row registration                                                         */
  /* ------------------------------------------------------------------------ */

  const registerRow = useCallback((index, element) => {
    if (element) {
      rowsRef.current.set(index, element);
    } else {
      rowsRef.current.delete(index);
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Active index                                                             */
  /* ------------------------------------------------------------------------ */

  const handleSetActiveIndex = useCallback((index) => {
    setActiveIndex((current) => {
      if (current === index) {
        return current;
      }

      return index;
    });
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Background measurement                                                  */
  /* ------------------------------------------------------------------------ */

  const updateBackground = useCallback(() => {
    /*
     * No active element -> hide the background.
     */
    if (activeIndex === null) {
      setBackground((current) => ({
        ...current,
        visible: false,
      }));

      return;
    }

    const row = rowsRef.current.get(activeIndex);

    if (!row) {
      return;
    }

    const section = row.closest("section");

    if (!section) {
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    /*
     * Top of the active element relative to the section.
     */
    const top = rowRect.top - sectionRect.top - BACKGROUND_OVERSCAN;

    /*
     * Actual target height.
     *
     * Unlike the previous implementation, we DON'T use this value
     * as CSS height directly.
     *
     * It becomes the target for scaleY().
     */
    const height = rowRect.height + BACKGROUND_OVERSCAN * 2;

    setBackground({
      top,
      height,
      visible: true,
    });
  }, [activeIndex]);

  /* ------------------------------------------------------------------------ */
  /* Active row changed                                                       */
  /* ------------------------------------------------------------------------ */

  useLayoutEffect(() => {
    updateBackground();
  }, [activeIndex, updateBackground]);

  /* ------------------------------------------------------------------------ */
  /* Observe active row height                                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const row = rowsRef.current.get(activeIndex);

    if (!row) {
      return;
    }

    let frame = null;

    const resizeObserver = new ResizeObserver(() => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        updateBackground();
        frame = null;
      });
    });

    resizeObserver.observe(row);

    return () => {
      resizeObserver.disconnect();

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [activeIndex, updateBackground]);

  /* ------------------------------------------------------------------------ */
  /* Window resize                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let frame = null;

    const handleResize = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        updateBackground();
        frame = null;
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [updateBackground]);

  /* ------------------------------------------------------------------------ */
  /* Font loading                                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!document.fonts) {
      return;
    }

    let mounted = true;

    document.fonts.ready.then(() => {
      if (mounted) {
        updateBackground();
      }
    });

    return () => {
      mounted = false;
    };
  }, [updateBackground]);

  /* ------------------------------------------------------------------------ */
  /* Background animation                                                     */
  /* ------------------------------------------------------------------------ */

  const backgroundScale = background.height / BACKGROUND_BASE_HEIGHT;

  /*
   * IMPORTANT:
   *
   * The background element has transformOrigin at TOP.
   *
   * Therefore:
   *
   *     top stays exactly where the active row starts
   *
   * while:
   *
   *     scaleY grows DOWNWARD
   *
   * instead of expanding from the center or from both directions.
   */
  const backgroundTransition = reduceMotion
    ? { duration: 0 }
    : {
        y: {
          duration: BACKGROUND_Y_DURATION,
          ease: EASE,
        },

        scaleY: {
          duration: BACKGROUND_SCALE_DURATION,
          ease: EASE,
        },

        opacity: {
          duration: 0.3,
          ease: EASE,
        },
      };

  return (
    <section
      className={`
        relative
        isolate
        overflow-x-clip
        overflow-y-hidden
        bg-zinc-950
        ${className}
      `}
    >
      {/* ================================================================== */}
      {/* SHARED ZINC BACKGROUND                                             */}
      {/* ================================================================== */}

      <motion.div
        aria-hidden="true"
        initial={false}
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-0
          bg-zinc-100
          will-change-transform
        "
        style={{
          height: BACKGROUND_BASE_HEIGHT,

          /*
           * This is the key difference.
           *
           * The rectangle scales from its TOP edge,
           * so when the active description opens the
           * zinc area grows downward only.
           */
          transformOrigin: "top center",
        }}
        animate={{
          y: background.top,
          scaleY: backgroundScale,
          opacity: background.visible ? 1 : 0,
        }}
        transition={backgroundTransition}
      />

      {/* ================================================================== */}
      {/* CONTENT                                                            */}
      {/* ================================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
        variants={{
          hidden: {},

          visible: {
            transition: {
              staggerChildren: 0.045,
              delayChildren: 0.02,
            },
          },
        }}
        className="
          relative
          z-10
        "
      >
        {services.map((service, index) => (
          <motion.div
            key={service.number ?? index}
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.6,
                      ease: EASE,
                    },
              },
            }}
          >
            <ServiceItem
              service={service}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={handleSetActiveIndex}
              registerRow={registerRow}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
