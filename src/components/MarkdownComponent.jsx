const MarkdownComponent = ({ children, isFullWidth, customHeading }) => {
  return (
    <section
      className={`w-full flex justify-center ${isFullWidth ? "" : "px-8"}`}
    >
      <section
        className={`prose prose-invert prose-xl prose-headings:font-medium prose-strong:font-medium ${
          isFullWidth ? "max-w-none prose-img:mb-0 prose-img:mt-0" : ""
        } ${
          customHeading
            ? "first:prose-headings:font-normal first:prose-headings:pb-8 lg:first:prose-headings:text-4xl lg:first:prose-headings:leading-snug"
            : ""
        }`}
      >
        {children}
      </section>
    </section>
  );
};

export default MarkdownComponent;
