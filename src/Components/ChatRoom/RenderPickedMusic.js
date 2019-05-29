import React from "react";
import { Avatar, Typography, List, ListItem, Paper } from "@material-ui/core";
import { Spring } from "react-spring/renderprops";

const RenderPickedMusic = ({ messages, classes }) => {
  console.log(messages);
  const mappedMessages = Object.entries(messages).map(([key, value]) => {
    const { text, name } = value;
    return (
      <List key={key} style={{ position: "relative", zIndex: "0" }}>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <div style={props}>
              <ListItem>
                <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
                <Paper style={{ borderRadius: "10px", padding: "10px" }}>
                  <Typography>
                    {name} added the song: {text}
                  </Typography>
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
