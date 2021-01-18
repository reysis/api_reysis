import { combineReducers } from 'redux';

import show from './show/userShowReducer'
import update from './update/updateUserReducer';
import del from './delete/deleteUserReducer';

export default combineReducers({
    show, update, del
});
