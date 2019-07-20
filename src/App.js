import React, { Component } from "react";
import Routes from "./Routes";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
require("dotenv");

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "spotify-crowdplay.firebaseapp.com",
  databaseURL: "https://spotify-crowdplay.firebaseio.com",
  projectId: "spotify-crowdplay",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Gothic+A1"
        />
        <Routes />
      </div>
    );
  }
}

export default App;
