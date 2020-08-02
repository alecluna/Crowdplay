import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const StyledBackground = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  & {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-top: 30px;
  }
`;

const StyledTextField = withTheme(
  styled(({ ...props }) => <TextField {...props} />)`
    & {
      width: 30;
      margin-bottom: 4%;
      background-color: white;
      border-radius: 20px;
    }
  `
);

const StyledButtonFlexContainer = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;

const StyledConfirmContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 30px;
`;

export {
  StyledBackground,
  StyledForm,
  StyledTextField,
  StyledButtonFlexContainer,
  StyledConfirmContainer,
};
