import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase";
import Header from "../Utils/Header";
import Typography from "../../../node_modules/@material-ui/core/Typography";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh"
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: "1"
  },

  centerStyling: {
    backgroundColor: "white"
  }
};

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: {}
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.messageRef = firebase
      .database()
      .ref()
      .child(`Rooms/${match.params.roomId}/messages`);
    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();
  }

  componentWillMount() {
    //check if roomId exists. If not, route back to the join room
    const { match } = this.props;

    firebase
      .database()
      .ref()
      .child(`Rooms/${match.params.roomId}`)
      .once("value")
      .then(snapshot => {
        if (!snapshot.val()) {
          this.props.history.push("/joinusers");
        }
      });
  }

  listenMessages() {
    this.messageRef.on("value", message => {
      if (message.val()) this.setState({ messages: message.val() });
    });
  }

  handleSubmitNewMessage(messageText) {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    if (messageText && messageText.trim()) {
      let messageInfo = {
        text: messageText,
        photoURL: photoURL,
        userID: userID,
        name: name
      };
      this.messageRef.push(messageInfo);
    }
  }

  render() {
    const messages = Object.entries(this.state.messages).map(
      ([key, value], index) => {
        const { name, photoURL, text, userID } = value;
        return (
          <li style={{ listStyleType: "none" }} key={key}>
            <Typography>
              {index + 1}: {text} from {name} UID: {userID}
            </Typography>
          </li>
        );
      }
    );
    return (
      <div>
        <Header />
        <div style={styles.titleStyle}>
          <Typography
            variant="display2"
            style={{ color: "black", fontWeight: "200" }}
          >
            Chat Room
          </Typography>
        </div>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.centerStyling}>
              <div
                style={{
                  boxSizing: "border-box",
                  border: "2px solid black",
                  padding: "0 0 0 6px",
                  margin: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "scroll"
                }}
              >
                <div>
                  <ul>{messages}</ul>
                </div>
                <ChatMessage
                  addMessage={this.handleSubmitNewMessage.bind(this)}
                />
              </div>
            </div>
          </div>
          <div style={styles.column}>
            <Typography>Spotify Playlist Editor Here </Typography>
          </div>
        </div>
      </div>
    );
  }
}
