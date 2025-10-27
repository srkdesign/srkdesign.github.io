import { motion } from "motion/react";

const Slide = ({ project }) => {
  return (
    <a href={`/projects/${project.id}`} className="group">
      <img
        className="block w-full h-auto object-cover z-0 aspect-video object-top"
        src={project.data.heroImage}
        transition:name={`image_${project.id}`}
      />
    </a>
  );
};

export default Slide;
