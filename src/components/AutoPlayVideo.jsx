import React, { useEffect, useRef, useState } from "react";

const AutoPlayVideo = ({ src, threshold }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isVisible) {
      video.load();
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <video
      key={src}
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      className="block w-full h-auto object-cover object-center m-0 p-0"
    />
  );
};

export default AutoPlayVideo;
