import React from "react";
import { Avatar, Typography, List, ListItem, Paper } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";

const RenderPickedMusic = ({ messages, classes }) => {
  const mappedMessages = Object.entries(messages).map(([key, value]) => {
    const { text, name, photoURL, songArtist } = value;
    return (
      <List key={key} style={{ position: "relative", zIndex: "0" }}>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <ListItem>
                <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
                <Paper
                  style={{
                    borderRadius: "0 10px 10px 10px",
                    padding: "10px"
                  }}
                >
                  <p
                    style={{
                      fontWeight: "500",
                      fontFamily: "Khula",
                      color: "black"
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
                      style={{ paddingLeft: "10px", fontWeight: "300" }}
                    >
                      {text} by {songArtist}
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
