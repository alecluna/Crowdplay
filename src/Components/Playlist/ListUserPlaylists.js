import React from "react";
import { Typography } from "@material-ui/core";
import Card from "../../../node_modules/@material-ui/core/Card";

const ListUserPlaylists = ({ items }) => (
  <div>
    <React.Fragment>
      {items.map(playlistItems => {
        return (
          <Card
            style={{
              width: 200,
              boxShadow: "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6),"
            }}
            key={playlistItems.id}
          >
            <img
              style={{ width: "100%" }}
              alt="mosaic"
              src={playlistItems.images[1].url}
            />
            <Typography align="center">{playlistItems.name}</Typography>
          </Card>
        );
      })}
    </React.Fragment>
  </div>
);

export default ListUserPlaylists;
