import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import { searchFetch } from '../actions/searchAction';
import { Message } from './Message';
import { Pagination } from './Pagination';
import { IssueItem } from './IssueItem';
import { SearchState } from '../reducers/searchReducer';


interface StateProps {
    name:String;
    searchState: SearchState;
}

interface DispatchProps {
    searchFetch: typeof searchFetch;
}

interface State {
    currentPage: Number;
    type: String;
}

interface Props extends StateProps, DispatchProps {}

class IssueList extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state ={
            currentPage: 1,
            type: 'issue'
         } 
    }

    componentDidMount() {
        const { name } = this.props;
        this.props.searchFetch(name, this.state.type, this.state.currentPage);
    }

    nextPage = (pageNumber: Number) =>{
        const { name } = this.props;
        this.props.searchFetch(name, this.state.type, this.state.currentPage);
        this.setState({currentPage:pageNumber.valueOf()});
    }

    render() {
        const {props} = this;

        const issues = props.searchState.search;
        const totalResult = issues.total_count;
        
        const numberPages = Math.floor(totalResult / 30);

        if (props.searchState.loading) {
            return <Message>⏳ Loading...</Message>;
        }

        if (props.searchState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        if (issues.items) {
            return ( 
                <div>
                    <h2>Issues</h2>
                    { map(issues.items, issue => <IssueItem key={issue.id} issue={issue} name={props.name}/>)}
                    { totalResult > 30 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
                </div>
                );
        }

        return <Message>😞 Oops, no issues available</Message>;
    }
}

const mapStateToProps = (state: any, ownProps:any) => ({
    searchState: state.search,
    name:ownProps.match.params.name,
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({searchFetch}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
