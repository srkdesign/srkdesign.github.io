import { useEffect, useRef, useState } from "react";
import ProjectSlider from "../components/ProjectSlider";
import AnimatedLayout from "./AnimatedLayout";
import { motion, useScroll, useTransform } from "motion/react";
import ProjectSlide from "../components/ProjectSlide";

const HomeLayout = ({ projects }) => {
  // console.log(projects);
  // const containerRef = useRef(null);
  // const { scrollYProgress } = useScroll({ target: containerRef });

  // const listRef = useRef(null);
  // const [listWidth, setListWidth] = useState(0);

  // useEffect(() => {
  //   if (listRef.current) {
  //     setListWidth(listRef.current.scrollWidth - listRef.current.clientWidth);
  //   }
  // }, [projects]);

  // const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${listWidth}px`]);

  return (
    <AnimatedLayout>
      <h1 className="font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none firefox-leading -mb-[min(1.5rem,1.5%)] z-50 mix-blend-difference select-none block text-zinc-50">
        srkdesign
      </h1>
      <ProjectSlider projects={projects} />

      {/* Horizontal Scroll Version */}
      {/* <section
        ref={containerRef}
        className="lg:h-[350vh] relative lg:flex items-end"
      >
        <div className="sticky bottom-0 top-0 w-full items-center justify-center overflow-hidden">
          <h1 className="relative font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none -mb-[3.5%] z-50 mix-blend-difference select-none block">
            srkdesign
          </h1>
          <motion.ul ref={listRef} className="hidden lg:flex" style={{ x }}>
            {projects?.map((project, index) => (
              <li key={index} className="flex-shrink-0 md:basis-1/3 basis-1/2">
                <ProjectSlide url={project.id} image={project.data.heroImage} />
              </li>
            ))}
          </motion.ul>
        </div>
      </section> */}
    </AnimatedLayout>
  );
};

export default HomeLayout;
