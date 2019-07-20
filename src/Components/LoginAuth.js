import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import queryString from "query-string";
import Link from "react-router-dom/Link";
import firebase from "firebase";
import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    display: "flex",
    justifyContent: "center"
  }
};

class LoginAuth extends Component {
  constructor() {
    super();
    this.state = { name: "", accessToken: "", userID: "", photoURL: [] };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    console.log(window.location);
    let accessToken = parsed.access_token;
    console.log(parsed);
    if (!accessToken) return;
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          if (data.images && data.images.length) {
            this.setState({
              photoURL: data.images[0].url
            });
          }

          this.setState({
            name: data.display_name,
            accessToken: accessToken,
            userID: data.id
          });

          console.log("Welcome! user_ID:  " + this.state.userID);
        } else {
          window.alert("Try logging in again to refresh your token");
        }
      })
      .then(data => {
        let firestore = firebase.firestore();
        firebase
          .firestore()
          .collection("users")
          .doc(this.state.userID)
          .get()
          .then(doc => {
            if (!doc.exists) {
              //this should occur in account creation. probably in backend
              firestore
                .collection("users")
                .doc(this.state.userID)
                .set({
                  name: this.state.name,
                  userID: this.state.userID,
                  photoURL: this.state.photoURL
                });
            }
          });
      });
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
                textAlign: "center"
              }}
              variant="h6"
              color="default"
            >
              Welcome {name}!
            </Typography>

            <Spring
              from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
              to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
            >
              {props => (
                <div style={props}>
                  <div
                    style={{
                      marginTop: "50px",
                      display: "flex",
                      justifyContent: "space-around"
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        margin: "10px",
                        background: "#1db954",
                        borderRadius: "20px"
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none " }}
                        to={{
                          pathname: "/createsession",
                          state: {
                            name: name,
                            accessToken: accessToken,
                            userID: userID,
                            photoURL: photoURL
                          }
                        }}
                      >
                        <Typography style={{ color: "white" }}>
                          Create a Session
                        </Typography>
                      </Link>
                    </Button>

                    <Button
                      variant="contained"
                      style={{
                        margin: "10px",
                        background: "#1db954",
                        borderRadius: "20px"
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none " }}
                        to={{
                          pathname: "/joinusers",
                          state: {
                            name: name,
                            accessToken: accessToken,
                            userID: userID,
                            photoURL: photoURL
                          }
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
            {props => (
              <div style={props}>
                <Button
                  variant="contained"
                  style={{
                    background: "#1db954",
                    borderRadius: "20px"
                  }}
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
                      textAlign: "center"
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
