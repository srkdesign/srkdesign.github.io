import { ReactLenis, useLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return <ReactLenis root>{children}</ReactLenis>;
}
