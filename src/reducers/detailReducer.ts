import {  DetailAction, Repo } from '../actions/detailAction';
import { REPO_FETCH_BEGIN, REPO_FETCH_ERROR, REPO_FETCH_SUCCESS } from '../actions/actionTypes';


export interface DetailRepoState {
    repo: Repo;
    loading: boolean;
    error: boolean;
}
let detailObject: Repo = {} as any;
const initialState: DetailRepoState = {
    repo: detailObject,
    loading: false,
    error: false
};


export const detailRepo = (state = initialState, action: DetailAction): DetailRepoState => {
    switch (action.type) {
        case REPO_FETCH_BEGIN:
            return {...initialState, loading: true};
        case REPO_FETCH_SUCCESS:
            return {...initialState, repo: action.repo};
        case REPO_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};