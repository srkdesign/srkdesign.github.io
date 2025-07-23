import { useEffect, useRef, useState } from "react";

const SmartVideo = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setHasPlayedOnce(true);
    };

    video.addEventListener("ended", handleEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.4 &&
          !hasPlayedOnce
        ) {
          video.play();
        } else {
          if (!video.paused) video.pause();
        }
      },
      {
        threshold: [0, 0.4, 1],
      }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("ended", handleEnded);
      observer.disconnect();
    };
  }, [hasPlayedOnce]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width="100%"
      muted
      controls
      playsInline
      preload="auto"
      style={{ maxWidth: "100%", display: "block" }}
    />
  );
};

export default SmartVideo;
