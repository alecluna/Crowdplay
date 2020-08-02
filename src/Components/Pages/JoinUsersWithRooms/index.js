import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import firebase, { firestore } from "firebase";
import { TextField } from "@material-ui/core";
import JoinedRooms from "./JoinedRooms";
import { Spring } from "react-spring/renderprops";
import Button from "../../Reusable/Button";

const styles = {
  background: {
    backgroundColor: "white",
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  textFieldStyles: {
    marginBottom: "4%",
    backgroundColor: "white",
    borderRadius: "20px",
    marginRight: "5%",
    marginLeft: "5%",
  },
};

class JoinUsersWithRooms extends Component {
  constructor() {
    super();
    this.state = {
      sessionId: "",
      chatId: "",
      text: "",
      searchRoomKeyWords: "",
      roomNotFound: false,
      joinedRooms: [],
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
      .onSnapshot((snapshot) => {
        let roomNames = snapshot.docs.map((doc) => {
          return doc.data().roomName;
        });

        this.setState({ joinedRooms: roomNames });
      });
  };

  handleSearchForRoom = (event) => {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { searchRoomKeyWords } = this.state;

    if (searchRoomKeyWords && searchRoomKeyWords.trim()) {
      this.fireStoreRooms
        .doc(searchRoomKeyWords)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ roomNotFound: false });
            this.props.history.push({
              pathname: `/room/${searchRoomKeyWords}`,
              state: {
                name: name,
                accessToken: accessToken,
                userID: userID,
                photoURL: photoURL,
              },
            });
            firebase
              .firestore()
              .collection("users")
              .doc(userID)
              .collection("joinedRooms")
              .add({
                roomName: searchRoomKeyWords,
                createdAt: firestore.Timestamp.now(),
              });
          } else {
            this.setState({ roomNotFound: true });
          }
        });
    }
    event.preventDefault();
  };

  changeSearchText = (e) => {
    this.setState({ searchRoomKeyWords: e.target.value });
  };

  deleteChatRoom = (nameofRoom) => {
    console.log(nameofRoom);
    /**
     * Call the 'recursiveDelete' callable function with a path to initiate
     * a server-side delete.
     */
    let deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: `spotify-crowdpay/rooms/${nameofRoom.trim()}` })
      .then((result) => {
        console.log("Delete success: " + JSON.stringify(result));
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  render() {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    const { joinedRooms, roomNotFound } = this.state;

    const joinedRoomsMapped = joinedRooms.map((roomName) => {
      return (
        <li style={{ listStyleType: "none" }} key={roomName}>
          <JoinedRooms
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
        <div style={styles.background}>
          <Spring
            from={{ opacity: 0, transform: "translate3d(0,-30px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {(props) => (
              <div style={props}>
                <div style={styles.centerStyling}>
                  <Typography>My Sessions</Typography>
                </div>
              </div>
            )}
          </Spring>

          {roomNotFound && (
            <Typography align="center" color="error" variant="h4">
              Sorry, Room Not Found!
            </Typography>
          )}

          <Spring
            from={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {(props) => (
              <div style={props}>
                <form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    paddingLeft: "5em",
                    paddingRight: "5em",
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
                  <Button type="submit">Search</Button>
                </form>
              </div>
            )}
          </Spring>
          <Typography align="center" variant="h6">
            Avaliable rooms:
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {joinedRoomsMapped}
          </div>
        </div>
      </div>
    );
  }
}

export default JoinUsersWithRooms;
