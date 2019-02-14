import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Header from "./Utils/Header";
import Paper from "../../node_modules/@material-ui/core/Paper";
import firebase from 'firebase';
import { Button } from "@material-ui/core";

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
      text: "",
      searchRoomKeyWords: "",
      roomNotFound: false
    }
    this.roomsRef = firebase.database().ref().child("RoomNames");

  }

  componentDidMount() {
  }



  handleSearchForRoom(event) {
    if (this.state.searchRoomKeyWords && this.state.searchRoomKeyWords.trim()) {
      this.roomsRef.child(this.state.searchRoomKeyWords)
        .once('value')
        .then(snapshot => {
          let roomId = snapshot.val();
          console.log(roomId)
          if (roomId) {
            //route and set roomId
            this.setState({ roomNotFound: false });
            this.props.history.push(`/room/${roomId}`);
          } else {
            this.setState({ roomNotFound: true });
          }
        }).catch(err => {
          console.log(err)
        })
    }
    event.preventDefault();
  }

  changeSearchText(e) {
    this.setState({ searchRoomKeyWords: e.target.value })
  }

  showIfRoomNotFound() { if (this.state.roomNotFound) return <div>Room Not Found</div> }
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

            {this.showIfRoomNotFound()}
            <form onSubmit={this.handleSearchForRoom.bind(this)}>
              <input
                type="text"
                onChange={this.changeSearchText.bind(this)}
                value={this.state.searchRoomKeyWords}
              />
              <Button type="submit">Send</Button>
            </form>
          </Paper>
        </div>
      </div>)
  }
}

export default JoinUsers;
