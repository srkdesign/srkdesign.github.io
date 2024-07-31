import splt from "spltjs";
import { timeline, scroll, animate, ScrollOffset, stagger } from "motion";

const Preloader = document.getElementById("preloader");
const LogoOutline = document.querySelector("[data-logo-outline]");
const LogoFull = document.querySelector("[data-logo-full]");
const Nav = document.querySelector("nav");
const AllImages = document.querySelectorAll("[data-img]");
const AllImagesPlaceholders = document.querySelectorAll(
  "[data-image-placeholder]"
);

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
    LogoOutline,
    {
      opacity: [0, 1],
      scale: [0.9, 1],
    },
    {
      opacity: { duration: 0.2 },
      scale: { duration: 0.7 }, // scale: { duration: 0.6 }
    },
  ],
  [
    LogoFull,
    {
      // opacity: [0, 1],
      clipPath: ["inset(0 100% 0 0)", "inset(0)"],
    },
    {
      // opacity: { duration: 0.4 },
      clipPath: { duration: 0.6 },
      ease: [0.42, 0, 0.58, 1], // ease: [.42,0,1,1]
    },
  ],
  [
    ".reveal",
    {
      opacity: [0, 1],
      transform: ["translateY(100%)", "translateY(0)"],
    },
    {
      delay: stagger(0.01),
      duration: 0.4,
      at: "-0.6", // at: ">"
    },
  ],
  [
    Nav,
    {
      opacity: [0, 1],
      transform: ["translateY(-30%)", "translateY(0)"],
    },
    { at: ">" },
  ],
  [
    AllImagesPlaceholders,
    {
      opacity: [1, 0],
      clipPath: ["inset(0)", "inset(0 100% 0 0)"],
    },
  ],
  [
    AllImages,
    {
      opacity: [0, 1],
      filter: ["grayscale(1)", "grayscale(0)"],
      clipPath: ["inset(0 100% 0 0)", "inset(0)"],
    },
    {
      opacity: { duration: 0.2 },
      filter: { duration: 0.6 },
      clipPath: { duration: 0.4 },
      easing: [0.42, 0, 0.58, 1],
    },
  ],
];

timeline(AnimationSequence, {
  ease: [0, 0, 0.58, 1],
  duration: 2,
});

// Resize and set opacity for sections in view
// const AllSections = document.querySelectorAll("section");
// AllSections.forEach((section) => {
//   scroll(
//     animate(
//       section,
//       { scale: [0.95, 1, 1, 0.95] },
//       { easing: [0, 0, 0.58, 1] }
//     ),
//     { target: section, offset: [...ScrollOffset.Enter, ...ScrollOffset.Exit] }
//   );
// });

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
