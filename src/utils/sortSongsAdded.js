import React from "react";
import { ListItem, Typography } from "@material-ui/core";

const sortSongsAdded = (messages) =>
  Object.entries(messages).map(([key, value]) => {
    const { text, songArtist, songURI } = value;

    return songArtist && songURI ? (
      <ListItem button key={key}>
        <Typography align="left">
          {text} - {songArtist}
        </Typography>
      </ListItem>
    ) : null;
  });

export default sortSongsAdded;
