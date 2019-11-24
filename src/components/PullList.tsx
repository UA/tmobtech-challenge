import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import { pullsFetch } from "../actions/pullsAction";
import { searchFetch } from "../actions/searchAction";
import { Message } from "./Message";
import { Pagination } from "./Pagination";
import { PullsState } from "../reducers/pullsReducer";
import { SearchState } from "../reducers/searchReducer";
import { PullItem } from "./PullItem";

interface StateProps {
  pullsState: PullsState;
  searchState: SearchState;
  name: String;
}

interface DispatchProps {
  pullsFetch: typeof pullsFetch;
  searchFetch: typeof searchFetch;
}

interface State {
  currentPage: Number;
  type: String;
}

interface Props extends StateProps, DispatchProps {}

class PullList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      type: "pr"
    };
  }

  componentDidMount() {
    const { name } = this.props;
    //this.props.pullsFetch(name, this.state.currentPage);
    this.props.searchFetch(name, this.state.type, this.state.currentPage);
  }

  nextPage = (pageNumber: Number) => {
    const { name } = this.props;
    //this.props.pullsFetch(name,this.state.currentPage);
    this.props.searchFetch(name, this.state.type, this.state.currentPage);

    this.setState({ currentPage: pageNumber.valueOf() });
  };

  render() {
    const { props } = this;

    const pulls = props.searchState.search;
    const totalResult = pulls.total_count;
    const numberPages = Math.floor(totalResult / 30);

    if (props.pullsState.loading) {
      return <Message>⏳ Loading...</Message>;
    }

    if (totalResult == 0) {
      return <Message>😞 Oops, no pull requests available</Message>;
    }

    if (props.pullsState.error) {
      return <Message>😫 Sorry, there's an error during fetching data</Message>;
    }

    if (pulls.items) {
      return (
        <div>
          <h2>Pull Requests</h2>
          {map(pulls.items, pull => (
            <PullItem key={pull.id} pull={pull} name={props.name} />
          ))}
          {totalResult > 30 ? (
            <Pagination
              pages={numberPages}
              nextPage={this.nextPage}
              currentPage={this.state.currentPage}
            />
          ) : (
            ""
          )}
        </div>
      );
    }
    return <Message>⏳ Loading...</Message>;
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  pullsState: state.pulls,
  searchState: state.search,
  name: ownProps.match.params.name
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ pullsFetch, searchFetch }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PullList);
