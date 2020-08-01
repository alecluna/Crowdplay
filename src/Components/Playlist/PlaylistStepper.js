import React from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import PlaylistNameForm from "../Playlist/PlaylistNameForm";
import Success from "../Playlist/Success";
import Confirm from "../Playlist/Confirm";
import CreateSession from "../Pages/CreateSession";
import firebase, { firestore } from "firebase";

export default class PlaylistStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      playlist: "",
      privatePlaylist: "public",
      roomName: "",
      roomDescription: "",
      roomExists: false,
      photoURL: "",
      spotifyPlaylistID: "",
    };
  }

  playlistAPI = (
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    roomName,
    roomDescription,
    roomExists,
    photoURL
  ) => {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlist,
        public: "true",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let playlistIDFromPost = data.id;
        this.setState({ spotifyPlaylistID: playlistIDFromPost }, () => {
          this.createSessionFirebase(
            playlist,
            privatePlaylist,
            name,
            accessToken,
            userID,
            roomName,
            roomDescription,
            roomExists,
            photoURL,
            playlistIDFromPost
          );
        });
      })
      .catch((error) => console.log(error));
  };

  createSessionFirebase = (
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    roomName,
    roomDescription,
    roomExists,
    photoURL,
    playlistIDFromPost
  ) => {
    let firestoreRef = firebase.firestore();
    firestoreRef
      .collection("rooms")
      .doc(roomName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ roomExists: true });
        } else {
          //add room to rooms list
          firestoreRef
            .collection("rooms")
            .doc(roomName)
            .set({
              roomName: roomName,
              playListId: Math.floor(Math.random() * 10000000) + 1,
              description: roomDescription,
              createdAt: firestore.Timestamp.now(),
              createdBy: name,
              id: Math.floor(Math.random() * 10000000) + 1,
              spotifyPlaylistID: playlistIDFromPost,
            });
          //add room to user's joinedRoomsList
          firestoreRef
            .collection("users")
            .doc(userID)
            .collection("joinedRooms")
            .add({
              roomName: roomName,
              createdAt: firestore.Timestamp.now(),
            });

          this.props.history.push({
            pathname: `/room/${roomName}`,
            state: {
              name: name,
              accessToken: accessToken,
              userID: userID,
              photoURL: photoURL,
              spotifyPlaylistID: playlistIDFromPost,
            },
          });
        }
      });
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { name, accessToken, userID, photoURL } = this.props.location.state;

    const {
      step,
      playlist,
      privatePlaylist,
      roomName,
      roomDescription,
      roomExists,
      spotifyPlaylistID,
    } = this.state;

    //prop drilling
    const value = {
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID,
      photoURL,
      roomName,
      roomDescription,
      roomExists,
      spotifyPlaylistID,
    };

    switch (step) {
      case 1:
        return (
          <PlaylistNameForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={value}
          />
        );

      case 2:
        return (
          <CreateSession
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            playlistAPI={this.playlistAPI}
            handleChange={this.handleChange}
            values={value}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            playlistAPI={this.playlistAPI}
            values={value}
            createSessionFirebase={this.createSessionFirebase}
          />
        );
      case 4:
        return <Success values={value} />;
      default:
        return <Typography> Failed Step </Typography>;
    }
  }
}
