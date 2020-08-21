import React, { useRef, useEffect } from "react";
import { ListItem } from "@material-ui/core";
import ThumbsUpDown from "../ThumbsUpDown";
import Avatar from "../../Reusable/Avatar";
import Paper from "../../Reusable/Paper";
import Typography from "../../Reusable/Typography";
import { StyledMessageList, StyledMessagePaperFlex } from "./styles";

const MessagePane = ({ messages, thumbsUp, thumbsDown }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({
        block: "end",
      });
  };

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <div>
      {Object.entries(messages).map(([key, value]) => {
        const { text, name, photoURL, songArtist, likeCount, id } = value;
        return (
          <StyledMessageList key={key}>
            <ListItem ref={messagesEndRef}>
              <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
              <Paper elevation={5}>
                <Typography>{name} added:</Typography>
                <StyledMessagePaperFlex>
                  <img
                    src={photoURL}
                    alt="album art"
                    style={{ borderRadius: "10px" }}
                  />
                  <Typography
                    style={{
                      paddingLeft: "10px",
                      fontWeight: "300",
                      color: "light-grey",
                    }}
                    component={"span"}
                  >
                    {text} by {songArtist}
                    <ThumbsUpDown
                      thumbsUp={thumbsUp}
                      thumbsDown={thumbsDown}
                      likeCount={likeCount}
                      key={key}
                      id={id}
                    />
                  </Typography>
                </StyledMessagePaperFlex>
              </Paper>
            </ListItem>
          </StyledMessageList>
        );
      })}
    </div>
  );
};

export default MessagePane;
