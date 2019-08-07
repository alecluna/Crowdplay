import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import NotFoundPage from "./Components/Utils/NotFoundPage";
import JoinUsers from "./Components/JoinUsers";
import ChatRoomContainer from "./Components/Containers/ChatRoomContainer";
import PlaylistStepper from "./Components/Playlist/PlaylistStepper";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path="/joinusers"
        render={props => <JoinUsers {...props} />}
      />
      <Route
        exact
        path="/createsession"
        render={props => <PlaylistStepper {...props} />}
      />
      <Route
        exact
        path="/room/:roomId"
        render={props => <ChatRoomContainer {...props} />}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
