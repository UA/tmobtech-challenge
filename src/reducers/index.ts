import { combineReducers } from 'redux';

import {repos} from './reposReducer';
import {repo} from './detailReducer';
import {user} from './userReducer';
import {search} from './searchReducer';


const reducers = combineReducers({
	repos,
	repo,
	user,
	search
});

export default reducers;