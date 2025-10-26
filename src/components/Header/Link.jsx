import React from "react";

const Link = ({ label }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-fit group-hover:-translate-y-[104%] transition-transform duration-300 ease-in-out leading-none">
        <p>{label}</p>
        <p className="absolute top-full left-0">{label}</p>
      </div>
    </div>
  );
};

export default Link;
