import React from "react";
import thumbs from "../../assets/thumbs-up.svg";
import { Typography } from "@material-ui/core";

const ThumbsUpDown = ({ thumbsUp, thumbsDown, likeCount }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      flexWrap: "no-wrap",
      margin: "5px"
    }}
  >
    <img
      onClick={thumbsUp}
      style={{ height: 25, padding: 5 }}
      src={thumbs}
      alt="thumbs"
    />
    <img
      onClick={thumbsDown}
      style={{ height: 25, padding: 5, transform: "rotate(180deg)" }}
      src={thumbs}
      alt="thumbs"
    />
    <Typography component={"span"} style={{ color: "green", fontSize: 16 }}>
      {likeCount}
    </Typography>
  </div>
);

export default ThumbsUpDown;
