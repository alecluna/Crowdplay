import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", data: {}, inputCleared: false };
  }

  handleMusicSearch = (firstQuery = "Goodie Bag") => {
    const { accessToken } = this.props;
    const { query: updatedQuery } = this.state;

    let query = updatedQuery || firstQuery;
    console.log(query);

    fetch(`https://api.spotify.com/v1/search`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        q: query,
        type: "track"
      }
    })
      .then(response => {
        response.json();
      })
      .then(response => console.log(response));
  };

  handleChange = e => {
    e.preventDefault();

    this.setState({ query: e.target.value });
    this.handleMusicSearch();
  };

  render() {
    return (
      <div>
        <form>
          <TextField
            placeholder="Playlist"
            onChange={this.handleChange.bind(this)}
          />
          <Button label="Submit" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
