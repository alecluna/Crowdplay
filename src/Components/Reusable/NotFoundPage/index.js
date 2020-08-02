import React from "react";
import Typography from "../Typography";
import { StyledNotFoundContainer } from "./styles";

const NotFoundPage = () => (
  <React.Fragment>
    <StyledNotFoundContainer>
      <Typography variant="display1">
        Sorry the page you are looking for doesn't exist!
      </Typography>
    </StyledNotFoundContainer>
  </React.Fragment>
);

export default NotFoundPage;
