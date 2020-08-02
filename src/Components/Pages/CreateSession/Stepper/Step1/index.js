import React from "react";
import Link from "react-router-dom/Link";
import Typography from "../../../../Reusable/Typography";
import Button from "../../../../Reusable/Button";
import {
  StyledTextField,
  StyledBackground,
  StyledButtonFlexContainer,
} from "../styles";

const PlaylistNameForm = (props) => {
  const { nextStep, handleChange } = props;

  return (
    <StyledBackground>
      <Typography align="center" variant="h5">
        Name Your Playlist:
      </Typography>
      <StyledTextField
        label="Name your Playlist"
        onChange={handleChange("playlist")}
      />
      <StyledButtonFlexContainer>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button>Back</Button>
        </Link>
        <Button
          onClick={(e) => {
            e.preventDefault();
            nextStep();
          }}
        >
          Continue
        </Button>
      </StyledButtonFlexContainer>
    </StyledBackground>
  );
};

export default PlaylistNameForm;
