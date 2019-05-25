import React, { Component } from "react";
import ChatMessage from "./ChatMessage";
import firebase, { firestore } from "firebase";
import Typography from "@material-ui/core/Typography";
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
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    maxHeight: "100vh"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: "1",
    height: "100%"
  },

  centerStyling: {
    backgroundColor: "white"
  },
  listMessageStyleBlue: {
    backgroundColor: "white",
    color: "white",
    padding: "8px 12px",
    marginBottom: "8px",
    borderRadius: "16px",
    marginRight: "8px"
  },
  listMessageStyleGrey: {
    backgroundColor: "#d3d3d3",
    color: "black",
    padding: "8px 12px",
    marginBottom: "8px",
    borderRadius: "16px",
    maxWidth: "40%"
  }
};

const PickedSong = ({ messages, currentSong }) => (
  <div>
    <Typography>{currentSong}</Typography>
  </div>
);
//{
// const mappedMessages = Object.entries(messages).map(([key, value]) => {
//   const { userID, text } = value;
//   return (
//     // <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
//     //   {props => (
//     //     <div style={props}>
//     <li
//       style={{
//         listStyleType: "none",
//         alignSelf: "flex-end"
//       }}
//       key={key}
//     >
//       <Typography style={styles.listMessageStyleBlue}>
//         {currentSong}
//       </Typography>
//     </li>
//     //     </div>
//     //   )}
//     // </Spring>
//   );
// });
//   return <div>{mappedMessages}</div>;
// }

export default PickedSong;
