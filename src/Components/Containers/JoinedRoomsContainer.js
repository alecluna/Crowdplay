import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Link from "../../../node_modules/react-router-dom/Link";
import Card from "../../../node_modules/@material-ui/core/Card";
import CardContent from "../../../node_modules/@material-ui/core/CardContent";
import DeleteRoundedIcon from "../../../node_modules/@material-ui/icons/DeleteRounded";
import Button from "../../../node_modules/@material-ui/core/Button";

class JoinedRoomsContainer extends Component {
  deleteChatRoom = roomName => {
    this.props.deleteChatRoom(roomName);
  };
  render() {
    const { roomName, name, accessToken, userID, photoURL } = this.props;
    return (
      <div>
        <Card
          style={{ width: "200px", margin: "10px", borderRadius: "5px" }}
          key={name}
        >
          <CardContent>
            <Typography
              variant="body1"
              fontWeight="fontWeightLight"
              style={{ fontSize: ".9em" }}
            >
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
                {roomName}
              </Link>
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
        </Card>
      </div>
    );
  }
}

export default JoinedRoomsContainer;
