import ScrollableText from "../components/ScrollableText";
import MarkdownComponent from "../components/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";
import AnimatedLink from "../components/Footer/Link";

const ProjectLayout = ({ children, metadata }) => {
  return (
    <>
      <section id="app-hero" class="">
        <ScrollableText
          heading={metadata.title}
          subheading={metadata.description}
        />
        <img src={metadata.heroImage} alt={metadata.title} />
      </section>
      <section class="py-24 grid grid-cols-2 px-8 lg:px-24 *:w-full">
        <aside className="lg:sticky lg:top-32 lg:left-0 self-start grid grid-cols-2 gap-4 *:col-start-1">
          <div className="grid grid-cols-2 place-items-baseline text-xl">
            <p className="opacity-80">Платформа</p>
            <ul className="flex flex-col gap-1">
              {metadata.platform &&
                metadata.platform.map((item, i) => (
                  <li className="capitalize" key={i}>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 place-items-baseline text-xl">
            <p className="opacity-80">Объем</p>
            <ul className="flex flex-col gap-1">
              <li className="capitalize">{metadata.size} MB</li>
            </ul>
          </div>
        </aside>
        <div className="max-w-[760px] prose-p:first-of-type:m-0">
          <MarkdownComponent isFullWidth>{children}</MarkdownComponent>
        </div>
      </section>
    </>
  );
};

export default ProjectLayout;
