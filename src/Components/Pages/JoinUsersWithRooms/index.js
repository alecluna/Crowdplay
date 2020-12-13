import React, { useState, useEffect } from "react";
import firebase, { firestore } from "firebase";
import JoinedRooms from "./JoinedRooms";
import Button from "../../Reusable/Button";
import Typography from "../../Reusable/Typography";
import {
  StyledRoomsListContainer,
  StyledTextField,
  StyledForm,
} from "./styles";

const JoinUsersWithRooms = (props) => {
  const { name, accessToken, photoURL, userID } = props.location.state;

  const [searchRoomKeyWords, setSearchRoomKeyWords] = useState("");
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [joinedRooms, setJoinedRooms] = useState([]);

  let fireStoreRooms = firebase.firestore().collection("rooms");

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    const { userID } = props.location.state;
    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("joinedRooms")
      .orderBy("createdAt", "desc")
      .limit(6)
      .onSnapshot((snapshot) => {
        let roomNames = snapshot.docs.map((doc) => {
          return doc.data().roomName;
        });

        setJoinedRooms(roomNames);
      });
  };

  const handleSearchForRoom = (e) => {
    if (searchRoomKeyWords && searchRoomKeyWords.trim()) {
      fireStoreRooms
        .doc(searchRoomKeyWords)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setRoomNotFound(false);
            props.history.push({
              pathname: `/room/${searchRoomKeyWords}`,
              state: {
                name: name,
                accessToken: accessToken,
                userID: userID,
                photoURL: photoURL,
              },
            });
            firebase
              .firestore()
              .collection("users")
              .doc(userID)
              .collection("joinedRooms")
              .add({
                roomName: searchRoomKeyWords,
                createdAt: firestore.Timestamp.now(),
              });
          } else {
            setRoomNotFound(true);
          }
        });
    }

    e.preventDefault();
  };

  const changeSearchText = (e) => {
    setSearchRoomKeyWords(e.target.value);
  };

  const deleteChatRoom = (nameofRoom) => {
    console.log(nameofRoom);

    const callableReturnMessage = firebase
      .functions()
      .httpsCallable("helloWorld");

    callableReturnMessage()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
      });

    return callableReturnMessage;
  };

  const joinedRoomsMapped = joinedRooms.map((roomName, idx) => {
    return (
      <li style={{ listStyleType: "none" }} key={roomName + idx}>
        <JoinedRooms
          roomName={roomName}
          name={name}
          accessToken={accessToken}
          userID={userID}
          photoURL={photoURL}
          deleteChatRoom={deleteChatRoom}
        />
      </li>
    );
  });

  return (
    <React.Fragment>
      <StyledRoomsListContainer>
        <Typography variant="h4">My Sessions</Typography>

        {roomNotFound && (
          <Typography align="center" color="error" variant="h4">
            Sorry, Room Not Found!
          </Typography>
        )}

        <StyledForm onSubmit={(e) => handleSearchForRoom(e)}>
          <StyledTextField
            placeholder="Search for a room"
            type="text"
            fullWidth
            onChange={(e) => changeSearchText(e)}
            value={searchRoomKeyWords}
          />
          <Button type="submit">Search</Button>
        </StyledForm>

        <Typography align="center" variant="h6">
          Previously Joined Sessions
        </Typography>
        <React.Fragment>{joinedRoomsMapped}</React.Fragment>
      </StyledRoomsListContainer>
    </React.Fragment>
  );
};

export default JoinUsersWithRooms;
