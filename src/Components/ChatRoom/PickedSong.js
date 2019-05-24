import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import firebase, { firestore } from "firebase";
import Typography from "@material-ui/core/Typography";
// import { Spring } from "react-spring/renderprops";

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
    backgroundColor: "white",
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

export default class PickedSong extends Component {
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
    const { name, photoURL, userID } = this.props;
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
    const { messages } = this.state;
    const { userID: propsUserID } = this.props;

    const mappedMessages = Object.entries(messages).map(([key, value]) => {
      const { text, userID } = value;
      if (userID === propsUserID) {
        return (
          // <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          //   {props => (
          //     <div style={props}>
          <li
            style={{
              listStyleType: "none",
              alignSelf: "flex-end"
            }}
            key={key}
          >
            <Typography style={styles.listMessageStyleBlue}>{text}</Typography>
          </li>
          //     </div>
          //   )}
          // </Spring>
        );
      } else {
        return (
          <li
            style={{
              listStyleType: "none"
            }}
            key={key}
          >
            <Typography style={styles.listMessageStyleGrey}>{text}</Typography>
          </li>
        );
      }
    });

    return (
      <div>
        {mappedMessages}
        <ChatMessage addMessage={this.handleSubmitNewMessage.bind(this)} />
      </div>
    );
  }
}
