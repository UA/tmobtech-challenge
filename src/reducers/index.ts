import { combineReducers } from 'redux';

import {repos} from './reposReducer';
import {detailRepo} from './detailReducer';
import {user} from './userReducer';


const reducers = combineReducers({
	repos,
	detailRepo,
	user
});

export default reducers;