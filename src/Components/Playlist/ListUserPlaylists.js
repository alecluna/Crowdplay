import React from "react";
import { Typography } from "@material-ui/core";
import Card from "../../../node_modules/@material-ui/core/Card";
import Link from "../../../node_modules/@material-ui/core/Link";

// import { Spring } from "react-spring/renderprops";

const ListUserPlaylists = ({ items }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      flexDirection: "row"
    }}
  >
    {/* <Spring
      from={{ opacity: 0, transform: "translate3d(0,90px,0)" }}
      to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
    >
      {props => (
        <div style={props}> */}
    <React.Fragment>
      {items.map(playlistItems => {
        return (
          <Card
            style={{
              width: 275,
              boxShadow: "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.6),",
              margin: "30px"
            }}
            key={playlistItems.id}
          >
            <Link target="_blank" href={playlistItems.external_urls.spotify}>
              <img
                style={{ width: "100%" }}
                alt="mosaic"
                src={
                  playlistItems.images[1].url ||
                  require(`../../assets/placeholder.jpg`)
                }
              />
            </Link>
            <Typography align="center">{playlistItems.name}</Typography>
          </Card>
        );
      })}
    </React.Fragment>
    {/* </div>
      )}
    </Spring> */}
  </div>
);

export default ListUserPlaylists;
