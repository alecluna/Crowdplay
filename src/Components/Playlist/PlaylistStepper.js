import React from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import PlaylistNameForm from "../Playlist/PlaylistNameForm";
import Success from "../Playlist/Success";
import PlaylistPrivacy from "../Playlist/PlaylistPrivacy";
import Confirm from "../Playlist/Confirm";
import CreateSessionContainer from "../Containers/CreateSessionContainer";

export default class PlaylistStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, playlist: "", privatePlaylist: "public" };
  }

  playlistAPI = (playlist, privatePlaylist, name, accessToken, userID) => {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: playlist,
        public: "true"
      })
    })
      .then(response => {
        response.json();
      })
      .catch(console.log(console.error()));
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { name, accessToken, userID, photoURL } = this.props;

    const { step, playlist, privatePlaylist } = this.state;
    const value = {
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID,
      photoURL
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
          <CreateSessionContainer
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            playlistAPI={this.playlistAPI}
            values={value}
            name={name}
            accessToken={accessToken}
            photoURL={photoURL}
            userID={userID}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            playlistAPI={this.playlistAPI}
            values={value}
          />
        );
      case 4:
        return <Success values={value} />;
      default:
        return <Typography> Failed Step </Typography>;
    }
  }
}
