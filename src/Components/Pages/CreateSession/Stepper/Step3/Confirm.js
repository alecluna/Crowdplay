import React from "react";
import { List, ListItem } from "@material-ui/core";
import Button from "../../../../Reusable/Button";
import Typography from "../../../../Reusable/Typography";
import { StyledBackground, StyledConfirmContainer } from "../styles";

const Confirm = (props) => {
  const {
    playlistAPI,
    nextStep,
    prevStep,
    values: {
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID,
      roomName,
      roomDescription,
      roomExists,
      photoURL,
    },
  } = props;

  const error = () => {
    return (
      name.trim().length === 0 ||
      roomName.trim().length === 0 ||
      roomDescription.trim().length === 0
    );
  };

  return (
    <StyledBackground>
      <Typography align="center" variant="h4">
        Confirm
      </Typography>
      <List>
        <ListItem>
          <Typography varaint="h6">Playlist Name: {playlist}</Typography>
        </ListItem>
        <ListItem>
          <Typography varaint="h6">
            Crowdplay Session Name: {roomName}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography varaint="h6">Description: {roomDescription}</Typography>
        </ListItem>
      </List>
      {error() && (
        <Typography variant="body2" style={{ color: "red" }}>
          Missing Playlist Name, Session Name or Description.
        </Typography>
      )}
      <StyledConfirmContainer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            prevStep();
          }}
        >
          Back
        </Button>

        <Button
          disabled={error() === true}
          onClick={(e) => {
            e.preventDefault();
            playlistAPI(
              playlist,
              privatePlaylist,
              name,
              accessToken,
              userID,
              roomName,
              roomDescription,
              roomExists,
              photoURL
            );
            nextStep();
          }}
        >
          Confirm
        </Button>
      </StyledConfirmContainer>
    </StyledBackground>
  );
};

export default Confirm;
