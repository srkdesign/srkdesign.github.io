const MarkdownComponent = ({ children, isFullWidth }) => {
  return (
    <section
      className={`w-full flex justify-center ${isFullWidth ? "" : "px-8"}`}
    >
      <section
        className={`prose prose-invert prose-xl prose-headings:font-medium prose-strong:font-medium prose-blockquote:not-italic ${
          isFullWidth ? "max-w-none prose-img:mb-0 prose-img:mt-0" : ""
        }`}
      >
        {children}
      </section>
    </section>
  );
};

export default MarkdownComponent;
