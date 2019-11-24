import {  ReposAction } from '../actions/reposAction';
import { REPOS_FETCH_BEGIN, REPOS_FETCH_ERROR, REPOS_FETCH_SUCCESS } from '../actions/actionTypes';
import { Repo } from '../models/Repo';


export interface ReposState {
    repos: Repo[];
    loading: boolean;
    error: boolean;
}

const initialState: ReposState = {
    repos: [],
    loading: false,
    error: false
};


export const repos = (state = initialState, action: ReposAction): ReposState => {
    switch (action.type) {
        case REPOS_FETCH_BEGIN:
            return {...initialState, loading: true};
        case REPOS_FETCH_SUCCESS:
            return {...initialState, repos: action.repos};
        case REPOS_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};