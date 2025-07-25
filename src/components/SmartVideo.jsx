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
      width="100%"
      className="max-w-full, block"
      muted
      controls
      playsInline
      preload="auto"
    >
      <img
        src={poster}
        className="w-full"
        alt="Image Preview of a video file"
      />
    </video>
  );
};

export default SmartVideo;
