import React, { useRef, useEffect } from "react";
import { ListItem } from "@material-ui/core";
import ThumbsUpDown from "../ThumbsUpDown";
import Avatar from "../../Reusable/Avatar";
import Paper from "../../Reusable/Paper";
import Typography from "../../Reusable/Typography";
import {
  StyledMessageList,
  StyledMessagePaperFlex,
  StyledMessage,
} from "./styles";

const MessagePane = ({
  messages,
  thumbsUp,
  thumbsDown,
  isMessageorSong,
  name,
  userID,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <div id="messages">
      {Object.entries(messages).map(([key, value]) => {
        const {
          text,
          name,
          photoURL,
          songArtist,
          likeCount,
          id,
          userID: userIDfromMessage,
        } = value;

        let isMeorNot = userIDfromMessage === userID;

        return (
          <StyledMessageList key={key}>
            <li
              ref={messagesEndRef}
              style={{
                display: "flex",
                justifyContent:
                  userIDfromMessage === userID ? "flex-end" : "flex-start",
              }}
            >
              {!isMeorNot && (
                <Avatar>{name && name.charAt(0).toUpperCase()}</Avatar>
              )}
              <StyledMessage
                songAdded={photoURL && songArtist}
                isMe={isMeorNot}
              >
                {photoURL && songArtist && (
                  <Typography isMeorNot={isMeorNot} bold>
                    {name} added:
                  </Typography>
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
                    <Typography isMeorNot={isMeorNot} style={{ padding: 5 }}>
                      {songArtist ? `${text} by ${songArtist}` : `${text}`}
                    </Typography>

                    <Typography
                      isMeorNot={isMeorNot}
                      style={{
                        paddingLeft: "5px",
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
              </StyledMessage>
            </li>
          </StyledMessageList>
        );
      })}
    </div>
  );
};

export default MessagePane;
