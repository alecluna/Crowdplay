import React, { useState, useEffect } from "react";
import PlaylistSearch from "../Playlist/PlaylistSearch";
import MessagePane from "./MessagePane";
import InputBar from "./InputBar";
import { DialogActions, Button, DialogTitle } from "@material-ui/core";
import { StyledDialog, StyledDialogContent } from "./styles";

const Messenger = ({
  accessToken,
  userID,
  classes,
  theme,
  messages,
  thumbsCounter,
  thumbsUp,
  thumbsDown,
  addMessageorSong,
  handleSubmitNewMessage,
}) => {
  const [playlistSearch, togglePlaylistSearch] = useState(false);

  const toggleSearch = () => togglePlaylistSearch(!playlistSearch);

  useEffect(() => console.log("playlistSearch", playlistSearch), [
    playlistSearch,
  ]);
  return (
    <React.Fragment>
      <div style={{ overflowY: "scroll" }}>
        <StyledDialog open={playlistSearch}>
          <DialogTitle>Choose a Song </DialogTitle>
          <StyledDialogContent>
            <PlaylistSearch
              accessToken={accessToken}
              userID={userID}
              addMessageorSong={addMessageorSong}
            />
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={() => toggleSearch()} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </StyledDialog>

        <MessagePane
          classes={classes}
          theme={theme}
          messages={messages}
          thumbsUp={thumbsUp}
          thumbsDown={thumbsDown}
          thumbsCounter={thumbsCounter}
        />
      </div>
      <InputBar
        toggleSearch={toggleSearch}
        handleSubmitNewMessage={handleSubmitNewMessage}
      />
    </React.Fragment>
  );
};

export default Messenger;
