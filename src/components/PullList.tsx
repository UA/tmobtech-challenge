import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { map } from "lodash";
import { searchFetch } from "../actions/searchAction";
import { Message } from "./Message";
import { Pagination } from "./Pagination";
import { SearchState } from "../reducers/searchReducer";
import { PullItem } from "./PullItem";
import { per_page } from "../utils/constants";

interface StateProps {
  searchState: SearchState;
  name: String;
}

interface DispatchProps {
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
    this.props.searchFetch(name, this.state.type, this.state.currentPage);
  }

  nextPage = (pageNumber: Number) => {
    const { name } = this.props;
    this.props.searchFetch(name, this.state.type, this.state.currentPage);
    this.setState({ currentPage: pageNumber.valueOf() });
  };

  render() {
    const { props } = this;

    const pulls = props.searchState.search;
    const totalResult = pulls.total_count;
    const numberPages = Math.floor(totalResult / per_page);

    if (props.searchState.loading) {
      return <Message>⏳ Loading...</Message>;
    }

    if (props.searchState.error) {
      return <Message>😫 Sorry, there's an error during fetching data</Message>;
    }

    if (pulls.items) {
      return (
        <div>
          <h2>Pull Requests</h2>
          {map(pulls.items, pull => (
            <PullItem key={pull.id} pull={pull} name={props.name} />
          ))}
          {totalResult > per_page ? (
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
    return <Message>😞 Oops, no pull requests available</Message>;
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  searchState: state.search,
  name: ownProps.match.params.name
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ searchFetch }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PullList);
