import React from "react";

const Card = ({ element }) => {
  return (
    <div
      className="flex-shrink-0 md:w-[50vw] w-screen aspect-video"
      key={element.id}
    >
      <a href={`/projects/${element.id}`}>
        <img
          className="w-full h-full object-cover object-top"
          src={element.data.heroImage}
          alt={element.data.title}
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default Card;
