import { combineReducers } from 'redux';

import show from './show/opinionShowReducer';
import list from './list/opinionListReducer'

export default combineReducers({
    show,
    list
});
