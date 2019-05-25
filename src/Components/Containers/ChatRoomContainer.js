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

const drawerWidth = 240;

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
    padding: theme.spacing.unit * 3
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
    currentSong: "",
    messages: {}
  };

  componentDidMount = () => {
    const { roomId } = this.props.match.params;

    this.messageFirestoreRef = firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("messages");
    this.listenMessages = this.listenMessages.bind(this);
    this.listenMessages();
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

  handleSubmitNewMessage = song => {
    const { name, photoURL, userID } = this.props.location.state;

    if (song && song.trim()) {
      let messageInfo = {
        text: song,
        photoURL: photoURL,
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

  addSong = song => {
    this.setState({ currentSong: song });
    this.handleSubmitNewMessage(song);
  };

  render() {
    const { accessToken, userID } = this.props.location.state;
    const { classes, theme } = this.props;
    const { currentSong, messages } = this.state;
    console.log(messages);

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
          {["Alec Luna", "Dummy Account", "Josh", "whereisalec"].map(
            (text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <Avatar className={classes.avatar}>{text.charAt(0)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
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
          {["Replay", "Passionfruit", "Dang"].map((text, index) => (
            <ListItem button key={index}>
              <Typography align="center"> {text}</Typography>
            </ListItem>
          ))}
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
                currentSong={currentSong}
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
