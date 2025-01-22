import { motion } from "motion/react";

const HeadingAnimation = () => {
  return (
    <motion.div
      className="relative block overflow-hidden whitespace-nowrap font-extralight text-lg lg:text-xl w-56"
      initial="initial"
      whileHover="whileHover"
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          whileHover: { y: "-100%" },
        }}
      >
        <p className="flex flex-col *:leading-none">
          <span>
            <span className="font-serif italic">web</span> дизайнер
          </span>
          <span>
            и &nbsp;<span className="font-serif italic">front-end</span>{" "}
            разработчик
          </span>
        </p>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        variants={{
          initial: { y: "100%" },
          whileHover: { y: 0 },
        }}
      >
        <h2 className="flex flex-col *:leading-none">
          <span>Удобный для верстки </span>
          <span>дизайн и сайты под ключ</span>
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default HeadingAnimation;
