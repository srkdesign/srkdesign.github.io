import { motion } from "motion/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "../../styles/_slider.css";
import { useEffect, useRef } from "react";

import Slide from "./Slide";

const SwiperSlider = ({ projects }) => {
  return (
    <Swiper
      className="w-full bg-gray-300"
      id="swiper"
      modules={[Autoplay, Navigation, Mousewheel]}
      direction={"horizontal"}
      navigation={true}
      mousewheel={{
        enabled: true,
        forceToAxis: false,
        releaseOnEdges: true,
        sensitivity: 2,
        thresholdDelta: 1,
      }}
      freeMode={{
        enabled: true,
        momentum: true,
        sticky: false,
      }}
      grabCursor={true}
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
      autoplay={{
        delay: 1000,
        // pauseOnMouseEnter: true,
        disableOnInteraction: true,
        stopOnLastSlide: true,
      }}
      speed={4000}
      // parallax={true}
    >
      {projects?.map((project, idx) => (
        <SwiperSlide key={idx}>
          <Slide project={project}></Slide>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
