import React, { Component } from "react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import Button from "../../../node_modules/@material-ui/core/Button";

const styles = {
  button: {
    margin: 15
  }
};

export default class PlaylistNameForm extends Component {
  continue = e => {
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
          onClick={this.continue}
          style={styles.button}
        >
          Continue
        </Button>
      </div>
    );
  }
}
