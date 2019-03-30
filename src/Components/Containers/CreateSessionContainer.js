import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Paper from "../../../node_modules/@material-ui/core/Paper";
import Header from "../../Components/Utils/Header";
import firebase, { firestore } from "firebase";
import { TextField, Button } from "@material-ui/core";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paperStyle: {
    height: "75%",
    width: "60%",
    borderRadius: "5px"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: "30px"
  },
  textFieldStyles: {
    width: 300,
    marginBottom: "4%"
  }
};

export default class CreateSessionContainer extends Component {
  constructor() {
    super();
    this.state = {
      roomName: "",
      roomDescription: "",
      roomExists: false
    };
  }

  handleDescriptionChange(e) {
    this.setState({ roomDescription: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ roomName: e.target.value });
  }

  handleFormSubmit(event) {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    let { roomName, roomDescription } = this.state;
    event.preventDefault();

    let firestoreRef = firebase.firestore();
    firestoreRef
      .collection("rooms")
      .doc(roomName)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ roomExists: true });
        } else {
          //add room to rooms list
          firestoreRef
            .collection("rooms")
            .doc(roomName)
            .set({
              roomName: roomName,
              playListId: 1,
              description: roomDescription,
              createdAt: firestore.Timestamp.now(),
              createdBy: name,
              id: Math.floor(Math.random() * 10000000) + 1
            });
          //add room to user's joinedRoomsList
          firestoreRef
            .collection("users")
            .doc(this.props.location.state.userID)
            .collection("joinedRooms")
            .add({ roomName: roomName, createdAt: firestore.Timestamp.now() });
          this.props.history.push({
            pathname: `/room/${roomName}`,
            state: {
              name: name,
              accessToken: accessToken,
              userID: userID,
              photoURL: photoURL
            }
          });
        }
      });
  }

  render() {
    const { name } = this.props.location.state;
    return (
      <div>
        <Header />
        <div style={styles.background}>
          <Paper style={styles.paperStyle} elevation={11}>
            <div style={styles.centerStyling}>
              <Typography
                style={{
                  color: "black",
                  fontWeight: "200",
                  textAlign: "center",
                  fontSize: "1.5em"
                }}
              >
                Create a Session as Host: {name}
              </Typography>
            </div>
            <div>
              <form
                style={styles.centerStyling}
                onSubmit={this.handleFormSubmit.bind(this)}
              >
                <TextField
                  placeholder="Name"
                  type="text"
                  onChange={this.handleNameChange.bind(this)}
                  required
                  style={styles.textFieldStyles}
                />
                <TextField
                  placeholder="Description"
                  type="text"
                  onChange={this.handleDescriptionChange.bind(this)}
                  style={styles.textFieldStyles}
                />
                <Button type="submit" onstyle={{ maxWidth: "200px" }}>
                  Submit
                </Button>
              </form>
              {this.state.roomExists ? (
                <Typography color="error" variant="body1">
                  Room Already Exists
                </Typography>
              ) : null}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
