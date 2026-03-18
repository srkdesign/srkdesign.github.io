import React, { useEffect, useRef, useState } from "react";

const AutoPlayVideo = ({ src, poster, threshold, aspectRatio = "16/9" }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [threshold]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      // Only call load() once — repeated load() resets Safari's buffer
      // and triggers layout recalculation
      if (!hasLoadedRef.current) {
        video.load();
        hasLoadedRef.current = true;
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        // Explicit aspect ratio prevents any height recalculation
        aspectRatio,
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        style={{
          // Fill the aspect-ratio-locked container absolutely
          // so the video itself never contributes to layout flow
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          // Prevents Safari from briefly flashing a blank frame on pause
          // by keeping the poster visually underneath via the container bg
          display: "block",
          margin: 0,
          padding: 0,
        }}
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.target;
          containerRef.current.style.aspectRatio = `${videoWidth}/${videoHeight}`;
        }}
      />
    </div>
  );
};

export default AutoPlayVideo;
