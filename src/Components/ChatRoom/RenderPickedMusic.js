import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";
import ThumbsUpDown from "./ThumbsUpDown";
import Avatar from "../Reusable/Avatar";
import Paper from "../Reusable/Paper";

const RenderPickedMusic = ({ messages, thumbsUp, thumbsDown }) => {
  const mappedMessages = Object.entries(messages).map(([key, value]) => {
    const { text, name, photoURL, songArtist, likeCount, id } = value;
    return (
      <List key={key} style={{ position: "relative", zIndex: "0" }}>
        <Spring
          from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
        >
          {(props) => (
            <div style={props}>
              <ListItem>
                <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
                <Paper elevation={5}>
                  <Typography>{name} added:</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={photoURL}
                      alt="album art"
                      style={{ borderRadius: "10px" }}
                    />
                    <Typography
                      color="textSecondary"
                      style={{ paddingLeft: "10px", fontWeight: "300" }}
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
                  </div>
                </Paper>
              </ListItem>
            </div>
          )}
        </Spring>
      </List>
    );
  });

  return <React.Fragment>{mappedMessages}</React.Fragment>;
};

export default RenderPickedMusic;
