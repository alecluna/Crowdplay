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
} from "@material-ui/core";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import Link from "react-router-dom/Link";
import cplogo from "../../../assets/crowdplaylogo.png";
import firebase, { firestore } from "firebase";
import Avatar from "../../Reusable/Avatar";
import Messenger from "../../Messenger";
import sortSongsAdded from "../../../utils/sortSongsAdded";

const drawerWidth = 250;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: "5px",
    marginBottom: "calc(5vh + 58px)",
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#1db954",
  },
});

class ChatRoom extends React.Component {
  state = {
    mobileOpen: false,
    messages: {},
    users: {},
    joinedRoomNames: [],
    songURI: "",
    songImage: "",
    artist: "",
    songName: "",
    spotifyPlaylistID: "",
    thumbsCounter: 0,
    isMessageorSong: "message",
    isSearch: false,
  };

  componentDidMount = () => {
    const { roomId } = this.props.match.params;
    const { userID } = this.props.location.state;

    //ref for room's playlist ID
    this.roomRef = firebase.firestore().collection("rooms").doc(roomId);

    this.retreivePlaylistID = this.retreivePlaylistID.bind(this);
    this.retreivePlaylistID();

    //ref for room's messages
    this.messageFirestoreRef = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages");

    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();

    //ref for room's joined users
    this.usersFirestoreRef = firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("joinedRooms");

    this.listenUsers = this.listenUsers.bind(this);
    this.listenUsers();
  };

  retreivePlaylistID = () => {
    this.roomRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ spotifyPlaylistID: doc.data().spotifyPlaylistID });
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  listenMessages = () => {
    this.messageFirestoreRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messagesFromSnapShot = snapshot.docs.map((message) => {
          let tempObj = { id: message.id };
          let mergedObj = Object.assign(message.data(), tempObj);
          return mergedObj;
        });

        this.setState({ messages: messagesFromSnapShot });
      });
  };

  listenUsers = () => {
    //grabbing from parent component when playlist was built
    const { roomId } = this.props.match.params;
    const { name } = this.props.location.state;

    //if roomId is the same as the document's roomname, add user
    this.usersFirestoreRef
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let listofNames = [];
        snapshot.docs.forEach((doc) => {
          if (roomId.trim() === doc.data().roomName.trim()) {
            listofNames.push(name);
          }
        });
        this.setState({
          joinedRoomNames: [...this.state.joinedRoomNames, ...listofNames],
        });
      });
  };

  handleSubmitNewMessage = async (
    songName,
    songImage,
    artist,
    songURI,
    isMessage,
    submittedMessage
  ) => {
    const { name, userID } = this.props.location.state;
    let messageInfo;

    if (isMessage && submittedMessage) {
      messageInfo = {
        text: submittedMessage,
        photoURL: null,
        songArtist: null,
        userID: userID,
        name: name,
        timestamp: firestore.Timestamp.now(),
        likeCount: 0,
        songURI: null,
      };
    } else {
      messageInfo = {
        text: songName,
        photoURL: songImage,
        songArtist: artist,
        userID: userID,
        name: name,
        timestamp: firestore.Timestamp.now(),
        likeCount: 0,
        songURI: songURI,
      };
    }

    await this.messageFirestoreRef.add(messageInfo);
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };

  addSong = (songURI, songImage, artist, songName) => {
    this.setState(
      {
        songURI: songURI,
        songImage: songImage,
        artist: artist,
        songName: songName,
      },
      () => {
        this.handleSubmitNewMessage(
          this.state.songName,
          this.state.songImage,
          this.state.artist,
          this.state.songURI
        );
        this.addtoSpotify();
      }
    );
  };

  addtoSpotify = () => {
    const { spotifyPlaylistID, songURI } = this.state;
    const { accessToken } = this.props.location.state;

    //for some reason axios.post returns a 401 error, while fetch does not
    fetch(
      `https://api.spotify.com/v1/playlists/${spotifyPlaylistID}/tracks?uris=${songURI}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  thumbsUp = (id) => {
    const increment = firebase.firestore.FieldValue.increment(1);
    this.messageFirestoreRef.doc(id).update({ likeCount: increment });
  };

  thumbsDown = (id) => {
    const increment = firebase.firestore.FieldValue.increment(-1);
    this.messageFirestoreRef.doc(id).update({ likeCount: increment });
  };

  toggleMessageState = () => {
    const { isSearch } = this.state;

    if (isSearch) this.setState({ isMessageorSong: "song" });

    if (!isSearch) this.setState({ isMessageorSong: "message" });
  };

  toggleSearch = () => {
    const { isSearch } = this.state;
    this.setState({ isSearch: !isSearch }, () => this.toggleMessageState());
  };

  render() {
    const { accessToken, userID } = this.props.location.state;
    const { classes, theme } = this.props;
    const {
      messages,
      joinedRoomNames,
      thumbsCounter,
      isMessageorSong,
      isSearch,
    } = this.state;

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
                <Avatar>{text.charAt(0).toUpperCase()}</Avatar>
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
        <List>{sortSongsAdded(messages).sort((a, b) => a - b)}</List>
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
                    paddingRight: "20px",
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
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Messenger
            accessToken={accessToken}
            userID={userID}
            classes={classes}
            theme={theme}
            messages={messages}
            thumbsCounter={thumbsCounter}
            thumbsUp={this.thumbsUp}
            thumbsDown={this.thumbsDown}
            handleSubmitNewMessage={this.handleSubmitNewMessage}
            addSong={this.addSong}
            isMessageorSong={isMessageorSong}
            toggleSearch={this.toggleSearch}
            isSearch={isSearch}
          />
        </main>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(ChatRoom);
