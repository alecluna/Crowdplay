import React, { Component } from "react";
import Paper from "../../../node_modules/@material-ui/core/Paper";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import withRouter from "../../../node_modules/react-router-dom/withRouter";
import Header from "../Utils/Header";
import PlaylistStepper from "../Playlist/PlaylistStepper";

const styles = {
  background: {
    backgroundColor: "#D3D3D3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paperStyle: {
    height: "75%",
    width: "60%",
    borderRadius: "5px"
  },
  centerStyling: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  }
};

class PlaylistbuildContainer extends Component {
  render() {
    const { name, accessToken, userID } = this.props.location.state;

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
                Playlist Builder
              </Typography>
            </div>
            <div style={styles.centerStyling}>
              <PlaylistStepper
                name={name}
                accessToken={accessToken}
                userID={userID}
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(PlaylistbuildContainer);
