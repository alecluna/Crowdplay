import React from "react";
import Typography from "@material-ui/core/Typography";
import SpotifyLogo from "../../../assets/logo.png";
import LoginAuth from "../../LoginAuth";
import { withTheme } from "@material-ui/core/styles";
import { StyledHomePageContainer } from "./styles";

const HomePage = (props) => (
  <StyledHomePageContainer>
    <Typography variant="h3" style={{ fontWeight: 300 }}>
      CrowdPlay for&nbsp;
    </Typography>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={SpotifyLogo} style={{ height: "55px" }} alt="Spotify Logo" />
    </div>

    <LoginAuth />
  </StyledHomePageContainer>
);

export default withTheme(HomePage);
