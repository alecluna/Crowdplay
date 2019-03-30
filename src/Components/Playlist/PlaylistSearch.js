import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", data: {}, inputCleared: false };
  }

  handleMusicSearch = () => {
    const { accessToken } = this.props;
    const { query } = this.state;

    console.log(query);

    fetch(`https://api.spotify.com/v1/search?q=${query}type=track`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json();
      })
      .catch(console.log(console.error()));
  };

  handleChange = e => {
    e.preventDefault();

    this.setState({ query: e.target.value });
    this.handleMusicSearch();
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <TextField
            placeholder="Playlist"
            onChange={this.handleChange.bind(this)}
          />
        </React.Fragment>
        <br />
      </div>
    );
  }
}
