import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./../components/Home";
import Test from "./../components/Test";

class AppRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AppRouter;
