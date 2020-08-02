import React from "react";
import Link from "react-router-dom/Link";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import { Button, Typography, CardContent } from "@material-ui/core";
import { StyledPaperCard } from "./styles";

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
    props.deleteChatRoom(roomName);
  };

  return (
    <React.Fragment>
      <StyledPaperCard elevation={5} key={name}>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",
          }}
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
        </Link>
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
