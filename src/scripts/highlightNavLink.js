import { animate, scroll } from "motion";

const AllSections = document?.querySelectorAll("section");
const AllLinks = document?.querySelectorAll("nav a");

// Highlight navlink of a section in view
const highlightLink = (entries, observer) => {
  // console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //console.log(entry.target.id);
      AllLinks.forEach((link) => {
        if (entry.target.id === link.getAttribute("href").replace("/#", "")) {
          //link.classList.replace("border-dark-blue/10", "border-pink");

        } else {
          link.classList.replace("border-pink", "border-dark-blue/10");
        }
      });
    }
  });
};

const menuObserver = new IntersectionObserver(highlightLink, {
  rootMargin: "90px 0px 90px 0px",
  threshold: 0.6,
});
AllSections.forEach((section) => menuObserver.observe(section));
// console.log(AllSections);
