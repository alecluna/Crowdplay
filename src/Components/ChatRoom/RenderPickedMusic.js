import React from "react";
import { Avatar, Typography } from "@material-ui/core";
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
    borderRadius: "16px",
    marginRight: "8px"
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
      <li
        style={{
          listStyleType: "none",
          alignSelf: "flex-end"
        }}
        key={key}
      >
        <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
        <Typography style={styles.listMessageStyleBlue}>
          {name} added the song: {text}
        </Typography>
      </li>
      //     </div>
      //   )}
      // </Spring>
    );
  });
  return <div>{mappedMessages}</div>;
};

export default RenderPickedMusic;
