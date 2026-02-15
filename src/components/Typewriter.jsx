import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

let charIndex = 0;

const Typewriter = ({ lines, serif }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  let charIndex = 0;

  return (
    <motion.div ref={ref} className="md:text-[3.5rem] text-[2rem] leading-none">
      {lines.map((line, lineIndex) => {
        const words = line.split(" ").map((word) => ({
          text: word + " ",
          className: serif.includes(word)
            ? "font-serif font-light italic"
            : "font-sans",
        }));

        return (
          <div key={lineIndex} className="flex flex-nowrap items-baseline">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={`inline-flex items-baseline overflow-visible relative ${word.className}`}
              >
                {word.text.split("").map((char, i) => {
                  const idx = charIndex++;
                  return (
                    <motion.span
                      key={i}
                      className="relative inline-block overflow-visible"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: idx * LETTER_DELAY }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>

                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: [0, 1, 0] } : {}}
                        transition={{
                          delay: idx * LETTER_DELAY,
                          times: [0, 0.1, 1],
                          duration: BOX_FADE_DURATION,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-zinc-50 origin-left z-10"
                      />
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Typewriter;
