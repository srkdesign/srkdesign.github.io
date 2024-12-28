import MotionContainer from "../components/_MotionContainer";
import { motion } from "motion/react";
import SmoothScroll from "../components/_SmoothScroll";
import ProjectPhrase from "../components/_ProjectPhrase";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLink from "../components/_AnimatedLink";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <SmoothScroll>
      <MotionContainer>
        <section id="project-hero" className="lg:pt-24">
          <ProjectPhrase
            title={metadata.title}
            description={metadata.description}
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
