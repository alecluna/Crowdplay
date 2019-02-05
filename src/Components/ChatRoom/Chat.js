import React, { Component } from "react";
import axios from "../../../node_modules/axios";
import Pusher from "../../../node_modules/pusher-js";
import ChatMessage from "./ChatMessage";

Pusher.logToConsole = true;

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      username: "",
      chats: []
    };
  }

  componentDidMount() {
    const { name } = this.props;
    console.log(name);
    const username = name; //intialize username that is passed in from props
    this.setState({ username }); //shorthand object assignment property
    const pusher = new Pusher("c6ecf9f5f543d9e5c82d", {
      cluster: "us2",
      forceTLS: true
    });

    let channel = pusher.subscribe("My-Spotify-ChatRoom");
    channel.bind("my-event", function(data) {
      alert(data.message);
    });

    channel.bind("message", data => {
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

    // axios.post('https://aa297dce.ngrok.io/message', {
    //   username: this.state.username,
    //   message: text
    // })
    //  .then((response) => {
    //   const {username, message} = response.data;
    //   //  console.log(username);
    //   //  console.log(message);
    //    console.log(response.data)
    //   });
  }

  render() {
    const chats = this.state.chats.map((chat, index) => (
      <li style={{ listStyleType: "none" }} key={chat.id}>
        <p>{chat.username}</p>
        <div> {chat.message} </div>
      </li>
    ));

    return (
      <div>
        <p> Chats here </p>
        <div className="container">
          <div>
            <ul> {chats} </ul>
          </div>
          <div>
            <ChatMessage addMessage={this.handleTextChange.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
