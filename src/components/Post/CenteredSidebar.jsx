import React, { useEffect, useRef, useState } from "react";

const CenteredSidebar = ({ children }) => {
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 1 },
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside ref={sidebarRef} className="md:max-h-screen md:sticky top-0 left-0">
      <div
        className={`flex flex-col items-center justify-center h-full transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "sm:opacity-0"}`}
      >
        <div className="md:pt-32 w-full h-min">{children}</div>
      </div>
    </aside>
  );
};

export default CenteredSidebar;
