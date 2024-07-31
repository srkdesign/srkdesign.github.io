import { scroll, animate } from "motion";

const allSections = document?.querySelectorAll("section");

//console.log(allSections);
allSections.forEach((section) => {
  // console.log(section.id);
  if (section.id === "hero") {
    return;
  }

  let navEl = document?.querySelector("".concat("#", section.id, "-progress"));
  // console.log(navEl);

  scroll(
    animate(
      navEl,
      { clipPath: ["inset(0)", "inset(0 100% 0 0)"] },
      { easing: [0.42, 0, 0.58, 1] }
    ),
    {
      target: section,
    }
  );
});
