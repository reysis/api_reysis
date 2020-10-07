import {combineReducers} from "redux";

export function error(state = null, action){
    switch (action.type) {
        case 'USER_REGISTER_ERROR':
            return action.error;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'USER_REGISTER_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function registered(state = null, action) {
    switch (action.type) {
        case 'USER_REGISTER_SUCCESS':
            return action.registered;
        default:
            return state;
    }
}

export default combineReducers({ error, loading, registered });