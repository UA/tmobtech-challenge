import RepoList from "../components/RepoList";
import DetailRepo from "../components/DetailRepo";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React from "react";

class AppRouter extends React.Component {

   
    public render() {
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RepoList}>
          </Route>
          <Route path="/repoDetail/:name" component={DetailRepo}>
          </Route>
        </Switch>
      </BrowserRouter>
      );
    }
  }

  export default AppRouter;
