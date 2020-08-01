import styled from "styled-components";
import React from "react";
import { Button } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const StyledButton = withTheme(styled(({ ...props }) => (
  <Button disableElevation {...props} />
))`
  & {
    margin: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.palette.primary.main};
    &:hover {
      background-color: ${(props) => props.theme.palette.primary.hover};
    }
    color: white;
  }
`);

export { StyledButton };
