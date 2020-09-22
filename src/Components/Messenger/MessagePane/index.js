import React, { useRef, useEffect } from "react";
import { ListItem } from "@material-ui/core";
import ThumbsUpDown from "../ThumbsUpDown";
import Avatar from "../../Reusable/Avatar";
import Paper from "../../Reusable/Paper";
import Typography from "../../Reusable/Typography";
import { StyledMessageList, StyledMessagePaperFlex } from "./styles";

const MessagePane = ({ messages, thumbsUp, thumbsDown, isMessageorSong }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({
        block: "end",
      });
  };

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <React.Fragment>
      {Object.entries(messages).map(([key, value]) => {
        const { text, name, photoURL, songArtist, likeCount, id } = value;
        return (
          <StyledMessageList key={key}>
            <ListItem ref={messagesEndRef}>
              <Avatar>{name && name.charAt(0).toUpperCase()}</Avatar>
              <Paper elevation={5}>
                {photoURL && songArtist && (
                  <Typography bold>{name} added:</Typography>
                )}
                <StyledMessagePaperFlex>
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt="album art"
                      style={{ borderRadius: "6px", width: 85, height: 85 }}
                    />
                  ) : null}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography style={{ padding: 10 }}>
                      {songArtist ? `${text} by ${songArtist}` : `${text}`}
                    </Typography>

                    <Typography
                      style={{
                        paddingLeft: "10px",
                        fontWeight: "300",
                        color: "light-grey",
                      }}
                      component={"span"}
                    >
                      {photoURL && songArtist && (
                        <ThumbsUpDown
                          thumbsUp={thumbsUp}
                          thumbsDown={thumbsDown}
                          likeCount={likeCount}
                          key={key}
                          id={id}
                        />
                      )}
                    </Typography>
                  </div>
                </StyledMessagePaperFlex>
              </Paper>
            </ListItem>
          </StyledMessageList>
        );
      })}
    </React.Fragment>
  );
};

export default MessagePane;
