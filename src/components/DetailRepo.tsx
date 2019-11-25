import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./RepoItem.css";
import { detailRepoFetch } from "../actions/detailAction";
import { DetailRepoState } from "../reducers/detailReducer";
import { Message } from "./Message";
import { Link } from "react-router-dom";

interface StateProps {
  detailRepoState: DetailRepoState;
  name: String;
}

interface DispatchProps {
  detailRepoFetch: typeof detailRepoFetch;
}

interface Props extends StateProps, DispatchProps {}

class DetailRepo extends React.Component<Props, {}> {
  componentDidMount() {
    const { name } = this.props;
    this.props.detailRepoFetch(name);
  }
  render() {
    const { props } = this;
    const repo = props.detailRepoState.repo;

    if (this.props.detailRepoState.loading) {
      return <Message>⏳ Loading...</Message>;
    } else if (this.props.detailRepoState.error) {
      return <Message>😫 Sorry, there's an error during fetching data</Message>;
    }

    if (repo) {
      return (
        <div>
          <h2>Repository Detail</h2>
          <div className="repo">
            <ul>
              <li>
                <h3 className="title">
                  <b>{repo.name}</b>
                </h3>
                <p className="description">{repo.description}</p>
                <p></p>
                <p>
                  {" "}
                  <b>language:</b> {repo.language}{" "}
                </p>
                <p>
                  {" "}
                  <b>stargazers_count:</b> {repo.stargazers_count}{" "}
                </p>
                <p>
                  {" "}
                  <b>forks_count:</b> {repo.forks_count}{" "}
                </p>
                <p>
                  {" "}
                  <b>open_issues_count:</b> {repo.open_issues_count}{" "}
                </p>
                <p>
                  {" "}
                  <b>watchers_count:</b> {repo.watchers_count}{" "}
                </p>
              </li>
              <li>
                <Link to={"/pulls/" + repo.name}>Pull Requests</Link> {"  |  "}
                <Link to={"/issues/" + repo.name}>Issues</Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return <Message>😞 Oops, no repo available</Message>;
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  detailRepoState: state.repo,
  name: ownProps.match.params.name
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ detailRepoFetch }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailRepo);
