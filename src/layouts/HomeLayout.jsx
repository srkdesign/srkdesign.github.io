import { useEffect, useRef, useState } from "react";
import ProjectSlider from "../components/ProjectSlider/index.jsx";
import AnimatedLayout from "./AnimatedLayout";
import HorizontalScroll from "../components/HorizontalScroll/index.jsx";

const HomeLayout = ({ projects }) => {
  return (
    <AnimatedLayout>
      <HorizontalScroll elements={projects}></HorizontalScroll>
    </AnimatedLayout>
  );
};

export default HomeLayout;
