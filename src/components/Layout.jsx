import MotionContainer from "./_MotionContainer";
import SmoothScroll from "./_SmoothScroll";

const Layout = ({ children }) => {
  return (
    <SmoothScroll>
      <MotionContainer>{children}</MotionContainer>
    </SmoothScroll>
  );
};

export default Layout;
