import React from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import SpotifyLogo from "../../../src/assets/logo.png";
import LoginAuth from "../../Components/LoginAuth";
import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    background: "white",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

const HomePageContainer = () => (
  <div style={styles.background}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem",
        flexDirection: "row"
      }}
    >
      <Spring
        from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
        to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
      >
        {props => (
          <div style={props}>
            <Typography
              variant="display2"
              style={{ textAlign: "center", color: "black", fontWeight: "200" }}
            >
              CrowdPlay for&nbsp;
            </Typography>
            <img
              src={SpotifyLogo}
              style={{ height: "55px" }}
              alt="Spotify Logo"
            />
          </div>
        )}
      </Spring>
    </div>
    <LoginAuth />
  </div>
);

export default HomePageContainer;
