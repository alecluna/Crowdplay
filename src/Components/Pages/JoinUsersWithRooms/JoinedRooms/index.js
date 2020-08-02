import React from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import { Button, Typography, CardContent } from "@material-ui/core";
import { StyledPaperCard, StyledLink } from "./styles";

const JoinedRooms = (props) => {
  const {
    roomName,
    name,
    accessToken,
    userID,
    photoURL,
    deleteChatRoom,
  } = props;

  const handleDeleteChatRoom = (roomName) => {
    deleteChatRoom(roomName);
  };

  return (
    <React.Fragment>
      <StyledPaperCard elevation={5} key={name}>
        <StyledLink
          to={{
            pathname: `/room/${roomName}`,
            state: {
              name: `${name}`,
              accessToken: `${accessToken}`,
              userID: `${userID}`,
              photoURL: `${photoURL}`,
            },
          }}
        >
          <CardContent>
            <Typography
              fontWeight="fontWeightLight"
              variant="h6"
              color="textSecondary"
            >
              {roomName}
            </Typography>
          </CardContent>
        </StyledLink>
        <Button
          style={{ float: "right" }}
          type="submit"
          onClick={() => {
            handleDeleteChatRoom(roomName);
          }}
        >
          <DeleteRoundedIcon />
        </Button>
      </StyledPaperCard>
    </React.Fragment>
  );
};

export default JoinedRooms;
