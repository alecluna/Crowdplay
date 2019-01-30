import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Paper from "../../../node_modules/@material-ui/core/Paper";
import Header from "../../Components/Header";
import Chat from "../../Components/ChatRoom/Chat";

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
                style={{
                  color: "black",
                  fontWeight: "200",
                  textAlign: "center",
                  fontSize: "1.2em"
                }}
              >
                Create a Session as Host: {name}
              </Typography>
            </div>
            <div style={styles.centerStyling}>
              <Chat />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
