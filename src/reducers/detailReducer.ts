import {  DetailAction } from '../actions/detailAction';
import { REPO_FETCH_BEGIN, REPO_FETCH_ERROR, REPO_FETCH_SUCCESS } from '../actions/actionTypes';
import { DetailRepo } from '../models/DetailRepo';


export interface DetailRepoState {
    repo: DetailRepo;
    loading: boolean;
    error: boolean;
}
let detailObject: DetailRepo = {} as any;
const initialState: DetailRepoState = {
    repo: detailObject,
    loading: false,
    error: false
};


export const repo = (state = initialState, action: DetailAction): DetailRepoState => {
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