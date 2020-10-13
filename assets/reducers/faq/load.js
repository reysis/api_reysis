import { combineReducers } from 'redux';


export function error(state = null , action) {
    switch (action.type) {
        case 'FAQ_LIST_ERROR':
            return action.error;

        case 'FAQ_LIST_RESET':
            return null;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'FAQ_LIST_LOADING':
            return action.loading;

        case 'FAQ_LIST_RESET':
            return false;

        default:
            return state;
    }
}

export function loaded(state = null, action) {
    switch (action.type) {
        case 'FAQ_LIST_SUCCESS':
            return action.loaded;

        case 'FAQ_LIST_RESET':
            return null;

        default:
            return state;
    }
}

export default combineReducers({ error, loading, loaded });
