import React from "react";

const ElementHeading = ({ children }) => {
  return (
    <h3
      className="
                flex-1
                text-2xl
                md:text-5xl
                leading-snug
                whitespace-normal
                break-words"
    >
      {children}
    </h3>
  );
};

export default ElementHeading;
