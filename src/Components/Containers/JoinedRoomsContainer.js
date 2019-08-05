import React, { Component } from "react";
import Link from "../../../node_modules/react-router-dom/Link";
import DeleteRoundedIcon from "../../../node_modules/@material-ui/icons/DeleteRounded";

import { Button, Typography, CardContent, Paper } from "@material-ui/core";

const styles = {
  cardStyle: {
    margin: "20px",
    width: window.innerWidth < 450 ? "15em" : "25em",
    height: 125,
    borderRadius: "10px"
  }
};

class JoinedRoomsContainer extends Component {
  deleteChatRoom = roomName => {
    this.props.deleteChatRoom(roomName);
  };
  render() {
    const { roomName, name, accessToken, userID, photoURL } = this.props;
    return (
      <div>
        <Paper elevation="15" style={styles.cardStyle} key={name}>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%"
            }}
            to={{
              pathname: `/room/${roomName}`,
              state: {
                name: `${name}`,
                accessToken: `${accessToken}`,
                userID: `${userID}`,
                photoURL: `${photoURL}`
              }
            }}
          >
            <CardContent>
              <Typography
                fontWeight="fontWeightLight"
                variant="h6"
                color="textSecondary"
              >
                {roomName}
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  onClick={() => {
                    this.deleteChatRoom(roomName);
                  }}
                >
                  <DeleteRoundedIcon />
                </Button>
              </Typography>
            </CardContent>
          </Link>
        </Paper>
      </div>
    );
  }
}

export default JoinedRoomsContainer;
