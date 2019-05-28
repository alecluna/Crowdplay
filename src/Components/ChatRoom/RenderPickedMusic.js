import React from "react";
import { Avatar, Typography, List, ListItem, Paper } from "@material-ui/core";
// import { Spring } from "react-spring/renderprops";

const styles = {
  background: {
    backgroundColor: "#D3D3D3"
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
    marginTop: "15px"
  },
  listMessageStyleBlue: {
    backgroundColor: "white",
    padding: "8px 12px",
    marginBottom: "8px",
    borderRadius: "10px",
    marginRight: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.23)"
  }
};

const RenderPickedMusic = ({ messages, classes }) => {
  console.log(messages);
  const mappedMessages = Object.entries(messages).map(([key, value]) => {
    const { text, name } = value;
    return (
      // <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      //   {props => (
      //     <div style={props}>
      <List key={key}>
        <ListItem>
          <Paper style={{ borderRadius: "20px" }}>
            <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
            <Typography>
              {name} added the song: {text}
            </Typography>
          </Paper>
        </ListItem>
      </List>
      //     </div>
      //   )}
      // </Spring>
    );
  });
  return <div>{mappedMessages}</div>;
};

export default RenderPickedMusic;
