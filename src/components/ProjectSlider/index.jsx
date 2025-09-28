import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "../../styles/_slider.css";

import ProjectSlide from "./Slide";

const ProjectSlider = ({ projects }) => {
  // console.log(projects);

  return (
    <Swiper
      className="w-full bg-gray-300"
      id="swiper"
      modules={[Autoplay, Navigation]}
      direction={"horizontal"}
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        // 1280: {
        //   slidesPerView: 3,
        // },
      }}
      navigation={true}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
        stopOnLastSlide: true,
      }}
      speed={3000}
      // freeMode={false}
      // parallax={true}
    >
      {projects?.map((project, index) => (
        <SwiperSlide key={index}>
          <ProjectSlide
            url={project.id}
            image={project.data.heroImage}
            hoverImage={project.data.hoverImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectSlider;
