import splt from "spltjs";
import { timeline, scroll, animate, ScrollOffset, stagger } from "motion";

const Preloader = document.getElementById("preloader");
const HeroImage = document.querySelectorAll(
  "section#content > p:has(img):first-of-type"
);
const AllImages = document.querySelectorAll("section#content > p:has(img)");
const StatsList = document.querySelectorAll("#stats");
const TagsList = document.querySelectorAll("#tags>li");

// Prevent DOMContents from appearing before animation
window.addEventListener("load", () => {
  Preloader.classList.add("hidden");
});

// Init split text for h1 reveal
splt({
  reveal: true,
});

// Animate hero section on page load
const AnimationSequence = [
  [Preloader, { scale: [1, 0] }, { duration: 0.1 }],
  [
    ".reveal",
    {
      opacity: [0, 1],
      transform: ["translateY(100%)", "translateY(0)"],
    },
    {
      delay: stagger(0.02),
      duration: 0.6,
      at: "-0.6", // at: ">"
    },
  ],
  [
    StatsList,
    {
      opacity: [0, 1],
      transform: ["translateY(-30px)", "translateY(0)"],
    },
    {
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1], // ease: [.42,0,1,1]
      at: "-0.4", // at: ">"
    },
  ],
  [
    TagsList,
    {
      opacity: [0, 1],
      scale: [0.8, 1],
    },
    {
      delay: stagger(0.2),
      at: "-0.4", // at: ">"
    },
  ],
  [
    HeroImage,
    {
      filter: ["grayscale(1)", "grayscale(0)"],
      clipPath: ["inset(0 100% 0 0)", "inset(0)"],
    },
    {
      duration: 0.8,
      easing: [0.42, 0, 0.58, 1],
      at: "-0.6", // at: ">"
    },
  ],
];

timeline(AnimationSequence, {
  ease: [0, 0, 0.58, 1],
  duration: 1.1,
});

scroll(animate("#scroll-progress", { scaleX: [0, 1] }));

// Resize and set opacity for sections in view
const AllParagraphs = document.querySelectorAll(
  "section#content > p:not(:has(img))"
);
const AllHeadings = document.querySelectorAll("section#content > h2");

AllParagraphs.forEach((p) => {
  scroll(
    animate(
      p,
      {
        transform: ["translateY(40px)", "translateY(none)"],
        opacity: [0.4, 1],
      },
      { easing: [0.4, 0, 0.2, 1] }
    ),
    { target: p, offset: [...ScrollOffset.Enter] }
  );
});

AllHeadings.forEach((h2) => {
  scroll(
    animate(
      h2,
      {
        transform: ["translateY(40px)", "translateY(none)"],
        opacity: [0.4, 1],
      },
      { easing: [0.4, 0, 0.2, 1] }
    ),
    { target: h2, offset: [...ScrollOffset.Enter] }
  );
});

AllImages.forEach((image) => {
  scroll(
    animate(
      image,
      {
        opacity: [0.6, 1],
      },
      { easing: [0.4, 0, 0.2, 1] }
    ),
    { target: image, offset: [...ScrollOffset.Enter] }
  );
});
