import React from "react";
import thumbs from "../../assets/thumbs-up.svg";
import { Typography } from "@material-ui/core";

const ThumbsUpDown = ({ thumbsUp, thumbsDown, thumbsCounter }) => (
  <div>
    <img
      onClick={thumbsUp}
      style={{ height: 35, padding: 10 }}
      src={thumbs}
      alt="thumbs"
    />
    <img
      onClick={thumbsDown}
      style={{ height: 35, padding: 10, transform: "rotate(180deg)" }}
      src={thumbs}
      alt="thumbs"
    />
    <Typography variant="h6" style={{ color: "green" }}>
      {thumbsCounter}
    </Typography>
  </div>
);

export default ThumbsUpDown;
