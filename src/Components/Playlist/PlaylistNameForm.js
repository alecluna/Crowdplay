import React, { Component } from "react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import Button from "../../../node_modules/@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { Spring, config } from "react-spring/renderprops";
import Header from "../Utils/Header";
import Link from "../../../node_modules/react-router-dom/Link";

const styles = {
  background: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
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
        <Header />
        <div style={styles.background}>
          <Spring
            config={config.stiff}
            from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
                <Typography
                  align="center"
                  variant="display2"
                  style={{ fontWeight: "200" }}
                >
                  Name Your Playlist:
                </Typography>
              </div>
            )}
          </Spring>
          <Spring
            config={config.stiff}
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
                <React.Fragment>
                  <TextField
                    label="Playlist"
                    onChange={handleChange("playlist")}
                    defaultValue={values.playlist}
                  />
                </React.Fragment>
                <br />
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <Button
                    type="submit"
                    style={{
                      color: "white",
                      margin: "5px",
                      maxWidth: "200px",
                      background:
                        "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
                    }}
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  type="submit"
                  onClick={this.continue}
                  style={{
                    color: "white",
                    margin: "5px",
                    maxWidth: "200px",
                    background:
                      "linear-gradient(to right bottom, #00e5f9, #56b3ff)"
                  }}
                >
                  Continue
                </Button>
              </div>
            )}
          </Spring>
        </div>
      </div>
    );
  }
}
