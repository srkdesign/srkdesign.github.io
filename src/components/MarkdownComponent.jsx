const MarkdownComponent = ({ children, isFullWidth }) => {
  return (
    <section
      className={`w-full flex justify-center ${isFullWidth ? "" : "px-8"}`}
    >
      <section
        className={`prose prose-invert prose-xl prose-headings:font-normal lg:prose-h2:text-5xl prose-strong:font-medium prose-blockquote:not-italic overflow-x-hidden ${
          isFullWidth ? "max-w-none prose-img:mb-0 prose-img:mt-0" : ""
        }`}
      >
        {children}
      </section>
    </section>
  );
};

export default MarkdownComponent;
