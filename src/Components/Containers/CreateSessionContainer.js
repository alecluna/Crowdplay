import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Paper from "../../../node_modules/@material-ui/core/Paper";
import Header from "../../Components/Utils/Header";
import firebase from "firebase";
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
    marginTop: "30px"
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
    event.preventDefault();
    let { roomName, roomDescription } = this.state;
    let firebaseRef = firebase.database().ref();
    firebaseRef.child("RoomNames").once("value", function(snapshot) {
      if (snapshot.hasChild(roomName)) {
        this.setState({ roomExists: true });
      } else {
        // let inviteCode = generate5DigitInviteCode();
        let newRoomRef = firebaseRef.child("Rooms").push({
          roomName: roomName,
          playListId: 1,
          description: roomDescription
        });
        console.log(newRoomRef.key);
        firebaseRef
          .child("RoomNames")
          .child(roomName)
          .push({ id: newRoomRef.key });
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
                  fontSize: "1.2em"
                }}
              >
                Create a Session as Host: {name}
              </Typography>
            </div>
            <div style={styles.centerStyling}>
              {this.state.roomExists ? <div> Room Already Exists</div> : null}
              <form onSubmit={this.handleFormSubmit.bind(this)}>
                <input
                  type="text"
                  onChange={this.handleNameChange.bind(this)}
                  required
                />
                <input
                  type="text"
                  onChange={this.handleDescriptionChange.bind(this)}
                />
                {/* generate invite code */}
                <input type="submit" />
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
