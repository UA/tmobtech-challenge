import * as React from 'react';
import './PullItem.css';
import { shorten } from '../utils/stringUtils';
import { PullRequest } from '../models/PullRequest';

interface Props {
    pull: PullRequest;
}

export const PullItem: React.SFC<Props> = props => {
    return (
        <div className="pull">
          <span className="title"> {props.pull.title}</span>
         <div className="body">
             <p className="summary">{shorten(props.pull.body)}</p>
         </div>
        </div>
        
    );
};
