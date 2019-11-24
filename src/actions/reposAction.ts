import axios from 'axios';
import * as types from './actionTypes';
import { reposApiUrl } from '../utils/constants'
import { Repo } from '../models/Repo'
import { Action } from 'redux';


export interface ReposAction extends Action {
    repos: Repo[];
}

const reposFetchBegin = () => {
    return {
        type: types.REPOS_FETCH_BEGIN
    };
};

const reposFetchSuccess = (repos: Repo[]) => {
    return {
        type: types.REPOS_FETCH_SUCCESS,
        repos
    };
};

const reposFetchError = () => {
    return {
        type: types.REPOS_FETCH_ERROR
    };
};

export const reposFetch = (currentPage:Number) => (dispatch: any) => {
    
    dispatch(reposFetchBegin());
    const apiUrl = `${reposApiUrl}?per_page=${10}&page=${currentPage}`;        
    axios.get(apiUrl)
			.then(response => {
				dispatch(reposFetchSuccess(response.data));
			})
			.catch(err => {
                dispatch(reposFetchError());
			});
    
};
