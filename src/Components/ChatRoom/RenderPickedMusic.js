import React from "react";
import { Avatar, Typography, List, ListItem, Paper } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";
import ThumbsUpDown from "./ThumbsUpDown";

const RenderPickedMusic = ({ messages, classes, thumbsUp, thumbsDown }) => {
  const mappedMessages = Object.entries(messages).map(([key, value]) => {
    const { text, name, photoURL, songArtist, songURI, likeCount } = value;
    //let namez = value.snapshot.name();

    //console.log(namez);
    return (
      <List key={key} style={{ position: "relative", zIndex: "0" }}>
        <Spring
          from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
        >
          {props => (
            <div style={props}>
              <ListItem>
                <Avatar
                  style={{
                    backgroundColor: "#1db954"
                  }}
                  className={classes.avatar}
                >
                  {name.charAt(0)}
                </Avatar>
                <Paper
                  style={{
                    borderRadius: "0 10px 10px 10px",
                    padding: "10px"
                  }}
                  elevation={15}
                >
                  <p
                    style={{
                      fontWeight: "500",
                      fontFamily: [
                        "-apple-system",
                        "BlinkMacSystemFont",
                        '"Segoe UI"',
                        "Roboto",
                        '"Helvetica Neue"'
                      ],
                      color: "black",
                      padding: "5px"
                    }}
                  >
                    {name} added:
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "row",
                      alignItems: "center"
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
                        songURI={songURI}
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
  return <div>{mappedMessages}</div>;
};

export default RenderPickedMusic;
