import React, { Component } from "react";
import TextField from "../../../node_modules/@material-ui/core/TextField";
import Button from "../../../node_modules/@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Header from "../Utils/Header";
import Link from "../../../node_modules/react-router-dom/Link";
import { Spring } from "react-spring/renderprops";

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
  },
  textFieldStyles: {
    width: 300,
    marginBottom: "4%",
    backgroundColor: "white",
    borderRadius: "20px"
  }
};

export default class PlaylistNameForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <Header />
        <div style={styles.background}>
          <Spring
            from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
                <Typography
                  align="center"
                  variant="display2"
                  style={{ color: "black", fontWeight: "200", margin: "15px" }}
                >
                  Name Your Playlist:
                </Typography>
              </div>
            )}
          </Spring>
          <Spring
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}>
                <React.Fragment>
                  <TextField
                    label="Playlist"
                    onChange={handleChange("playlist")}
                    style={styles.textFieldStyles}
                  />
                </React.Fragment>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Link to="/home" style={{ textDecoration: "none" }}>
                    <Button
                      type="submit"
                      style={{
                        color: "white",
                        margin: "5px",
                        borderRadius: "20px",
                        maxWidth: "200px",
                        background: "#1db954"
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
                      borderRadius: "20px",
                      maxWidth: "200px",
                      background: "#1db954"
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </Spring>
        </div>
      </div>
    );
  }
}
