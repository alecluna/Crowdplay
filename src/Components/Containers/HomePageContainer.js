import React from "react";
import Paper from "../../../node_modules/@material-ui/core/Paper";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import SpotifyLogo from "../../../src/assets/logo.png";
import LoginAuth from "../../Components/LoginAuth";
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
  }
};

const HomePageContainer = () => (
  <div style={styles.background}>
    <Paper style={styles.paperStyle} elevation={11}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px"
        }}
      >
        <Typography
          variant="display2"
          style={{ color: "black", fontWeight: "200" }}
        >
          CrowdPlay for&nbsp;
        </Typography>
        <img src={SpotifyLogo} style={{ height: "55px" }} alt="Spotify Logo" />
      </div>
      <LoginAuth />
    </Paper>
  </div>
);

export default HomePageContainer;
