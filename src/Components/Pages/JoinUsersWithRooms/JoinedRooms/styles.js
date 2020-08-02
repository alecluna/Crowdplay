import React from "react";
import styled from "styled-components";
import Paper from "../../../Reusable/Paper";
import { withTheme } from "@material-ui/core/styles";
import Link from "react-router-dom/Link";

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

const StyledLink = styled(Link)`
  & {
    text-decoration: none;
    color: black;
    width: 100%;
  }
`;

export { StyledPaperCard, StyledLink };
