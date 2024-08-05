import Lenis from "lenis";

// Init smooth scroll
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Smooth scroll anchor links
const AnchorLinks = document?.querySelectorAll("[data-anchor-link]");

AnchorLinks.forEach((link) => {
  link.addEventListener("click", () => {
    lenis.scrollTo(link.getAttribute("href").replace("/", ""), {
      offset: -200,
    });
  });
});
