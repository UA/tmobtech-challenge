import axios from 'axios';
import * as types from './actionTypes';
import { detailApiUrl } from '../utils/constants'
import { DetailRepo } from '../models/DetailRepo'
import { Action } from 'redux';


export interface DetailAction extends Action {
    repo: DetailRepo;
}

const detailRepoFetchBegin = () => {
    return {
        type: types.REPO_FETCH_BEGIN
    };
};

const detailRepoFetchSuccess = (repo: DetailRepo) => {
    return {
        type: types.REPO_FETCH_SUCCESS,
        repo
    };
};

const detailRepoFetchError = () => {
    return {
        type: types.REPO_FETCH_ERROR
    };
};

export const detailRepoFetch = (repoName:String) => (dispatch: any) => {

    dispatch(detailRepoFetchBegin());
    const apiUrl = detailApiUrl+repoName;  
    axios.get(apiUrl)
			.then(response => {
				dispatch(detailRepoFetchSuccess(response.data));
			})
			.catch(err => {
                dispatch(detailRepoFetchError());
			});
};
