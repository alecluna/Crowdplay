import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";
import Link from "react-router-dom/Link";
import firebase from "firebase";
import { Spring } from "react-spring/renderprops";
import { signInUser } from "../actions";
import { Store } from "../store";
import Button from "../Components/Reusable/Button";
import Typography from "../Components/Reusable/Typography";

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
  },
};

const LoginAuth = () => {
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userID, setUserID] = useState("");
  const [photoURL, setPhotoURL] = useState([]);

  const { dispatch } = useContext(Store);

  useEffect(() => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    getSpotifyData(accessToken)
      .then((data) => {
        if (data) {
          setName(data.display_name);
          setAccessToken(accessToken);
          setUserID(data.id);

          if (data.images && data.images.length) {
            setPhotoURL(data.images[0].url);
          }

          signInUser(accessToken, dispatch);
        }
      })
      .then(() => {
        let firestore = firebase.firestore();
        firebase
          .firestore()
          .collection("users")
          .doc(userID)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              //this should occur in account creation. probably in backend
              firestore.collection("users").doc(userID).set({
                name: name,
                userID: userID,
                photoURL: photoURL,
              });
            }
          });
      })
      .catch((error) => console.log("error: ", error));
  }, []);

  const getSpotifyData = async (accessToken) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/js on",
      },
    });
    const data = await response.json();

    return data;
  };

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
                        Join a Session
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
};

export default LoginAuth;
