import {  IssuesAction } from '../actions/issuesAction';
import { ISSUES_FETCH_BEGIN, ISSUES_FETCH_ERROR, ISSUES_FETCH_SUCCESS } from '../actions/actionTypes';
import { Issue } from '../models/Issue';


export interface IssuesState {
    issues: Issue[];
    loading: boolean;
    error: boolean;
}

const initialState: IssuesState = {
    issues: [],
    loading: false,
    error: false
};


export const issues = (state = initialState, action: IssuesAction): IssuesState => {
    switch (action.type) {
        case ISSUES_FETCH_BEGIN:
            return {...initialState, loading: true};
        case ISSUES_FETCH_SUCCESS:
            return {...initialState, issues: action.issues};
        case ISSUES_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};