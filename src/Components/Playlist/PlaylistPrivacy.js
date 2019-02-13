import React, { Component } from "react";
import Button from "../../../node_modules/@material-ui/core/Button";
import FormControl from "../../../node_modules/@material-ui/core/FormControl";
import InputLabel from "../../../node_modules/@material-ui/core/InputLabel";
import MenuItem from "../../../node_modules/@material-ui/core/MenuItem";
import Select from "../../../node_modules/@material-ui/core/Select";

const styles = {
  button: {
    margin: 15
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  }
};

export default class PlaylistPrivacy extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div style={styles.centerStyling}>
        <React.Fragment>
          <FormControl style={{ width: "50%" }}>
            <InputLabel>Privacy</InputLabel>
            <Select
              defaultValue={values.privacy}
              onChange={handleChange("privatePlaylist")}
              value={values.privatePlaylist}
            >
              <MenuItem value="public">Make Public </MenuItem>
              <MenuItem value="private">Make Private </MenuItem>
              <MenuItem value="collaborative"> Make Collaborative</MenuItem>
            </Select>
          </FormControl>
        </React.Fragment>
        <div style={styles.centerStyling}>
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
            onClick={this.continue}
            style={styles.button}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }
}
