import {combineReducers} from "redux";

export function error(state = null, action){
    switch (action.type) {
        case 'USER_LOGIN_ERROR' || 'USER_REGISTER_ERROR':
            return action.error;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'USER_LOGIN_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function logged(state = window.user, action) {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return action.logged;
        case 'USER_LOGOUT_SUCCESS':{
            return action.logged;
        }
        default:
            return state;
    }
}


export default combineReducers({ error, loading, logged });
