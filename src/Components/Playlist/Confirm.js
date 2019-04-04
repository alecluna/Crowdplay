import React, { Component } from "react";
import Button from "../../../node_modules/@material-ui/core/Button";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import List from "../../../node_modules/@material-ui/core/List";
import ListItem from "../../../node_modules/@material-ui/core/ListItem";
import Header from "../Utils/Header";
// import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  button: {
    margin: 15
  }
};

export default class Confirm extends Component {
  confirm = (
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    roomName,
    roomDescription,
    roomExists,
    photoURL
  ) => {
    this.props.playlistAPI(
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID
    );
    console.log("CREATE SESSION VARS");
    console.log(name, accessToken, userID, roomName, roomDescription);

    this.props.createSessionFirebase(
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

    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  private = privatePlaylist => {
    if (privatePlaylist === "public") return "public";
    else if (privatePlaylist === "private") return "private";
    else return "collaborative";
  };

  render() {
    const {
      values: {
        playlist,
        privatePlaylist,
        name,
        accessToken,
        userID,
        roomName,
        roomDescription,
        roomExists,
        photoURL
      }
    } = this.props;

    console.log("within render() of Confirm Props: \n");
    console.log(this.props);
    console.log(
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID,
      roomName,
      roomDescription,
      roomExists
    );
    return (
      <div>
        <Header />
        <div style={styles.background}>
          {/* <Spring
            from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}> */}
          <Typography
            align="center"
            variant="display2"
            style={{ fontWeight: "200" }}
          >
            Confirm
          </Typography>
          <List>
            <ListItem>
              <Typography>Playlist Name: {playlist} </Typography>
            </ListItem>
            <ListItem>
              <Typography>Crowdplay Session Name: {roomName}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {roomDescription}</Typography>
            </ListItem>
          </List>
          {/* </div>
            )}
          </Spring> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "30px"
            }}
          >
            {/* <Spring
              from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
              to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
            >
              {props => ( 
              <div style={props}> */}
            <Button
              style={{
                color: "white",
                margin: "5px",
                maxWidth: "200px",
                background: "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
              }}
              onClick={this.back}
            >
              Back
            </Button>
            <Button
              style={{
                color: "white",
                margin: "5px",
                maxWidth: "200px",
                background: "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
              }}
              onClick={this.confirm.bind(
                this,
                playlist,
                privatePlaylist,
                name,
                accessToken,
                userID,
                roomName,
                roomDescription,
                roomExists,
                photoURL
              )}
            >
              Confirm
            </Button>
            {/* </div>
              )}
            </Spring> */}
          </div>
        </div>
      </div>
    );
  }
}
