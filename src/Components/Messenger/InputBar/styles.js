import styled from "styled-components";
import React from "react";
import { TextField } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const StyledInputBar = withTheme(
  styled((props) => {
    return <div {...props} />;
  })`
    & {
      background-color: white;
      width: calc(100% - 35vw);
      margin-left: 10px;
      margin-right: 10px;
      bottom: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: none;
      height: 58px;
      min-height: 58px;
      position: fixed;
      bottom: 0px;
    }
  `
);

const StyledTextField = styled(({ ...props }) => <TextField {...props} />)`
  & {
    width: 100%;
  }
`;

export { StyledInputBar, StyledTextField };
