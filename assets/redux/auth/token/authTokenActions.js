import {
    AUTH_LOAD_USER_ERROR,
    AUTH_LOAD_USER_LOADING,
    AUTH_LOAD_USER_SUCCESS,
    AUTH_REFRESH_TOKEN_LOADING,
    AUTH_REFRESH_TOKEN_ERROR,
    AUTH_UPDATE_USER_AUTHENTICATED,
    AUTH_SAVE_TOKENS,
    AUTH_TOKEN_CLEAR_STATE
} from './authTokenTypes'

import {
    fetch
} from "../../../utils/dataAccess";
import {getHeaders} from "../../utiles";
import {userShowError, userShowSuccess} from "../../user/show/userShowActions";
import {loginRequest, loginSuccess} from "../login/authLoginActions";

export const saveTokensToStorage = ({token, refreshToken, user}) => {
    localStorage.token = token;
    localStorage.refreshToken = refreshToken;
    localStorage.user = user;
    return {
        type: AUTH_SAVE_TOKENS
    }
};

export const loadUserSuccess = (user)=>{
    return {
        type: AUTH_LOAD_USER_SUCCESS,
        payload: user
    }
}

export const loadUserError = (error) => {
    return {
        type: AUTH_LOAD_USER_ERROR,
        payload: error,
    }
}

export const loadUserLoading = (loading) =>{
    return {
        type: AUTH_LOAD_USER_LOADING,
        payload: loading
    }
}

export const tokenClearState = () => {
    return{
        type: AUTH_TOKEN_CLEAR_STATE,
    }
}

export const refreshTokenLoading = (loading)=>{
    return {
        type: AUTH_REFRESH_TOKEN_LOADING,
        payload: loading
    }
}

export const refreshTokenError = (error) =>{
    return {
        type: AUTH_REFRESH_TOKEN_ERROR,
        payload: error
    }
}

export const updateUserAuthenticated = (user) =>{
    return {
        type: AUTH_UPDATE_USER_AUTHENTICATED,
        payload: user
    }
}

export const userLoguedFetch = (id) => (dispatch, getState) =>{
    dispatch(loadUserLoading(true))
    const headers = getHeaders(getState);
    fetch(id, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(loadUserSuccess(res));
        })
        .catch(error => {
            if(error['message'] === "Expired JWT Token"){
                dispatch(authRefreshToken(localStorage.getItem('refreshToken')))
            }
            dispatch(loadUserError(error.message));
        })
}

export const authRefreshToken = (refreshToken)=> dispatch =>{
    dispatch(refreshTokenLoading(true));

    let headers = new Headers();
    headers.set('Content-Type', 'application/ld+json');
    const body = JSON.stringify({
        'refresh_token': refreshToken
    });
    const method = "POST"

    fetch('/api/refresh-token', {method, body, headers})
        .then(res => res.json())
        .then(res => {
            const token = res.token
            const location = res.location
            const refreshToken = res['refresh_token']
            dispatch(saveTokensToStorage({
                token,
                refreshToken: refreshToken,
                user: location
            }))
            dispatch(loginSuccess(true));
            dispatch(userLoguedFetch(location));
        })
        .catch()
}