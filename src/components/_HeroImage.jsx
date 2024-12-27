import { motion } from "motion/react";

const ProjectHeroImage = ({ children }) => {
  return (
    <motion.picture
      className="w-full h-auto my-0 *:mb-0"
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      exit={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.picture>
  );
};

export default ProjectHeroImage;
