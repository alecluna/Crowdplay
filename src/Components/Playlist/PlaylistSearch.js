import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", music: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleMusicSearch = value => {
    const { accessToken } = this.props;

    let newQuery = value;
    const request = new Request(
      `https://api.spotify.com/v1/search?q=${newQuery}&type=track`,
      {
        headers: new Headers({
          Authorization: "Bearer " + accessToken,
          Accept: "application/json"
        })
      }
    );

    fetch(request)
      .then(res => {
        if (res.statusText === "Unauthorized") {
          window.location.href = "./";
        }
        return res.json();
      })
      .then(res => {
        res.items = res.tracks.items.map(item => {
          return {
            track: item
          };
        });
      });
  };

  handleChange = e => {
    e.preventDefault();
    let value = e.target.value;
    this.setState({ query: value });
    this.handleMusicSearch(value);
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <TextField
            style={{ width: "100%" }}
            placeholder="Playlist"
            onChange={this.handleChange}
          />
        </React.Fragment>
      </div>
    );
  }
}
