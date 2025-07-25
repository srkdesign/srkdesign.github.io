import { useEffect, useRef, useState } from "react";

const SmartVideo = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setHasPlayedOnce(true);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video || hasPlayedOnce) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0.4] }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
    };
  }, [hasPlayedOnce]);

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={poster}
        alt="Video placeholder"
        className={`absolute top-0 left-0 w-full h-auto max-h-[1080px] transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        controls
        playsInline
        preload="auto"
        className="w-full h-full object-cover m-0 p-0"
      />
    </div>
  );
};

export default SmartVideo;
