import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Link from "../../../node_modules/react-router-dom/Link";
import cplogo from "../../assets/crowdplaylogo.png";

import PlaylistSearch from "../Playlist/PlaylistSearch";

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
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { accessToken, userID, name, photoURL } = this.props.location.state;
    const { match } = this.props;
    const { classes, theme } = this.props;

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
              color="inherit"
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
              <Typography variant="h6" color="inherit">
                Crowdplay
              </Typography>
            </Toolbar>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              <PlaylistSearch accessToken={accessToken} userID={userID} />
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
