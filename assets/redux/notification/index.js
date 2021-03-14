import { combineReducers } from 'redux';

import del from './delete/notificationDeleteReducer';
import list from './list/notificationListReducer';

export default combineReducers({
    del,
    list
});
