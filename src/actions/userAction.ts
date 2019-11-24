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

const userFetchSuccess = async (user: User) => {
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


export const userFetch = () => async (dispatch: any) => {

    dispatch(userFetchBegin());

    try {   
        const response = await axios.get(userApiUrl);
        const user = response.data;
        dispatch(userFetchSuccess(user));
    }
    catch (e) {
        dispatch(userFetchError());
    }
};
