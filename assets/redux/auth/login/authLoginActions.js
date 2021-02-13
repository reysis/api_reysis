import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_USER_LOGOUT
} from './authLoginTypes';
import {
    fetch
} from "../../../utils/dataAccess";
import {userLoguedFetch, saveTokensToStorage, tokenClearState} from "../token/authTokenActions";

export const loginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST
    };
};

export const loginSuccess = authenticated => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: authenticated
    };
};

export const loginError = error => {
    console.log("ERROR_ACTION: ",error)
    return {
        type: AUTH_LOGIN_ERROR,
        payload: error
    };
};

export const loginFetch = ({ username, password }) => dispatch => {
    dispatch(loginRequest(true));

    const page = "/api/authentication";
    const method = "POST";
    const headers = new Headers({
        "Content-Type": "application/json"
    });
    const body = JSON.stringify({
        username,
        password
    });

    fetch(page, { method, headers, body })
        .then(res => res.json())
        .then(res => {
            const token = res.token
            const location = res.location
            const refreshToken = res['refresh_token']
            console.log(location);
            dispatch(saveTokensToStorage({
            	token,
            	refreshToken: refreshToken,
                user: location
            }))
            dispatch(loginSuccess(true))
            dispatch(userLoguedFetch(location));
        })
        .catch(error => {
            dispatch(loginError(error.message));
        });

};

export const userLogout = () => {
    localStorage.clear();
    return{
        type: AUTH_USER_LOGOUT,
    }
}