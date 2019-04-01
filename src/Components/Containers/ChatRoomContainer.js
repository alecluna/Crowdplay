import React, { Component } from "react";
import Header from "../Utils/Header";
import Chat from "../ChatRoom/Chat";
import PlaylistSearch from "../Playlist/PlaylistSearch";
import Typography from "../../../node_modules/@material-ui/core/Typography";
import Grid from "../../../node_modules/@material-ui/core/Grid";
import Paper from "../../../node_modules/@material-ui/core/Paper";

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
    backgroundColor: "#0076FF",
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

export default class ChatRoomContainer extends Component {
  render() {
    const { accessToken, userID, name, photoURL } = this.props.location.state;
    const { match } = this.props;

    return (
      <div>
        <Header />
        <div style={styles.titleStyle}>
          <Typography
            variant="display2"
            style={{ color: "black", fontWeight: "200" }}
          >
            Chat Room
          </Typography>
        </div>
        <Grid container>
          <Grid item sm>
            <Paper elevation={3} style={{ padding: "10px", height: "100%" }}>
              <div
                style={{
                  padding: "0 0 0 10px",
                  maxHeight: "70vh",
                  overflow: "scroll"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "8px"
                  }}
                >
                  <Chat
                    match={match}
                    userID={userID}
                    name={name}
                    photoURL={photoURL}
                  />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper elevation={3} style={{ padding: "10px" }}>
              <PlaylistSearch accessToken={accessToken} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
