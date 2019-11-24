import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';
import { pullsFetch } from '../actions/pullsAction';
import { Message } from './Message';
import { Pagination } from './Pagination';
import { PullsState } from '../reducers/pullsReducer';
import { PullItem } from './PullItem';


interface StateProps {
    pullsState: PullsState;
    name:String;
}

interface DispatchProps {
    pullsFetch: typeof pullsFetch;
}

interface State {
    currentPage: Number;
}

interface Props extends StateProps, DispatchProps {}

class PullList extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state ={
            currentPage: 1
         } 
    }

    componentDidMount() {
        const { name } = this.props
        this.props.pullsFetch(name, this.state.currentPage);
    }

    nextPage = (pageNumber: Number) =>{
        const { name } = this.props
        this.props.pullsFetch(name,this.state.currentPage);
        this.setState({currentPage:pageNumber.valueOf()});
    }

    render() {
        const {props} = this;
        const pulls = props.pullsState.pulls;
        const totalResult = 100;
        console.log(props);
        
        const numberPages = Math.floor(totalResult / 10);

        if (props.pullsState.loading) {
            return <Message>⏳ Loading...</Message>;
        }

        if (props.pullsState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        if (pulls.length) {
            return ( 
                <div>
                    <h2>Pull Requests</h2>
                    { map(pulls, pull => <PullItem key={pull.id} pull={pull}/>)}
                    { totalResult > 10 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
                </div>
                );
        }

        return <Message>😞 Oops, no pull requests available</Message>;
    }
}

const mapStateToProps = (state: any, ownProps:any) => ({
    pullsState: state.pulls,
    name:ownProps.match.params.name
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({pullsFetch}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PullList);
