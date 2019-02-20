import React, { Component } from "react";
import Routes from "./Routes";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA0_0t9zhunPshMwxhxeGIIdKBpz8FdFFw",
  authDomain: "spotify-crowdplay.firebaseapp.com",
  databaseURL: "https://spotify-crowdplay.firebaseio.com",
  projectId: "spotify-crowdplay",
  storageBucket: "spotify-crowdplay.appspot.com",
  messagingSenderId: "77255330009"
};
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <Routes />
      </div>
    );
  }
}

export default App;
