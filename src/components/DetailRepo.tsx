import * as React  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { detailRepoFetch } from '../actions/detailAction';
import { DetailRepoState } from '../reducers/detailReducer';
import { Message } from './Message';


interface StateProps {
    detailRepoState: DetailRepoState;
    name:String;
}

interface DispatchProps {
    detailRepoFetch: typeof detailRepoFetch;
}

interface Props extends StateProps, DispatchProps {}

class DetailRepo extends React.Component<Props, {}> {
  
    componentDidMount() {
        const { name } = this.props
        this.props.detailRepoFetch('ar.reactjs.org');
        console.log( this.props);
    }
    render() {
        // if (this.props.repoState.loading) {
        //     return <Message>⏳ Loading...</Message>;
        // }

        // else if (this.props.repoState.error) {
        //     return <Message>😫 Sorry, there's an error during fetching data</Message>;
        // }

        return(
            <div>
                
            </div>
        )

    }
}

const mapStateToProps = (state: any, ownProps:any) => ({
    detailRepoState: state.repo,
    name:ownProps.match.params.name
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({detailRepoFetch}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailRepo);
