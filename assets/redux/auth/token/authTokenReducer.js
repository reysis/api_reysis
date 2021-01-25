import {
    AUTH_SAVE_TOKENS,
    AUTH_LOAD_USER_LOADING,
    AUTH_LOAD_USER_ERROR,
    AUTH_LOAD_USER_SUCCESS,
    AUTH_REFRESH_TOKEN_ERROR,
    AUTH_REFRESH_TOKEN_LOADING,
    AUTH_UPDATE_USER_AUTHENTICATED,
    AUTH_TOKEN_CLEAR_STATE
} from './authTokenTypes';

const initialState = {
    authenticatedUser: null,
    loadUserLoading: false,
    refresTokenLoading: false,
    refreshTokenError: null,
    loadUserError: null,
}

const authTokenReducer = (state = initialState, {type, payload})=>{
    switch (type){
        case AUTH_UPDATE_USER_AUTHENTICATED:
            return {
                ...state,
                authenticatedUser: payload,
            }
        case AUTH_LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                authenticatedUser: payload
            }
        case AUTH_LOAD_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case AUTH_LOAD_USER_LOADING:
            return {
                ...state,
                loading: payload
            }
        case AUTH_TOKEN_CLEAR_STATE:
            return {
                ...initialState
            }
        case AUTH_REFRESH_TOKEN_ERROR:
            return {
                ...state,
                refreshTokenError: payload
            }
        case AUTH_REFRESH_TOKEN_LOADING:
            return {
                ...state,
                refresTokenLoading: payload
            }
        case AUTH_SAVE_TOKENS:
        default:
            return state;
    }
}

export default authTokenReducer;