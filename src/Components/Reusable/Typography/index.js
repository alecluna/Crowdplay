import React from "react";
import { StyledTypography } from "./styles";

const Typography = (props) => {
  const { children } = props;

  return <StyledTypography {...props}>{children}</StyledTypography>;
};

export default Typography;
