import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Link from "../../../node_modules/react-router-dom/Link";
import Card from "../../../node_modules/@material-ui/core/Card";
import CardContent from "../../../node_modules/@material-ui/core/CardContent";
import DeleteRoundedIcon from "../../../node_modules/@material-ui/icons/DeleteRounded";

class JoinedRoomsContainer extends Component {
  render() {
    const { roomName, name, accessToken, userID, photoURL } = this.props;

    return (
      <div>
        <Card
          style={{ width: "300px", margin: "10px", borderRadius: "5px" }}
          key={name}
        >
          <CardContent>
            <Typography
              variant="body1"
              fontWeight="fontWeightLight"
              style={{ fontSize: "1.6em" }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%"
                }}
                to={{
                  pathname: `/room/${name}`,
                  state: {
                    name: `${this.name}`,
                    accessToken: `${accessToken}`,
                    userID: `${userID}`,
                    photoURL: `${photoURL}`
                  }
                }}
              >
                {roomName}
              </Link>
              <DeleteRoundedIcon style={{ float: "right" }} />
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default JoinedRoomsContainer;
