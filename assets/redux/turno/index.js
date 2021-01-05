import { combineReducers } from 'redux';
// import list from './list';
// import update from './update';
// import del from './delete';
// import show from './show';

import createTurno from './create/createTurnoReducer'

export default combineReducers({
    createTurno
});

// list,
// update,
// del,
// show