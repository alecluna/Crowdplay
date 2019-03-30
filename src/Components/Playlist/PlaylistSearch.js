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
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <React.Fragment>
          <TextField
            label="Playlist"
            onChange={handleChange("playlist")}
            defaultValue={values.playlist}
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
