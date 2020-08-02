import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import NotFoundPage from "./Components/Reusable/NotFoundPage";
import JoinUsersWithRooms from "./Components/Pages/JoinUsersWithRooms";
import ChatRoom from "./Components/Pages/ChatRoom/index";
import CreateSession from "./Components/Pages/CreateSession";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route
        exact
        path="/joinusers"
        render={(props) => <JoinUsersWithRooms {...props} />}
      />
      <Route
        exact
        path="/createsession"
        render={(props) => <CreateSession {...props} />}
      />
      <Route
        exact
        path="/room/:roomId"
        render={(props) => <ChatRoom {...props} />}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
