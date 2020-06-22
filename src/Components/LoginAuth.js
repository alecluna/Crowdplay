import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import queryString from "query-string";
import Link from "react-router-dom/Link";
import firebase from "firebase";
import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
  },
};

const LoginAuth = () => {
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userID, setUserID] = useState("");
  const [photoURL, setphotoURL] = useState([]);
  const [error, setError] = useState(false);

  useEffect(async () => {
    // parse new access token from window location
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken) return;

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + accessToken },
      });

      const responseData = await response.json();
      setData({ ...responseData });

      if (data) {
        const { images } = data;
        if (images && images.length > 0) setphotoURL(images[0].url);

        setName(data.display_name);
        setAccessToken(accessToken);
        setUserID(data.id);

        let firestore = firebase.firestore();

        firebase
          .firestore()
          .collection("users")
          .doc(userID)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              //this should occur in account creation. probably in backend
              firestore.collection("users").doc(this.state.userID).set({
                name,
                userID,
                photoURL,
              });
            }
          });
        console.log("Welcome! user_ID:  " + userID);
      }
    } catch (e) {
      console.log("error", e);
      setError(true);
    }
  }, []);

  const getStateObj = () => {
    return {
      name,
      accessToken,
      userID,
      photoURL,
    };
  };
  return (
    <div style={styles.background}>
      {error && <p>error connecting to Spotify</p>}
      {name ? (
        <div style={{ width: "75%" }}>
          <Typography
            style={{
              justifyContent: "center",
              fontWeight: "200",
              textAlign: "center",
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
            {(props) => (
              <div style={props}>
                <div
                  style={{
                    marginTop: "50px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      margin: "10px",
                      background: "#1db954",
                      borderRadius: "20px",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none " }}
                      to={{
                        pathname: "/createsession",
                        state: {
                          ...getStateObj(),
                        },
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
                      borderRadius: "20px",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none " }}
                      to={{
                        pathname: "/joinusers",
                        state: {
                          ...getStateObj(),
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
                style={{
                  background: "#1db954",
                  borderRadius: "20px",
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
};

export default LoginAuth;
