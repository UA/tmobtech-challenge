import {  SearchAction } from '../actions/searchAction';
import { SEARCH_FETCH_BEGIN, SEARCH_FETCH_ERROR, SEARCH_FETCH_SUCCESS } from '../actions/actionTypes';
import { Search } from '../models/Search';


export interface SearchState {
    search: Search;
    loading: boolean;
    error: boolean;
}
let searchObject: Search = {} as any;
const initialState: SearchState = {
    search: searchObject,
    loading: false,
    error: false
};


export const search = (state = initialState, action: SearchAction): SearchState => {
    switch (action.type) {
        case SEARCH_FETCH_BEGIN:
            return {...initialState, loading: true};
        case SEARCH_FETCH_SUCCESS:
            return {...initialState, search: action.search};
        case SEARCH_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};