import axios from 'axios';
import * as types from './actionTypes';
import { detailApiUrl } from '../utils/constants'
import { DetailRepo } from '../models/DetailRepo'
import { Action } from 'redux';


export type Repo = DetailRepo;

export interface DetailAction extends Action {
    repo: Repo;
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

export const detailRepoFetch = (repoName:String) => async (dispatch: any) => {

    dispatch(detailRepoFetchBegin());

    try {
        const apiUrl = detailApiUrl+repoName;        
        const response = await axios.get(apiUrl);
        const repo = response.data;
        dispatch(detailRepoFetchSuccess(repo));
    }
    catch (e) {
        dispatch(detailRepoFetchError());
    }
};
