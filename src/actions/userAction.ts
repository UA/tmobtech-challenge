import axios from 'axios';
import * as types from './actionTypes';
import { userApiUrl } from '../utils/constants'
import { User } from '../models/User'
import { Action } from 'redux';


export interface UserAction extends Action {
    user: User;
}

const userFetchBegin = () => {
    return {
        type: types.USER_FETCH_BEGIN
    };
};

const userFetchSuccess = (user: User) => {
    return {
        type: types.USER_FETCH_SUCCESS,
        user
    };
};

const userFetchError = () => {
    return {
        type: types.USER_FETCH_ERROR
    };
};


export const userFetch = () => (dispatch: any) => {

    dispatch(userFetchBegin());

    axios.get(userApiUrl)
			.then(response => {
				dispatch(userFetchSuccess(response.data));
			})
			.catch(err => {
                dispatch(userFetchError());
			});
};
