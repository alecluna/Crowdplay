import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class ListUserPlaylists extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  componentDidMount = () => {
    const { accessToken } = this.props;

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response.items });
      });
  };

  render() {
    const { items } = this.state;

    console.log(items);
    return (
      <div>
        <Typography align="center" variant="title">
          Your Playlists:
        </Typography>

        <React.Fragment>
          {items.map(playlistItems => {
            return (
              <li key={playlistItems.id}>
                <Typography>{playlistItems.name}</Typography>
              </li>
            );
          })}
        </React.Fragment>
      </div>
    );
  }
}
export default ListUserPlaylists;
