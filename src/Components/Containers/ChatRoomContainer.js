import React, { Component } from "react";
import Header from "../Utils/Header";
import Chat from "../ChatRoom/Chat";
import PlaylistSearch from "../Playlist/PlaylistSearch";
import Typography from "../../../node_modules/@material-ui/core/Typography";

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
  constructor(props) {
    super(props);
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { accessToken, userID } = this.props.location.state;
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
        <div style={styles.row}>
          <div style={styles.column /*first column*/}>
            <div style={styles.centerStyling}>
              <div
                style={{
                  boxSizing: "border-box",
                  border: ".5px solid grey",
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
                  <Chat match={match} userID={userID} />
                </div>
              </div>
              <div style={styles.column /*second column*/}>
                <PlaylistSearch
                  accessToken={accessToken}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
