import { combineReducers } from 'redux';


export function error(state = null , action) {
    switch (action.type) {
        case 'TIPO_EQUIPO_LIST_ERROR':
            return action.error;

        case 'TIPO_EQUIPO_LIST_RESET':
            return null;

        default:
            return state;
    }
}

export function loading(state = false, action) {
    switch (action.type) {
        case 'TIPO_EQUIPO_LIST_LOADING':
            return action.loading;

        case 'TIPO_EQUIPO_LIST_RESET':
            return false;

        default:
            return state;
    }
}

export function loaded(state = null, action) {
    switch (action.type) {
        case 'TIPO_EQUIPO_LIST_SUCCESS':
            return action.loaded;

        case 'TIPO_EQUIPO_LIST_RESET':
            return null;

        default:
            return state;
    }
}

export default combineReducers({ error, loading, loaded });
