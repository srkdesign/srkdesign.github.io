import MotionContainer from "../components/MotionContainer";
// import SmoothScroll from "../components/_SmoothScroll";

const AnimatedLayout = ({ children }) => {
  return (
    // <SmoothScroll>
    <MotionContainer>{children}</MotionContainer>
    // </SmoothScroll>
  );
};

export default AnimatedLayout;
