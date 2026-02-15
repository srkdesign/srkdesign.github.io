import ScrollableText from "../components/ScrollableText";
import MarkdownComponent from "../components/Markdown/MarkdownComponent";
import AnimatedLayout from "./AnimatedLayout";
import { useEffect } from "react";
import Link from "@/components/Footer/Link";
import { useTranslation } from "react-i18next";

const ProjectLayout = ({ children, metadata, locale }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const tryScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        window.scrollBy(0, 1);
      } else {
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, []);

  return (
    <AnimatedLayout>
      <section id="project-hero">
        <ScrollableText
          padding="ml-20"
          heading={metadata.title}
          subheading={metadata.description}
        />
        <section className="px-8 lg:px-24 pt-6 pb-20 text-lg *:border-zinc-800 [&>*:not(:last-child)]:border-b *:py-3 *:grid *:grid-cols-2 [&>div>h2]:text-zinc-400 [&>div>ul]:list-none [&>div>ul]:flex [&>div>ul]:gap-3 [&>div>ul>li:not(:last-child)]:after:content-[',']">
          {metadata.href && (
            <div>
              <h2>{t("project.view.heading")}</h2>
              <Link href={metadata.href} openInNewTab={true}>
                {t("project.view.link")} →
              </Link>
            </div>
          )}

          <div>
            <h2>{t("project.about")}</h2>
            <p>{metadata.description}</p>
          </div>

          {Object.entries(metadata.tagGroups ?? {}).map(([group, tags]) => (
            <div>
              <h2>{group}</h2>
              <ul>
                {tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </section>
      <MarkdownComponent isFullWidth={metadata.isFullWidth}>
        {children}
      </MarkdownComponent>
    </AnimatedLayout>
  );
};

export default ProjectLayout;
