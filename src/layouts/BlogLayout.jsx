import MotionContainer from "../components/_MotionContainer";
import SmoothScroll from "../components/_SmoothScroll";

import { motion } from "motion/react";

const BlogLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <MotionContainer>
        <ul className="lg:px-24 px-8 pt-32">{children}</ul>
      </MotionContainer>
    </SmoothScroll>
  );
};

export default BlogLayout;
