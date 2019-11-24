import RepoList from "../components/RepoList";
import DetailRepo from "../components/DetailRepo";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import IssueList from "../components/IssueList";
import PullList from "../components/PullList";

class AppRouter extends React.Component {

   
    public render() {
      return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RepoList} />
          <Route path="/repoDetail/:name" component={DetailRepo} />
          <Route path="/issues/:name" component={IssueList}/>
          <Route path="/pulls/:name" component={PullList}/>
        </Switch>
      </BrowserRouter>
      );
    }
  }

  export default AppRouter;
