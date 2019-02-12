import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Header";
import Paper from "../../node_modules/@material-ui/core/Paper";

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
      chatId: ""
    }
  }

  componentDidMount() {
    let userId = "userId1";
    // fetch(`https://spotify-crowdplay.firebaseio.com/Users/${userId}.json`)
    //   .then(sessionIds=>sessionIds.json())
    //   .then(sessionIds=> sessionIds.key1)
    //   .then(sessionId=>{
    //     this.setState({sessionId:sessionId});
    //     console.log(sessionId)
    //   })
    fetch(`https://spotify-crowdplay.firebaseio.com/Chats/chatsId.json`).then(resp => resp.json())
      .then(messages => { this.setState({ messages: messages }) });

  }

  render() {
    const { messages } = this.state;
    console.log(messages)
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

            {/* LIST OF MSGS */}
            <p>{messages}</p>

          </Paper>
        </div>
      </div>)
  }
}

export default JoinUsers;
