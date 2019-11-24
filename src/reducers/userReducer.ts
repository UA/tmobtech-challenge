import {  UserAction } from '../actions/userAction';
import { USER_FETCH_BEGIN, USER_FETCH_ERROR, USER_FETCH_SUCCESS } from '../actions/actionTypes';
import { User } from '../models/User';


export interface UserState {
    user: User;
    loading: boolean;
    error: boolean;
}

let userObject: User = {} as any;
const initialState: UserState = {
    user: userObject,
    loading: false,
    error: false
};


export const user = (state = initialState, action: UserAction):UserState => {
    switch (action.type) {
        case USER_FETCH_BEGIN:
            return {...initialState, loading: true};
        case USER_FETCH_SUCCESS:
            return {...initialState, user: action.user};
        case USER_FETCH_ERROR:
            return {...initialState, error: true};
        default:
            return state;
    }
};