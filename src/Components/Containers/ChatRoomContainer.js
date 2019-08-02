import React from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import Link from "../../../node_modules/react-router-dom/Link";
import cplogo from "../../assets/crowdplaylogo.png";

import PlaylistSearch from "../Playlist/PlaylistSearch";
import RenderPickedMusic from "../ChatRoom/RenderPickedMusic";
import firebase, { firestore } from "firebase";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: "5px",
    backgroundColor: "white"
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "purple"
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    messages: {},
    users: {},
    joinedRoomNames: [],
    songURI: "",
    songImage: "",
    artist: "",
    songName: "",
    spotifyPlaylistID: ""
  };

  componentDidMount = () => {
    const { roomId } = this.props.match.params;
    const { userID, spotifyPlaylistID } = this.props.location.state;

    console.log("playlist ID in chat room container" + spotifyPlaylistID);
    this.setState({ spotifyPlaylistID: spotifyPlaylistID });

    this.messageFirestoreRef = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages");

    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();

    this.usersFirestoreRef = firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("joinedRooms");

    this.listenUsers = this.listenUsers.bind(this);
    this.listenUsers();
  };

  listenMessages = () => {
    this.messageFirestoreRef
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        let messages = [];
        snapshot.docs.forEach(message => {
          messages.push(message.data());
        });
        this.setState({ messages });
      });
  };

  listenUsers = () => {
    //grabbing from parent component when playlist was built
    const { roomId } = this.props.match.params;
    const { name } = this.props.location.state;

    //if roomId is the same as the document's roomname, add user
    this.usersFirestoreRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
      let listofNames = [];
      snapshot.docs.forEach(doc => {
        if (roomId.trim() === doc.data().roomName.trim()) {
          listofNames.push(name);
        }
      });
      this.setState({ joinedRoomNames: listofNames }, () =>
        console.log(this.state.joinedRoomNames)
      );
    });
  };

  handleSubmitNewMessage = (songName, songImage, artist) => {
    const { name, userID } = this.props.location.state;

    if (songName && songName.trim()) {
      let messageInfo = {
        text: songName,
        photoURL: songImage,
        songArtist: artist,
        userID: userID,
        name: name,
        timestamp: firestore.Timestamp.now()
      };
      this.messageFirestoreRef.add(messageInfo);
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  addSong = (songURI, songImage, artist, songName) => {
    this.setState(
      {
        songURI: songURI,
        songImage: songImage,
        artist: artist,
        songName: songName
      },
      () => {
        this.handleSubmitNewMessage(
          this.state.songName,
          this.state.songImage,
          this.state.artist
        );
        this.addtoSpotify();
      }
    );
  };

  addtoSpotify = () => {
    let { spotifyPlaylistID, songURI } = this.state;
    const { accessToken } = this.props.location.state;

    fetch(
      `https://api.spotify.com/v1/playlists/${spotifyPlaylistID}/tracks?uris=spotify%3Atrack%3A${songURI}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  render() {
    const { accessToken, userID } = this.props.location.state;
    const { classes, theme } = this.props;
    const {
      messages,
      songURI,
      songImage,
      artist,
      songName,
      joinedRoomNames
    } = this.state;
    const music = { songURI, songImage, artist, songName };

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Typography
          align="center"
          variant="h4"
          style={{ fontWeight: "light", marginBottom: "10px" }}
        >
          Joined
        </Typography>
        <Divider />
        {/* Refactor as own component */}
        <List>
          {joinedRoomNames.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{text.charAt(0)}</Avatar>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Typography
          align="center"
          variant="h4"
          style={{ fontWeight: "light", marginBottom: "10px" }}
        >
          Your Songs
        </Typography>
        <Divider />
        {/* Refactor as own component */}
        <List>
          {Object.entries(messages).map(([key, value]) => {
            const { text, songArtist } = value;

            return (
              <ListItem button key={key}>
                <Typography align="left">
                  {text} - {songArtist}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="default"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Toolbar>
              <Link to="/home">
                <img
                  src={cplogo}
                  style={{
                    float: "left",
                    height: "3em",
                    paddingRight: "20px"
                  }}
                  alt="CrowdPlay"
                />
              </Link>
              <Typography variant="h6" color="default">
                {this.props.match.params.roomId}
              </Typography>
            </Toolbar>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <div style={{ marginTop: "80px" }}>
              <PlaylistSearch
                accessToken={accessToken}
                userID={userID}
                addSong={this.addSong}
              />
              <RenderPickedMusic
                classes={classes}
                theme={theme}
                currentSong={music}
                messages={messages}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
