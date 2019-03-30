import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";
import firebase, { firestore } from "firebase";
import { Button, TextField } from "@material-ui/core";
import JoinedRoomsContainer from "../Components/Containers/JoinedRoomsContainer";

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
    this.fireStoreRooms = firebase.firestore().collection("rooms");
  }
  componentDidMount = () => {
    const { userID } = this.props.location.state;
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
  };

  handleSearchForRoom = event => {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { searchRoomKeyWords } = this.state;

    if (searchRoomKeyWords && searchRoomKeyWords.trim()) {
      this.fireStoreRooms
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
  };

  changeSearchText = e => {
    this.setState({ searchRoomKeyWords: e.target.value });
  };

  deleteChatRoom = nameofRoom => {
    this.fireStoreRooms
      .doc(nameofRoom)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  showIfRoomNotFound = () => {
    return this.state.roomNotFound ? (
      <Typography style={{ textAlign: "center" }} color="error" variant="title">
        Room Not Found
      </Typography>
    ) : null;
  };

  render() {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { joinedRooms } = this.state;

    const messagesHTML = joinedRooms.map(roomName => {
      return (
        <li style={{ listStyleType: "none" }} key={roomName}>
          <JoinedRoomsContainer
            roomName={roomName}
            name={name}
            accessToken={accessToken}
            userID={userID}
            photoURL={photoURL}
            deleteChatRoom={this.deleteChatRoom}
          />
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
                Join a Session as {name}
              </Typography>
            </div>
            <div style={styles.centerStyling} />

            {this.showIfRoomNotFound()}
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
              onSubmit={this.handleSearchForRoom.bind(this)}
            >
              <TextField
                placeholder="Search for a room"
                type="text"
                onChange={this.changeSearchText.bind(this)}
                value={this.state.searchRoomKeyWords}
                style={{ width: 400 }}
              />
              <Button type="submit">Send</Button>
              <Typography variant="headline">
                Here are your avaliable rooms:
              </Typography>
              {messagesHTML}
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default JoinUsers;
