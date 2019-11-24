import * as React from 'react';
import './PullItem.css';
import { shorten } from '../utils/stringUtils';
import { Item } from '../models/Search';

interface Props {
    pull: Item;
    name:String;
}

export const PullItem: React.SFC<Props> = props => {
    return (
        <div className="pull">
            <h3> {props.name}</h3>
          <span className="title"> {props.pull.title}</span>
         <div className="body">
             <p className="summary">{shorten(props.pull.body)}</p>
         </div>
        </div>
        
    );
};
