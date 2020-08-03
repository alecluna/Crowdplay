import React, { useState } from "react";
import Typography from "../../Reusable/Typography";
import PlaylistNameForm from "./Stepper/Step1/index";
import SessionInfo from "./Stepper/Step2/index";
import Success from "../../Playlist/Success";
import Confirm from "./Stepper/Step3/Confirm";
import firebase, { firestore } from "firebase";

const CreateSession = (props) => {
  const { name, accessToken, userID, photoURL } = props.location.state;

  const [step, setStep] = useState(1);
  const [playlist, setPlaylist] = useState("");
  // const [privatePlaylist, setPrivatePlaylist] = useState("public");
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomExists, setRoomExists] = useState(false);
  const [spotifyPlaylistID, setSpotifyPlaylistID] = useState("");

  const playlistAPI = (
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    roomName,
    roomDescription,
    roomExists,
    photoURL
  ) => {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlist,
        public: "true",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let playlistIDFromPost = data.id;
        setSpotifyPlaylistID(playlistIDFromPost);

        createSessionFirebase(
          playlist,
          privatePlaylist,
          name,
          accessToken,
          userID,
          roomName,
          roomDescription,
          roomExists,
          photoURL,
          playlistIDFromPost
        );
      })
      .catch((error) => console.log(error));
  };

  const createSessionFirebase = (
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    roomName,
    roomDescription,
    roomExists,
    photoURL,
    playlistIDFromPost
  ) => {
    let firestoreRef = firebase.firestore();
    firestoreRef
      .collection("rooms")
      .doc(roomName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRoomExists(true);
        } else {
          //add room to rooms list
          firestoreRef
            .collection("rooms")
            .doc(roomName)
            .set({
              roomName: roomName,
              playListId: Math.floor(Math.random() * 10000000) + 1,
              description: roomDescription,
              createdAt: firestore.Timestamp.now(),
              createdBy: name,
              id: Math.floor(Math.random() * 10000000) + 1,
              spotifyPlaylistID: playlistIDFromPost,
            });
          //add room to user's joinedRoomsList
          firestoreRef
            .collection("users")
            .doc(userID)
            .collection("joinedRooms")
            .add({
              roomName: roomName,
              createdAt: firestore.Timestamp.now(),
            });

          props.history.push({
            pathname: `/room/${roomName}`,
            state: {
              name: name,
              accessToken: accessToken,
              userID: userID,
              photoURL: photoURL,
              spotifyPlaylistID: playlistIDFromPost,
            },
          });
        }
      });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    if (input === "playlist") setPlaylist(e.target.value);

    if (input === "roomName") setRoomName(e.target.value);

    if (input === "roomDescription") setRoomDescription(e.target.value);
  };

  //prop drilling
  const value = {
    playlist,
    privatePlaylist,
    name,
    accessToken,
    userID,
    photoURL,
    roomName,
    roomDescription,
    roomExists,
    spotifyPlaylistID,
  };

  switch (step) {
    case 1:
      return (
        <PlaylistNameForm
          nextStep={nextStep}
          handleChange={handleChange}
          values={value}
        />
      );

    case 2:
      return (
        <SessionInfo
          nextStep={nextStep}
          prevStep={prevStep}
          playlistAPI={playlistAPI}
          handleChange={handleChange}
          values={value}
        />
      );
    case 3:
      return (
        <Confirm
          nextStep={nextStep}
          prevStep={prevStep}
          playlistAPI={playlistAPI}
          values={value}
          createSessionFirebase={createSessionFirebase}
        />
      );
    case 4:
      return <Success values={value} />;
    default:
      return <Typography> Failed Step </Typography>;
  }
};

export default CreateSession;
