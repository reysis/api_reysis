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

export const saveTokensToStorage = ({token, refreshToken, user}) => {
    localStorage.setItem('token',token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', user);
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
    console.log(id);
    fetch(id, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(loadUserSuccess(res));
        })
        .catch(error => {
            dispatch(loadUserError(error.message));
        })
}

export const authRefreshToken = (refreshToken)=> dispatch =>{
    dispatch(refreshTokenLoading(true));
    const headers = {
        'ContentType': 'application/ld+json'
    }
    const body = JSON.stringify(refreshToken);

    fetch('/api/refesh-token', {body, headers})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            //PENDING TO TO
        })
}