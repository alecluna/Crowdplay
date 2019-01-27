import React, { Component } from "react";
import Button from "../../node_modules/@material-ui/core/Button";
import Typography from "../../node_modules/@material-ui/core/Typography";
import List from "../../node_modules/@material-ui/core/List";
import ListItem from "../../node_modules/@material-ui/core/ListItem";

const styles = {
  button: {
    margin: 15
  }
};

export default class Confirm extends Component {
  confirm = (playlist, privatePlaylist, name, accessToken, userID, e) => {
    e.preventDefault();

    console.log("Playlist name in confirm   " + playlist);
    console.log("Playlist privacy   " + privatePlaylist);

    this.props.playlistAPI(
      playlist,
      privatePlaylist,
      name,
      accessToken,
      userID
    );
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  private = privatePlaylist => {
    if (privatePlaylist === "public") return "public";
    else if (privatePlaylist === "private") return "private";
    else return "collaborative";
  };

  render() {
    const {
      values: { playlist, privatePlaylist, name, accessToken, userID }
    } = this.props;
    return (
      <div>
        <Typography style={{ fontSize: "1.5em" }}>Confirm</Typography>
        <React.Fragment>
          <List>
            <ListItem>
              <Typography>Playlist Name: {playlist} </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Playlist Privacy: {this.private(privatePlaylist)}
              </Typography>
            </ListItem>
          </List>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={this.back}
            style={styles.button}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={this.confirm.bind(
              this,
              playlist,
              privatePlaylist,
              name,
              accessToken,
              userID
            )}
            style={styles.button}
          >
            Confirm
          </Button>
        </React.Fragment>
      </div>
    );
  }
}
