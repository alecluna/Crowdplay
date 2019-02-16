import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import Link from "react-router-dom/Link";

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

class JoinUsers extends Component {
  constructor() {
    super();
    this.state = {
      userId: "userId1",
      sessionId: "",
      chatId: "",
      text: "",
      searchRoomKeyWords: "",
      roomNotFound: false,
      joinedRooms: []
    };
    this.roomsRef = firebase
      .database()
      .ref()
      .child("RoomNames");
  }
  componentDidMount() {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    console.log(this.props.location.state);
    let userId = "userId1";
    firebase
      .database()
      .ref()
      .child(`Users/${userId}/joinedRooms`)
      .on("value", joinedRooms => {
        console.log(joinedRooms.val());
        if (joinedRooms.val())
          this.setState({ joinedRooms: joinedRooms.val() });
      });
  }

  handleSearchForRoom(event) {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { searchRoomKeyWords } = this.state;
    if (searchRoomKeyWords && searchRoomKeyWords.trim()) {
      this.roomsRef
        .child(searchRoomKeyWords)
        .once("value")
        .then(snapshot => {
          let roomId = snapshot.val();
          console.log(roomId);
          if (roomId) {
            //route and set roomId
            this.setState({ roomNotFound: false });

            this.props.history.push({
              pathname: `/room/${roomId}`,
              state: {
                name: name,
                accessToken: accessToken,
                userID: userID,
                photoURL: photoURL
              }
            });
          } else {
            this.setState({ roomNotFound: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    event.preventDefault();
  }

  changeSearchText(e) {
    this.setState({ searchRoomKeyWords: e.target.value });
  }

  showIfRoomNotFound() {
    return this.state.roomNotFound ? <div>Room Not Found</div> : null;
  }

  render() {
    const messagesHTML = Object.entries(this.state.joinedRooms).map(
      ([key, value], index) => {
        let to = "/room/" + value;
        return (
          <li style={{ listStyleType: "none" }} key={key}>
            <div>
              {" "}
              {index + 1}: <Link to={to}>{key}</Link>{" "}
            </div>
          </li>
        );
      }
    );

    return (
      <div>
        <Header />
        <div style={styles.background}>
          <Paper style={styles.paperStyle} elevation={11}>
            <div style={styles.centerStyling}>
              <Typography
                variant="display2"
                style={{ color: "black", fontWeight: "200" }}
              >
                Join a Session
              </Typography>
            </div>
            <div style={styles.centerStyling} />

            {this.showIfRoomNotFound()}
            <form onSubmit={this.handleSearchForRoom.bind(this)}>
              <input
                type="text"
                onChange={this.changeSearchText.bind(this)}
                value={this.state.searchRoomKeyWords}
              />
              <Button type="submit">Send</Button>
            </form>
            {messagesHTML}
          </Paper>
        </div>
      </div>
    );
  }
}

export default JoinUsers;
