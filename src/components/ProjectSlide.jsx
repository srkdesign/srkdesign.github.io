import { motion } from "motion/react";

const ProjectSlide = ({ url, image, hoverImage }) => {
  return (
    <a href={`projects/${url}`} className="relative lg:max-h-[400px]">
      <div className="relative group">
        {/* <motion.img
          className="absolute t-0 l-0 block w-full h-auto object-cover opacity-0 hover:opacity-100 transition-opacity ease-in-out"
          src={hoverImage}
          alt={`${url}`}
        /> */}
        <motion.img
          className="block w-full h-auto object-cover z-0"
          src={image}
          alt={`${url}`}
          layoutId="animated-image"
        />
      </div>
    </a>
  );
};

export default ProjectSlide;
