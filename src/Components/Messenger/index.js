import React from "react";
import PlaylistSearch from "../Playlist/PlaylistSearch";
import MessagePane from "./MessagePane";
import InputBar from "./InputBar";
import { DialogActions, Button, DialogTitle, Hidden } from "@material-ui/core";
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
  addSong,
  isMessageorSong,
  handleSubmitNewMessage,
  toggleSearch,
  isSearch,
  name,
}) => {
  return (
    <React.Fragment>
      <div
        style={{
          overflowY: "scroll",
          overFlowX: "hidden",
          paddingRight: "5px",
          scrollbarWidth: "none",
        }}
      >
        <StyledDialog open={isSearch}>
          <DialogTitle>Choose a Song </DialogTitle>
          <StyledDialogContent>
            <PlaylistSearch
              accessToken={accessToken}
              userID={userID}
              addSong={addSong}
              isMessageorSong={isMessageorSong}
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
          isMessageorSong={isMessageorSong}
          name={name}
          userID={userID}
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
