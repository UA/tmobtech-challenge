import { combineReducers } from 'redux';

import {repos} from './reposReducer';
import {repo} from './detailReducer';
import {user} from './userReducer';
import {issues} from './issuesReducer';
import {pulls} from './pullsReducer';
import {search} from './searchReducer';


const reducers = combineReducers({
	repos,
	repo,
	user,
	issues,
	pulls,
	search
});

export default reducers;