import { motion } from "motion/react";

const ProjectSlide = ({ url, image }) => {
  return (
    <a href={`projects/${url}`} className="relative max-h-[400px]">
      <motion.img
        className="block w-full h-auto object-cover"
        src={image}
        alt={`${url}`}
        layoutId="animated-image"
      />
    </a>
  );
};

export default ProjectSlide;
