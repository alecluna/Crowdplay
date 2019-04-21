import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Header from "../Utils/Header";
import { TextField, Button } from "@material-ui/core";
// import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    backgroundColor: "black",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },

  centerStyling: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginTop: "30px"
  },
  textFieldStyles: {
    width: 300,
    marginBottom: "4%",
    backgroundColor: "white",
    borderRadius: "20px"
  }
};

export default class CreateSession extends Component {
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
      <div>
        <Header />

        <div style={styles.background}>
          {/* <Spring
            from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}> */}
          <Typography
            style={{
              color: "white",
              fontWeight: "200",
              textAlign: "center"
            }}
            variant="display2"
          >
            Host a Session:
          </Typography>
          {/* </div>
            )}
          </Spring> */}

          {/* <Spring
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {props => (
              <div style={props}> */}
          <form style={styles.centerStyling}>
            <React.Fragment>
              <TextField
                label="Name"
                onChange={handleChange("roomName")}
                style={styles.textFieldStyles}
                defaultValue={values.roomName}
              />
            </React.Fragment>
            <React.Fragment>
              <TextField
                label="Description"
                onChange={handleChange("roomDescription")}
                style={styles.textFieldStyles}
                defaultValue={values.roomDescription}
              />
            </React.Fragment>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: "30px"
              }}
            >
              <Button
                color="primary"
                onClick={this.back}
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
              <Button
                color="primary"
                onClick={this.continue}
                style={{
                  color: "white",
                  margin: "5px",
                  maxWidth: "200px",
                  background: "#1db954",
                  borderRadius: "20px"
                }}
              >
                Continue
              </Button>
            </div>
          </form>
          {/* </div>
            )}
          </Spring> */}
          {values.roomExists ? (
            <Typography color="error" variant="body1">
              Room Already Exists
            </Typography>
          ) : null}
        </div>
      </div>
    );
  }
}
