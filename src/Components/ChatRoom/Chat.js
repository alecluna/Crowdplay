import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import firebase from 'firebase';
import Header from "../Utils/Header";
import { Paper, Typography } from "@material-ui/core";

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

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: {},
    };
  }

  componentDidMount() {
    this.messageRef = firebase.database().ref().child(`Rooms/${this.props.match.params.roomId}/messages`);
    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();
  }

  componentWillMount() {
    //check if roomId exists. If not, route back to the join room
    firebase.database().ref().child("Rooms").child(this.props.match.params.roomId)
      .once('value')
      .then(snapshot => {
        if (!snapshot.val()) {
          this.props.history.push('/joinusers');
        }
      });
  }

  listenMessages() {
    this.messageRef.on('value', message => {
      if (message.val())
        this.setState({ messages: message.val() });
    });
  }

  handleSubmitNewMessage(messageText) {
    if (messageText && messageText.trim()) {
      this.messageRef.push(messageText);
    }
  }




  render() {
    const messagesHTML = Object.entries(this.state.messages).map(
      ([key, value], index) =>
        (
          <li style={{ listStyleType: "none" }} key={key}>
            <div> {index + 1}: {value} </div>
          </li>
        )
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
                Chat Room
        </Typography>
            </div>
            <div style={styles.centerStyling} />
            <div className="container">
              <div>
                <ul> {messagesHTML} </ul>
              </div>
              <div>
                <ChatMessage addMessage={this.handleSubmitNewMessage.bind(this)} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }

}