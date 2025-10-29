import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "../styles/_slider.css";

import ProjectSlide from "./Slide";
import SmartVideo from "../Markdown/SmartVideo";

const ProjectSlider = ({ projects }) => {
  // console.log(projects);

  return (
    <Swiper
      className="w-full"
      id="swiper"
      modules={[Autoplay, Navigation, Pagination]}
      rewind={true}
      direction={"vertical"}
      spaceBetween={1}
      slidesPerView={1}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
        stopOnLastSlide: true,
      }}
      speed={3000}
    >
      {projects?.map((project, index) => (
        <SwiperSlide key={index}>
          <SmartVideo
            src={`/videos/projects/${project.id}_scroll.mp4`}
            poster={`/images/projects/${project.id}/hero.png`}
          ></SmartVideo>
          <h3>{project.data.title}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectSlider;
