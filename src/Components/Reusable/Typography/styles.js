import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const StyledTypography = withTheme(
  styled(({ ...props }) => <Typography {...props} />)`
    & {
      color: black;
    }
  `
);
export { StyledTypography };
