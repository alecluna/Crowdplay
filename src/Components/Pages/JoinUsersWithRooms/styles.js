import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const StyledRoomsListContainer = styled.div`
  & {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    margin: 1.5em;
  }
`;

const StyledForm = styled.form`
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTextField = withTheme(
  styled(({ ...props }) => <TextField {...props} />)`
    & {
      margin-bottom: 4%;
      background-color: white;
      border-radius: 20px;
      margin-right: 5%;
      margin-left: 5%;
    }
  `
);

export { StyledRoomsListContainer, StyledTextField, StyledForm };
