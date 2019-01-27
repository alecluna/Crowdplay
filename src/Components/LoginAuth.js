import React, { Component } from "react";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Button from "../../node_modules/@material-ui/core/Button";
import queryString from "query-string";
import Link from "../../node_modules/react-router-dom/Link";

const styles = {
  background: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "center"
  }
};

class LoginAuth extends Component {
  constructor() {
    super();
    this.state = { name: "", accessToken: "", userID: "" };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(data);
          this.setState({
            name: data.display_name,
            accessToken: accessToken,
            userID: data.id
          });

          console.log("Welcome! user_ID:  " + this.state.userID);
        } else {
          console.log("Failed, perhaps refresh your token");
        }
      });
  }

  render() {
    const { name, accessToken, userID } = this.state;
    console.log(accessToken);
    return (
      <div style={styles.background}>
        {name ? (
          <div style={{ width: "75%" }}>
            <Typography
              style={{
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "200",
                marginTop: "50px",
                textAlign: "center"
              }}
              variant="h6"
            >
              Welcome {name}!
            </Typography>

            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none " }}
                  to={{ pathname: "/createsession", state: { name: name } }}
                >
                  <Typography style={{ color: "white" }}>
                    Create a Session
                  </Typography>
                </Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none " }}
                  to={{ pathname: "/joinusers", state: { name: name } }}
                >
                  <Typography style={{ color: "white" }}>
                    Join a Session
                  </Typography>
                </Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  variant="contained"
                  to={{
                    pathname: "/playlistbuilder",
                    state: {
                      name: name,
                      accessToken: accessToken,
                      userID: userID
                    }
                  }}
                >
                  <Typography style={{ color: "white" }}>
                    Create a Playlist
                  </Typography>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://crowdplay-music-backend.herokuapp.com/callback"; //prod URL goes here
            }}
          >
            <Typography style={{ color: "white" }}>
              Login to your Spotify Account
            </Typography>
          </Button>
        )}
      </div>
    );
  }
}

export default LoginAuth;
