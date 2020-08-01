import React from "react";
import { StyledPaper } from "./styles";

const Paper = (props) => {
  const { children } = props;

  return <StyledPaper {...props}>{children}</StyledPaper>;
};

export default Paper;
