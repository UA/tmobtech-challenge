import axios from 'axios';
import * as types from './actionTypes';
import { pullsApiUrl } from '../utils/constants'
import { Action } from 'redux';
import { PullRequest } from '../models/PullRequest';


export interface PullsAction extends Action {
    pulls: PullRequest[];
}

const pullsFetchBegin = () => {
    return {
        type: types.PULLS_FETCH_BEGIN
    };
};

const pullsFetchSuccess = (pulls: PullRequest[]) => {
    return {
        type: types.PULLS_FETCH_SUCCESS,
        pulls
    };
};

const pullsFetchError = () => {
    return {
        type: types.PULLS_FETCH_ERROR
    };
};


export const pullsFetch = (repoName:String, currentPage:Number) => (dispatch: any) => {
    dispatch(pullsFetchBegin());
    const apiUrl =  `${pullsApiUrl+repoName}/pulls?per_page=${10}&page=${currentPage}`;  
    axios.get(apiUrl)
			.then(response => {
				dispatch(pullsFetchSuccess(response.data));
			})
			.catch(err => {
                dispatch(pullsFetchError());
			});
};
