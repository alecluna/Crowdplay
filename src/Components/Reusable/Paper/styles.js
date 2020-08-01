import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

const StyledPaper = styled(({ ...props }) => <Paper {...props} />)`
  & {
    border-radius: 0 10px 10px 10px;
    padding: 10px;
  }
`;

export { StyledPaper };
