import ProjectPhrase from "../components/_ProjectPhrase";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <AnimatedLayout>
      <section id="project-hero" className="lg:pt-24">
        <ProjectPhrase
          title={metadata.title}
          description={metadata.description}
        />
      </section>
      <MarkdownComponent isFullWidth={metadata.isFullWidth}>
        {children}
      </MarkdownComponent>
    </AnimatedLayout>
  );
};

export default ProjectLayout;
