import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Paper from "@material-ui/core/Paper";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paperStyle: {
    height: "60%",
    width: "60%",
    borderRadius: "5px"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  }
};

export default class CreateSessionContainer extends Component {
  render() {
    const { name } = this.props.location.state;
    return (
      <div>
        <Header />
        <div style={styles.background}>
          <Paper style={styles.paperStyle} elevation={11}>
            <div style={styles.centerStyling}>
              <Typography
                variant="display2"
                style={{ color: "black", fontWeight: "200" }}
              >
                Create a Session as Host: {name}
              </Typography>
            </div>
            <div style={styles.centerStyling} />
          </Paper>
        </div>
      </div>
    );
  }
}
