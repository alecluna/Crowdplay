import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import NotFoundPage from "./Components/NotFoundPage";
import PlaylistbuildContainer from "./Components/PlaylistbuildContainer";
import InviteUsers from "./Components/InviteUsers";
import JoinUsers from "./Components/JoinUsers";
import CreateSessionContainer from "./Components/CreateSessionContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/playlistbuilder"
        render={props => <PlaylistbuildContainer {...props} />}
      />
      <Route exact path="/joinusers" component={JoinUsers} />
      <Route exact path="/createsession" component={CreateSessionContainer} />
      <Route exact path="/inviteusers" component={InviteUsers} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
