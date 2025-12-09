import React from "react";

const Link = ({ label }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col gap-2 items-center justify-center w-full h-fit group-hover:-translate-y-[104%] transition-transform duration-300 ease-in-out leading-[1.08]">
        <p>{label}</p>
        <p className="absolute top-[104%] left-0">{label}</p>
      </div>
    </div>
  );
};

export default Link;
