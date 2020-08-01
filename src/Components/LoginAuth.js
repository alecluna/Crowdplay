import React, { Component } from "react";
import queryString from "query-string";
import Link from "react-router-dom/Link";
import firebase from "firebase";
import { Spring } from "react-spring/renderprops";

import Button from "../Components/Reusable/Button";
import Typography from "../Components/Reusable/Typography";

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
  },
};

class LoginAuth extends Component {
  constructor() {
    super();
    this.state = { name: "", accessToken: "", userID: "", photoURL: [] };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    this.getSpotifyData(accessToken)
      .then((data) => {
        if (data) {
          if (data.images && data.images.length) {
            this.setState({
              photoURL: data.images[0].url,
            });
          }
          this.setState({
            name: data.display_name,
            accessToken: accessToken,
            userID: data.id,
          });
        }
      })
      .then(() => {
        let firestore = firebase.firestore();
        firebase
          .firestore()
          .collection("users")
          .doc(this.state.userID)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              //this should occur in account creation. probably in backend
              firestore.collection("users").doc(this.state.userID).set({
                name: this.state.name,
                userID: this.state.userID,
                photoURL: this.state.photoURL,
              });
            }
          });
      })
      .catch((error) => console.log("error: ", error));
  }

  async getSpotifyData(accessToken) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  }

  render() {
    const { name, accessToken, userID, photoURL } = this.state;
    return (
      <div style={styles.background}>
        {name ? (
          <div style={{ width: "75%" }}>
            <Typography
              style={{
                justifyContent: "center",
                fontWeight: "200",
                textAlign: "center",
              }}
              variant="h4"
            >
              Welcome {name}!
            </Typography>

            <Spring
              from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
              to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
            >
              {(props) => (
                <div style={props}>
                  <div
                    style={{
                      marginTop: "50px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button variant="contained">
                      <Link
                        style={{ textDecoration: "none " }}
                        to={{
                          pathname: "/createsession",
                          state: {
                            name: name,
                            accessToken: accessToken,
                            userID: userID,
                            photoURL: photoURL,
                          },
                        }}
                      >
                        <Typography style={{ color: "white" }}>
                          Create a Session
                        </Typography>
                      </Link>
                    </Button>

                    <Button variant="contained">
                      <Link
                        style={{ textDecoration: "none " }}
                        to={{
                          pathname: "/joinusers",
                          state: {
                            name: name,
                            accessToken: accessToken,
                            userID: userID,
                            photoURL: photoURL,
                          },
                        }}
                      >
                        <Typography style={{ color: "white" }}>
                          View your Sessions
                        </Typography>
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </Spring>
          </div>
        ) : (
          <Spring
            from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
            to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          >
            {(props) => (
              <div style={props}>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.location = window.location.href.includes("localhost")
                      ? "http://localhost:8888/login"
                      : "https://crowdplay-music-backend.herokuapp.com/login"; //prod URL here
                  }}
                >
                  <Typography
                    style={{
                      color: "white",
                      width: "10rem",
                      fontSize: "2em",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Typography>
                </Button>
              </div>
            )}
          </Spring>
        )}
      </div>
    );
  }
}

export default LoginAuth;
