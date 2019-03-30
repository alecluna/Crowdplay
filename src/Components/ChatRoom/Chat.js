import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import firebase, { firestore } from "firebase";
import Header from "../Utils/Header";
import Typography from "../../../node_modules/@material-ui/core/Typography";

const styles = {
  background: {
    backgroundColor: "#D3D3D3"
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
    marginTop: "15px"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    maxHeight: "100vh"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: "1",
    height: "100%"
  },

  centerStyling: {
    backgroundColor: "white"
  },
  listMessageStyleBlue: {
    backgroundColor: "#0076FF",
    color: "white",
    padding: "8px 12px",
    marginBottom: "8px",
    borderRadius: "16px",
    marginRight: "8px"
  },
  listMessageStyleGrey: {
    backgroundColor: "#d3d3d3",
    color: "black",
    padding: "8px 12px",
    marginBottom: "8px",
    borderRadius: "16px",
    maxWidth: "40%"
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
    this.messageFirestoreRef = firebase
      .firestore()
      .collection("rooms")
      .doc(match.params.roomId)
      .collection("messages");
    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();
  }

  listenMessages() {
    this.messageFirestoreRef
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        let messages = [];
        snapshot.docs.forEach(message => {
          messages.push(message.data());
        });
        this.setState({ messages });
      });
  }

  handleSubmitNewMessage(messageText) {
    const { name, accessToken, photoURL, userID } = this.props.location.state;
    if (messageText && messageText.trim()) {
      let messageInfo = {
        text: messageText,
        photoURL: photoURL,
        userID: userID,
        name: name,
        timestamp: firestore.Timestamp.now()
      };
      this.messageFirestoreRef.add(messageInfo);
    }
  }

  render() {
    const messages = Object.entries(this.state.messages).map(
      ([key, value], index) => {
        const { text, userID } = value;
        if (userID === this.props.location.state.userID) {
          return (
            <li
              style={{
                listStyleType: "none",
                alignSelf: "flex-end"
              }}
              key={key}
            >
              <Typography style={styles.listMessageStyleBlue}>
                {text}
              </Typography>
            </li>
          );
        } else {
          return (
            <li
              style={{
                listStyleType: "none"
              }}
              key={key}
            >
              <Typography style={styles.listMessageStyleGrey}>
                {text}
              </Typography>
            </li>
          );
        }
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
          <div style={styles.column /*first column*/}>
            <div style={styles.centerStyling}>
              <div
                style={{
                  boxSizing: "border-box",
                  border: ".5px solid grey",
                  padding: "0 0 0 10px",
                  maxHeight: "70vh",
                  overflow: "scroll"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "8px"
                  }}
                >
                  {messages}
                </div>
              </div>
              <ChatMessage
                addMessage={this.handleSubmitNewMessage.bind(this)}
              />
            </div>
          </div>
          <div style={styles.column /*second column*/}>
            <Typography style={{ textAlign: "center" }}>
              Spotify Playlist Editor Here
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
