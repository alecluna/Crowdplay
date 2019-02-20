import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";
import firebase, { firestore } from "firebase";
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
    this.roomsFirestoreRef = firebase.firestore().collection("rooms");
  }
  componentDidMount() {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("joinedRooms")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        let roomNames = [];
        snapshot.docs.forEach(doc => {
          roomNames.push(doc.data().roomName);
        });
        this.setState({ joinedRooms: roomNames });
      });
  }

  handleSearchForRoom(event) {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { searchRoomKeyWords } = this.state;
    if (searchRoomKeyWords && searchRoomKeyWords.trim()) {
      this.roomsFirestoreRef
        .doc(searchRoomKeyWords)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({ roomNotFound: false });
            this.props.history.push({
              pathname: `/room/${searchRoomKeyWords}`,
              state: {
                name: name,
                accessToken: accessToken,
                userID: userID,
                photoURL: photoURL
              }
            });
            firebase
              .firestore()
              .collection("users")
              .doc(userID)
              .collection("joinedRooms")
              .add({
                roomName: searchRoomKeyWords,
                createdAt: firestore.Timestamp.now()
              });
          } else {
            this.setState({ roomNotFound: true });
          }
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
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const messagesHTML = this.state.joinedRooms.map((roomName, index) => {
      return (
        <li style={{ listStyleType: "none" }} key={roomName}>
          <div>
            {index + 1}:
            <Link
              to={{
                pathname: `/room/${roomName}`,
                state: {
                  name: name,
                  accessToken: accessToken,
                  userID: userID,
                  photoURL: photoURL
                }
              }}
            >
              {roomName}
            </Link>
          </div>
        </li>
      );
    });

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
