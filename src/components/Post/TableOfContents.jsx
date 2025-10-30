import React, { useEffect, useState } from "react";

const TableOfContents = ({ headings }) => {
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    const content = document.querySelectorAll(".prose h2");
    console.log(content);

    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target.id);
          setActiveSlug(entry.target.id);
        }
      })
    );

    content.forEach((h) => {
      observer.observe(h);
    });

    return () => {
      content.forEach((h) => observer.unobserve(h));
    };
  }, []);

  return (
    <ul className="dark flex flex-col gap-2" data-toc>
      {headings &&
        headings.map((heading, idx) => (
          <li key={idx}>
            <a
              href={`#${heading.slug}`}
              className={`flex md:text-base text-xl toc-link 
                text-neutral-400 transition-colors duration-300 ease-in-out ${
                  activeSlug === heading.slug
                    ? "text-zinc-50"
                    : "text-neutral-400"
                }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default TableOfContents;
