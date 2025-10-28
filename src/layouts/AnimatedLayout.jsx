import MotionContainer from "../components/MotionContainer";
// import SmoothScroll from "../components/_SmoothScroll";
import Lenis from "lenis";
import SmoothScroll from "../components/SmoothScroll";

const AnimatedLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <MotionContainer>{children}</MotionContainer>
    </SmoothScroll>
  );
};

export default AnimatedLayout;
