import {combineReducers} from "redux";

export function error(state = null, action){
    switch (action.type) {
        case 'USER_LOGOUT_ERROR':
            return action.error;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'USER_LOGOUT_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function message(state = null, action) {
    switch (action.type) {
        case 'USER_LOGOUT_SUCCESS':
            return action.message;
        default:
            return state;
    }
}

export default combineReducers({ error, loading, message });
