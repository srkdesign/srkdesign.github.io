import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "../styles/_slider.css";

import ProjectSlide from "./_ProjectSlide";

const ProjectSlider = ({ projects }) => {
  // console.log(projects);
  return (
    <Swiper
      className="w-full bg-gray-300"
      modules={[Navigation, Autoplay]}
      spaceBetween={1}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
      navigation={true}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
        stopOnLastSlide: true,
      }}
      speed={4000}
      freeMode={false}
      parallax={true}
    >
      {projects?.map((project, index) => (
        <SwiperSlide key={index}>
          <ProjectSlide url={project.id} image={project.data.heroImage} />
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>
        <ProjectSlide slideText={`Slide+1`} />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectSlide slideText={`Slide+2`} />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectSlide slideText={`Slide+3`} />
      </SwiperSlide>
      <SwiperSlide>
        <ProjectSlide slideText={`Slide+4`} />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default ProjectSlider;
