import ScrollableText from "../components/ScrollableText";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <AnimatedLayout>
      <section id="project-hero" className="lg:pt-24">
        <ScrollableText
          heading={metadata.title}
          subheading={metadata.description}
        />
      </section>
      <MarkdownComponent isFullWidth={metadata.isFullWidth}>
        {children}
      </MarkdownComponent>
    </AnimatedLayout>
  );
};

export default ProjectLayout;
