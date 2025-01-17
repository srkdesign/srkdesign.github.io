import MotionContainer from "../components/_MotionContainer";
import { motion } from "motion/react";
import SmoothScroll from "../components/_SmoothScroll";
import ProjectPhrase from "../components/_ProjectPhrase";
import MarkdownComponent from "../components/MarkdownComponent";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <SmoothScroll>
      <MotionContainer>
        <section id="project-hero" className="lg:pt-24 lg:mb-16">
          <ProjectPhrase title={metadata.title} description={metadata.title} />
          <img
            className="w-full h-auto"
            src={metadata.heroImage}
            alt={metadata.title}
            initial={{ scale: 0.9, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </section>
        <MarkdownComponent isFullWidth={metadata.isFullWidth}>
          {children}
        </MarkdownComponent>
      </MotionContainer>
    </SmoothScroll>
  );
};

export default ProjectLayout;
