import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const StyledTypography = withTheme(
  styled(({ bold, ...props }) => <Typography {...props} />)`
    & {
      color: black;
      ${(props) => props.bold && `font-weight: 600;`}
    }
  `
);
export { StyledTypography };
