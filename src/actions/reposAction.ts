import axios from 'axios';
import * as types from './actionTypes';
import { reposApiUrl } from '../utils/constants'
import { Repo } from '../models/Repo'
import { Action } from 'redux';



export type RepoList = Repo[];

export interface ReposAction extends Action {
    repos: RepoList;
}

const reposFetchBegin = () => {
    return {
        type: types.REPOS_FETCH_BEGIN
    };
};

const reposFetchSuccess = (repos: RepoList) => {
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

export const reposFetch = (currentPage:Number) => async (dispatch: any) => {

    dispatch(reposFetchBegin());

    try {
        const apiUrl = `${reposApiUrl}?per_page=${10}&page=${1}`;        
        const response = await axios.get(apiUrl);
        const repos = response.data;
        dispatch(reposFetchSuccess(repos));
    }
    catch (e) {
        dispatch(reposFetchError());
    }
};
