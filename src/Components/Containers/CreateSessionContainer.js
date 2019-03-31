import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Header from "../../Components/Utils/Header";
import firebase, { firestore } from "firebase";
import { TextField, Button } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
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

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleDescriptionChange = e => {
    this.setState({ roomDescription: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ roomName: e.target.value });
  };

  handleFormSubmit(event) {
    // const { name, accessToken, photoURL, userID } = this.props;
    // let { roomName, roomDescription } = this.state;
    // event.preventDefault();
    // let firestoreRef = firebase.firestore();
    // firestoreRef
    //   .collection("rooms")
    //   .doc(roomName)
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       this.setState({ roomExists: true });
    //     } else {
    //       //add room to rooms list
    //       firestoreRef
    //         .collection("rooms")
    //         .doc(roomName)
    //         .set({
    //           roomName: roomName,
    //           playListId: 1,
    //           description: roomDescription,
    //           createdAt: firestore.Timestamp.now(),
    //           createdBy: name,
    //           id: Math.floor(Math.random() * 10000000) + 1
    //         });
    //       //add room to user's joinedRoomsList
    //       firestoreRef
    //         .collection("users")
    //         .doc(userID)
    //         .collection("joinedRooms")
    //         .add({ roomName: roomName, createdAt: firestore.Timestamp.now() });
    //       this.props.history.push({
    //         pathname: `/room/${roomName}`,
    //         state: {
    //           name: name,
    //           accessToken: accessToken,
    //           userID: userID,
    //           photoURL: photoURL
    //         }
    //       });
    //     }
    //   });
  }

  render() {
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
                <Typography
                  style={{
                    color: "black",
                    fontWeight: "200",
                    textAlign: "center"
                  }}
                  variant="display2"
                >
                  Host a Session:
                </Typography>
              </div>
            )}
          </Spring>

          <Spring
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginTop: "30px"
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={this.back}
                      style={{
                        color: "white",
                        margin: "5px",

                        maxWidth: "200px",
                        background:
                          "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      color="primary"
                      onClick={this.continue}
                      style={{
                        color: "white",
                        margin: "5px",
                        maxWidth: "200px",
                        background:
                          "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Spring>
          {this.state.roomExists ? (
            <Typography color="error" variant="body1">
              Room Already Exists
            </Typography>
          ) : null}
        </div>
      </div>
    );
  }
}
