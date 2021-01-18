import { combineReducers } from 'redux';

import create from './create/createTurnoReducer'
import show from './show/showTurnoReducer';
import update from './update/updateTurnoReducer';
import del from './delete/deleteTurnoReducer';
import list from './list/listTurnoReducer';

export default combineReducers({
    create, show, update, del, list
});
