import { useCallback, useEffect, useRef, useState } from "react";

const SmartVideo = ({ src, poster }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

  const setLoadingTrue = useCallback(() => {
    setLoaded(true);
  }, []);

  const setErrorTrue = useCallback(() => {
    setError(true);
  }, []);

  useEffect(() => {
    if (!src) return;

    setLoaded(false);
    setError(false);

    const video = document.createElement("video");
    video.src = src;

    const onCanPlay = () => {
      setLoaded(true);
    };

    video.addEventListener("canplay", onCanPlay);
    // video.addEventListener("loadeddata", setLoadingTrue);
    video.addEventListener("error", setErrorTrue);

    return () => {
      // video.removeEventListener("loadeddata", setLoadingTrue);
      video.removeEventListener("canplay", setLoadingTrue);
      video.removeEventListener("error", setErrorTrue);
    };
  }, [src, setErrorTrue]);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoEl = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          videoEl.play().catch((e) => {
            console.log("Video play prevented:", e);
          });
        } else {
          videoEl.pause();
        }
      },
      {
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, [loaded]);

  const videoLoaded = loaded && !error;
  const videoLoading = src && !loaded && !error;
  const videoFailed = !src || error;

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={poster}
        alt="Video placeholder"
        className={`absolute top-0 left-0 w-full h-auto max-h-[1080px] transition-opacity duration-300 z-50 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {videoLoaded && (
        <video
          ref={videoRef}
          src={src}
          muted
          controls
          playsInline
          preload="auto"
          className="w-full h-full object-cover m-0 p-0 z-10"
        />
      )}
      {videoFailed && <p>Video failed to load.</p>}
    </div>
  );
};

export default SmartVideo;
