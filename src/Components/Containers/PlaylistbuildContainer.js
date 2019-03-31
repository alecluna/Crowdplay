import React, { Component } from "react";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import withRouter from "../../../node_modules/react-router-dom/withRouter";
import Header from "../Utils/Header";
import ListUserPlaylists from "../Playlist/ListUserPlaylists";
import { Spring, config } from "react-spring/renderprops";

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row"
  }
};

class PlaylistbuildContainer extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  componentDidMount = () => {
    const { accessToken } = this.props.location.state;

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ items: response.items });
      });
  };

  render() {
    const { items } = this.state;
    return (
      <div
        style={{
          height: "100vh"
        }}
      >
        <Header />
        <Spring
          config={config.wobbly}
          from={{ opacity: 0, transform: "translate3d(0,-90px,0)" }}
          to={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
        >
          {props => (
            <div style={props}>
              <Typography
                variant="display2"
                align="center"
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  color: "black",
                  fontWeight: "200"
                }}
              >
                Your Playlists:
              </Typography>
            </div>
          )}
        </Spring>
        <div style={styles.background}>
          <ListUserPlaylists items={items} />
        </div>
      </div>
    );
  }
}

export default withRouter(PlaylistbuildContainer);
