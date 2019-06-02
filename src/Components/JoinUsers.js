import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import firebase, { firestore } from "firebase";
import { Button, TextField } from "@material-ui/core";
import JoinedRoomsContainer from "../Components/Containers/JoinedRoomsContainer";

const styles = {
  background: {
    backgroundColor: "white"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "no-wrap",
    alignItems: "center"
  },
  textFieldStyles: {
    marginBottom: "4%",
    backgroundColor: "white",
    borderRadius: "20px",
    marginRight: "5%",
    marginLeft: "5%"
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
    this.getRooms();
  };

  getRooms = () => {
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
    console.log(nameofRoom);
    //TODO add Firebase function
    // this.fireStoreRooms
    //   .doc(nameofRoom)
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(function(doc) {
    //       doc.ref.delete();
    //     });
    //   })
    //   .catch(function(error) {
    //     console.error("Error removing document: ", error);
    //   });
  };

  showIfRoomNotFound = () => {
    return this.state.roomNotFound ? (
      <Typography align="center" color="error" variant="title">
        Sorry, Room Not Found!
      </Typography>
    ) : null;
  };

  render() {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { joinedRooms } = this.state;

    const joinedRoomsMapped = joinedRooms.map(roomName => {
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
          <div style={styles.centerStyling}>
            <Typography
              style={{
                fontWeight: "200",
                paddingTop: "5%",
                paddingBottom: "5%"
              }}
              variant="display2"
              color="textPrimary"
            >
              My Sessions
            </Typography>
          </div>

          {this.showIfRoomNotFound()}

          <form
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "5em"
            }}
            onSubmit={this.handleSearchForRoom.bind(this)}
          >
            <TextField
              placeholder="Search for a room"
              type="text"
              align="center"
              fullWidth
              onChange={this.changeSearchText.bind(this)}
              value={this.state.searchRoomKeyWords}
              style={styles.textFieldStyles}
            />
            <Button
              type="submit"
              style={{
                color: "white",
                margin: "5px",
                borderRadius: "20px",
                maxWidth: "200px",
                background: "#1db954"
              }}
            >
              Send
            </Button>
          </form>
          <Typography
            align="center"
            variant="h5"
            style={{ fontWeight: "200", margin: "10px" }}
          >
            Here are your avaliable rooms:
          </Typography>
          <div
            style={{
              height: "400px",
              overflowY: "scroll",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            {joinedRoomsMapped}
          </div>
        </div>
      </div>
    );
  }
}

export default JoinUsers;
