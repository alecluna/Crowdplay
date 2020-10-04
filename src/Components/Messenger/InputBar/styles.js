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
      margin: 15px;
      bottom: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: none;
      height: 58px;
      min-height: 58px;
      position: fixed;
      bottom: 0px;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
      border-radius: 5px;
    }
  `
);

const StyledTextField = styled(({ ...props }) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))`
  & {
    width: 100%;
  }

  .MuiInput-root {
    height: 100%;
    padding: 5px;
  }
`;

export { StyledInputBar, StyledTextField };
