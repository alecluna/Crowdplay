import React from "react";
import styled from "styled-components";
import Paper from "../../../Reusable/Paper";
import { withTheme } from "@material-ui/core/styles";

const StyledPaperCard = withTheme(styled(({ ...props }) => (
  <Paper {...props} />
))`
  & {
    margin: 20px;
    width: ${(props) => (props.theme.breakpoints.up(`md`) ? `25em` : `100%`)};
    height: 125px;
    border-radius: 5px;
  }
`);

export { StyledPaperCard };
