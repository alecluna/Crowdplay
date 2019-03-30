import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";

const styles = {
  button: {
    margin: 15
  }
};

export default class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", data: {}, inputCleared: false };
  }

  submit = e => {
    const { accessToken } = this.props;
    e.preventDefault();
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response.items });
      });
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <TextField
            label="Playlist"
            onSubmit={() => this.submit(this)}
            defaultValue="Search"
          />
        </React.Fragment>
        <br />

        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={this.submit}
          style={styles.button}
        >
          Continue
        </Button>
      </div>
    );
  }
}
