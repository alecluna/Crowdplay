import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";
import firebase from 'firebase';
import { Button, List, ListItem } from "@material-ui/core";

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
      messages: [],
      text: ""
    }
    this.messageRef = firebase.database().ref().child("Chats").child("chatsId");
    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();
  }

  listenMessages() {
    this.messageRef.on('value', message => {
      this.setState({ messages: Object.values(message.val()) });
    });
  }

  componentDidMount() {
  }

  handleSubmitNewMessage(event) {
    if (this.state.text) {
      this.messageRef.push(this.state.text);
      this.setState({ text: '' });
    }
    event.preventDefault();
  }

  changeText(e) {
    this.setState({ text: e.target.value })
  }

  render() {
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

            <form onSubmit={this.handleSubmitNewMessage.bind(this)}>
              <input
                type="text"
                onChange={this.changeText.bind(this)}
                value={this.state.text}
              />
              <Button type="submit">Send</Button>

            </form>

            {
              this.state.messages.map((value, index) => {
                return <p>Item {index + 1}: {value}</p>
              })
            }
          </Paper>
        </div>
      </div>)
  }



}

export default JoinUsers;
