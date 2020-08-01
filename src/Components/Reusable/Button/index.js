import React from "react";
import { StyledButton } from "./styles";

const Button = (props) => {
  const { children } = props;

  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
