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
import { Pagination } from './Pagination';
import { per_page } from '../utils/constants';


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
}

interface Props extends StateProps, DispatchProps {}

class RepoList extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state ={
            currentPage: 1
         } 
    }

    componentDidMount() {
        this.props.userFetch();        
        this.props.reposFetch(this.state.currentPage);
    }

    nextPage = (pageNumber: Number) =>{
        this.props.reposFetch(this.state.currentPage);
        this.setState({currentPage:pageNumber.valueOf()});
    }

    render() {
        const {props} = this;
        const repos = props.reposState.repos;
        const totalResult = this.props.userState.user.public_repos;
        const numberPages = Math.floor(this.props.userState.user.public_repos / per_page);

        if (props.reposState.loading) {
            return <Message>⏳ Loading...</Message>;
        }

        else if (props.reposState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        if (repos.length) {
            return ( 
                <div>
                    <h2>React Community</h2>
                    { map(repos, repo => <RepoItem key={repo.id} repo={repo}/>)}
                    { totalResult > per_page ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
                </div>
                );
        }

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
