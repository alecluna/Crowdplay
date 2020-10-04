import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const StyledTypography = withTheme(
  styled((props) => <Typography {...props} />)`
    & {
      ${(props) => props.bold && `font-weight: 600;`}
    }

    ${(props) => (props.isMeorNot ? "color: white;" : "color: black;")}
  `
);

export { StyledTypography };
