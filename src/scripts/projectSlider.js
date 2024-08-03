import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 4,
  spaceBetween: 20,
  // autoplay: {
  //   delay: 12000,
  //   pauseOnMouseEnter: true,
  //   disableOnInteraction: false,
  // },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  // breakpoints: {
  //   640: {
  //     slidesPerView: 3,
  //   },
  //   1024: {
  //     slidesPerView: 4,
  //   },
  //   1280: {
  //     slidesPerView: 5,
  //   },
  // },
  // modules: [Autoplay, Pagination],
});
