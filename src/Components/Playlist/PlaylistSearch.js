import React, { Component } from "react";
import { TextField } from "@material-ui/core";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", music: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleMusicSearch = (firstQuery = "Goodie Bag") => {
    const { accessToken } = this.props;
    const { query: updatedQuery } = this.state;

    let query = updatedQuery || firstQuery;
    console.log(query);

    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
    //   .then(response => {
    //     this.setState({ [music]: response. });
    //   });
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
          <TextField placeholder="Playlist" onChange={this.handleChange} />
        </React.Fragment>
      </div>
    );
  }
}
