import React, { Component } from "react";
import axios from "../../../node_modules/axios";
import Pusher from "../../../node_modules/pusher-js";
// import ChatMessage from "./ChatMessage";

Pusher.logToConsole = true;

export default class Chat extends Component {
  constructor() {
    //set intitial state
    super();
    this.state = {
      text: "",
      username: "",
      chats: []
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    console.log(name);
    const username = window.prompt("Username: ", name); //intialize username
    this.setState({ username }); //shorthand object assignment property
    const pusher = new Pusher("c6ecf9f5f543d9e5c82d", {
      cluster: "us2",
      forceTLS: true
    });

    var channel = pusher.subscribe("My-Spotify-ChatRoom");
    channel.bind("my-event", function(data) {
      alert(data.message);
    });

    channel.bind("message", data => {
      //'listen for messages'
      console.log(data);
      this.setState({ chats: [...this.state.chats, data] }); //spread operator
      console.log(...this.state.chats);
    });
  }

  handleTextChange(text) {
    this.setState({
      chats: [
        ...this.state.chats,
        {
          //'pushing' new chat to chat array

          username: this.state.username,
          message: text,
          id: new Date().getTime()
        }
      ]
    });
  }

  render() {
    const borderStyle = {
      borderStyle: "1px solid blue",
      width: "300px"
    };

    const textBorder = {
      borderStyle: "1px solid blue",
      backgroundColor: "grey",
      borderRadius: "5%",
      fontFamily: "sans-serf"
    };

    const chats = this.state.chats.map((chat, index) => (
      <li style={{ listStyleType: "none" }} key={chat.id}>
        <p>{chat.username}</p>
        <div style={textBorder}> {chat.message} </div>{" "}
      </li>
    ));

    return (
      <div>
        <p> Chats here </p>
        <div className="container">
          <div style={borderStyle} className="messages">
            <ul> {chats} </ul>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
