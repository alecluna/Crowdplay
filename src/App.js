import React from "react";
import Routes from "./Routes";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
require("dotenv");

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
};
firebase.initializeApp(firebaseConfig);

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

export default App;
