import { useEffect, useRef, useState } from "react";
import ProjectSlider from "../components/ProjectSlider/index.jsx";
import AnimatedLayout from "./AnimatedLayout";
import HorizontalScroll from "../components/HorizontalScroll/index.jsx";

const HomeLayout = ({ projects, locale }) => {
  return (
    <AnimatedLayout>
      <HorizontalScroll elements={projects} locale={locale}></HorizontalScroll>
    </AnimatedLayout>
  );
};

export default HomeLayout;
