import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import { reposFetch } from '../actions/reposAction';
import { userFetch } from '../actions/userAction';
import { ReposState } from '../reducers/reposReducer';
import { RepoItem } from './RepoItem';
import { Message } from './Message';
import { UserState } from '../reducers/userReducer';
import Pagination from './Pagination';


interface StateProps {
    reposState: ReposState;
    userState: UserState;
}

interface DispatchProps {
    reposFetch: typeof reposFetch;
    userFetch: typeof userFetch;
}

interface State {
    currentPage: Number;
    totalResult: Number;
}

interface Props extends StateProps, DispatchProps {}

class RepoList extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state ={
            currentPage: 1,
            totalResult: 0
         } 
    }

    componentDidMount() {
        this.props.userFetch();
        const repoCount= this.props.userState.user.public_repos;
        this.setState({totalResult: repoCount})
        this.props.reposFetch(this.state.currentPage);
    }

    nextPage = (pageNumber: Number) =>{
        this.props.reposFetch(this.state.currentPage);
        this.setState({currentPage:pageNumber.valueOf()});
    }

    render() {
        const {props} = this;
        const repos = props.reposState.repos;
        console.log(this.state.totalResult);
        //const numberPages = Math.floor(this.state.totalResult.valueOf() / 10);

        if (props.reposState.loading) {
            return <Message>⏳ Loading...</Message>;
        }

        else if (props.reposState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        if (repos.length) {
            return map(repos, repo => <RepoItem key={repo.id} repo={repo}/>);
        }

        // {this.state.totalResult > 10 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}

        return <Message>😞 Oops, no repos available</Message>;
    }
}

const mapStateToProps = (state: any, ownProps:any) => ({
    reposState: state.repos,
    userState: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({reposFetch, userFetch}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoList);
