import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import firebase, { firestore } from "firebase";
import { Button, TextField } from "@material-ui/core";
import JoinedRoomsContainer from "../Components/Containers/JoinedRoomsContainer";
import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    backgroundColor: "white"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row"
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
          <Spring
            from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
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
              </div>
            )}
          </Spring>

          {this.showIfRoomNotFound()}

          <Spring
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
                <form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    paddingLeft: "5em",
                    paddingRight: "5em"
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
                    Search
                  </Button>
                </form>
              </div>
            )}
          </Spring>
          <Typography
            align="center"
            variant="h5"
            style={{ fontWeight: "200", margin: "10px" }}
          >
            Avaliable rooms:
          </Typography>
          <div
            style={{
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
