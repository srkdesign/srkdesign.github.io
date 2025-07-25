import { useEffect, useRef, useState } from "react";

const SmartVideo = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // ← added

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
    <div
      className={`relative block w-screen lg:h-lvh overflow-hidden bg-cover bg-top bg-no-repeat`}
      style={{ backgroundImage: `url(${poster})` }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        controls
        playsInline
        preload="auto"
        className={`block w-full h-full object-cover object-top m-0 p-0`}
      />
    </div>
  );
};

export default SmartVideo;
