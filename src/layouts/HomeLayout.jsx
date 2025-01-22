import MotionContainer from "../components/_MotionContainer";
import ProjectSlider from "../components/ProjectSlider";
import SmoothScroll from "../components/_SmoothScroll";

const HomeLayout = ({ projects }) => {
  // console.log(projects);
  return (
    <SmoothScroll>
      <MotionContainer>
        <h1 className="font-serif [font-size:clamp(4rem,-0.4rem+22vw,26rem)] text-center leading-none -mb-[3.5%] z-50 mix-blend-difference select-none block">
          srkdesign
        </h1>
        <ProjectSlider projects={projects} />
      </MotionContainer>
    </SmoothScroll>
  );
};

export default HomeLayout;
