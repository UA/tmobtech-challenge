import axios from 'axios';
import * as types from './actionTypes';
import { issuesApiUrl } from '../utils/constants'
import { Action } from 'redux';
import { Issue } from '../models/Issue';


export interface IssuesAction extends Action {
    issues: Issue[];
}

const issuesFetchBegin = () => {
    return {
        type: types.ISSUES_FETCH_BEGIN
    };
};

const issuesFetchSuccess = (issues: Issue[]) => {
    return {
        type: types.ISSUES_FETCH_SUCCESS,
        issues
    };
};

const issuesFetchError = () => {
    return {
        type: types.ISSUES_FETCH_ERROR
    };
};


export const issuesFetch = (repoName:String, currentPage:Number) => (dispatch: any) => {
    dispatch(issuesFetchBegin());
    const apiUrl =  `${issuesApiUrl+repoName}/issues?per_page=${10}&page=${currentPage}`;  
    axios.get(apiUrl)
			.then(response => {
				dispatch(issuesFetchSuccess(response.data));
			})
			.catch(err => {
                dispatch(issuesFetchError());
			});
};
