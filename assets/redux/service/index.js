import { combineReducers } from 'redux';
// import list from './list';
// import update from './update';
// import del from './delete';
// import show from './show';

import list from './list/serviceListReducer'

export default combineReducers({
    list
});

// list,
// update,
// del,
// show