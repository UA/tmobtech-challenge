import axios from 'axios';
import * as types from './actionTypes';
import { searchApiUrl, per_page } from '../utils/constants'
import { Search } from '../models/Search'
import { Action } from 'redux';


export interface SearchAction extends Action {
    search: Search;
}

const searchFetchBegin = () => {
    return {
        type: types.SEARCH_FETCH_BEGIN
    };
};

const searchFetchSuccess = (search: Search) => {
    return {
        type: types.SEARCH_FETCH_SUCCESS,
        search
    };
};

const searchFetchError = () => {
    return {
        type: types.SEARCH_FETCH_ERROR
    };
};

export const searchFetch = (repoName:String, type:String, currentPage:Number) => (dispatch: any) => {

    dispatch(searchFetchBegin());
    const apiUrl = searchApiUrl+repoName+"+type:"+type+"&page="+currentPage+"&per_page="+ per_page;  
    axios.get(apiUrl)
			.then(response => {
                  dispatch(searchFetchSuccess(response.data));				
            })
			.catch(err => {
                dispatch(searchFetchError());
			});
};
