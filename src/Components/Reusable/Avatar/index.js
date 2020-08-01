import React from "react";
import { StyledAvatar } from "./styles";

const Avatar = (props) => {
  const { children } = props;

  return <StyledAvatar>{children}</StyledAvatar>;
};

export default Avatar;
