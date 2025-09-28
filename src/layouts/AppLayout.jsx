import ScrollableText from "../components/ScrollableText";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";
import AnimatedLink from "../components/Footer/Link";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <>
      <section id="app-hero" class="lg:pt-24">
        <ScrollableText
          heading={metadata.title}
          subheading={metadata.description}
        />
        <img src={metadata.heroImage} alt={metadata.title} />
      </section>
      <section class="py-24 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 px-8 lg:px-24 gap-24 *:w-full">
        <div className="max-w-prose col-span-2">
          <MarkdownComponent isFullWidth>{children}</MarkdownComponent>
        </div>
        <aside className="lg:sticky lg:top-32 lg:left-0 self-start flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-2xl">Платформа</p>
            <ul className="flex gap-8 list-none">
              {metadata.platform &&
                metadata.platform.map((item, i) => (
                  <li className="capitalize text-xl" key={i}>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-2xl">Скачать программу</p>
            <ul className="flex gap-8 list-none *:text-xl">
              {metadata.links &&
                Object.entries(metadata.links).map(
                  ([key, { title, href }], i) => (
                    <li className="text-xl" key={key}>
                      <AnimatedLink href={href} openInNewTab={true}>
                        {title}
                      </AnimatedLink>
                    </li>
                  )
                )}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
};

export default ProjectLayout;
