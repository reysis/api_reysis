import { combineReducers } from 'redux';
import list from './list/serviceListReducer'
import show from './show/serviceShowReducer'

export default combineReducers({
    list,
    show
});
