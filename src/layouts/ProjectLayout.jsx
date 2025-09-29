import ScrollableText from "../components/ScrollableText";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <AnimatedLayout>
      <section id="project-hero" className="">
        <ScrollableText
          heading={metadata.title}
          subheading={metadata.description}
        />
      </section>
      <MarkdownComponent isFullWidth={metadata.isFullWidth}>
        {children}
      </MarkdownComponent>

      {/* <section className="flex flex-col gap-8 px-8 lg:px-24 text-xl">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Обязанности</p>
          <ul className="flex gap-8 list-none">
            {metadata.responsibilities &&
              metadata.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Инструменты</p>
          <ul className="flex gap-8 list-none">
            {metadata.stack &&
              metadata.stack.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </section> */}
    </AnimatedLayout>
  );
};

export default ProjectLayout;
