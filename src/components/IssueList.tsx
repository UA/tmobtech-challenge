import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import { issuesFetch } from '../actions/issuesAction';
import { Message } from './Message';
import { Pagination } from './Pagination';
import { IssuesState } from '../reducers/issuesReducer';
import { IssueItem } from './IssueItem';


interface StateProps {
    issuesState: IssuesState;
    name:String;
    issueCount:Number;
}

interface DispatchProps {
    issuesFetch: typeof issuesFetch;
}

interface State {
    currentPage: Number;
}

interface Props extends StateProps, DispatchProps {}

class IssueList extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state ={
            currentPage: 1
         } 
    }

    componentDidMount() {
        const { name } = this.props
        this.props.issuesFetch(name, this.state.currentPage);
    }

    nextPage = (pageNumber: Number) =>{
        const { name } = this.props
        this.props.issuesFetch(name,this.state.currentPage);
        this.setState({currentPage:pageNumber.valueOf()});
    }

    render() {
        const {props} = this;
        const issues = props.issuesState.issues;
        const totalResult = +props.issueCount;
        
        const numberPages = Math.floor(totalResult / 10);

        if (props.issuesState.loading) {
            return <Message>⏳ Loading...</Message>;
        }

        if (props.issuesState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        if (issues.length) {
            return ( 
                <div>
                    <h2>Issues</h2>
                    { map(issues, issue => <IssueItem key={issue.id} issue={issue}/>)}
                    { totalResult > 10 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
                </div>
                );
        }

        return <Message>😞 Oops, no issues available</Message>;
    }
}

const mapStateToProps = (state: any, ownProps:any) => ({
    issuesState: state.issues,
    name:ownProps.match.params.name,
    issueCount:ownProps.match.params.issueCount
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({issuesFetch}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
