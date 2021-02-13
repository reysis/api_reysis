import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS, AUTH_USER_LOGOUT
} from './authLoginTypes';

const initialState = {
    loading: false,
    authenticated: null,
    error: null,
}

const authLoginReducer = (state = initialState, {type, payload})=>{
    switch (type){
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                authenticated: payload
            }
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                authenticated: false,
                loading: payload
            }
        case AUTH_USER_LOGOUT:
            return {
                loading: false,
                authenticated: null,
                error: null
            }
        default:
            return state;
    }
}

export default authLoginReducer;