import {  PullsAction } from '../actions/pullsAction';
import { PULLS_FETCH_BEGIN, PULLS_FETCH_ERROR, PULLS_FETCH_SUCCESS } from '../actions/actionTypes';
import { PullRequest } from '../models/PullRequest';


export interface PullsState {
    pulls: PullRequest[];
    loading: boolean;
    error: boolean;
}

const initialState: PullsState = {
    pulls: [],
    loading: false,
    error: false
};


export const pulls = (state = initialState, action: PullsAction): PullsState => {
    switch (action.type) {
        case PULLS_FETCH_BEGIN:
            return {...initialState, loading: true};
        case PULLS_FETCH_SUCCESS:
            return {...initialState, pulls: action.pulls};
        case PULLS_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};