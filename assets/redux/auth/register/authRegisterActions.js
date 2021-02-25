import {
    AUTH_REGISTER_ERROR,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS
}from './authRegisterTypes'
import {
 fetch
} from "../../../utils/dataAccess";
import {loginFetch} from "../login/authLoginActions";

export const registerRequest = () => {
    return {
        type: AUTH_REGISTER_REQUEST
    };
};

export const registerSuccess = user => {
    return {
        type: AUTH_REGISTER_SUCCESS,
        payload: user
    };
};

export const registerError = error => {
    return {
        type: AUTH_REGISTER_ERROR,
        payload: error
    };
};

export const registerFetch = (value) => dispatch => {
    dispatch(registerRequest());

    const page = "/api/users";
    const method = "POST";
    const body = JSON.stringify({
        persona: { ...value.persona },
        phoneNumbers: { ...value.phoneNumbers },
        address: { ...value.address },
        username: value.username,
        email: value.email,
        password: value.password,
        nationality: value.nationality
    });

    const username = value.username;
    const password = value.password;

    fetch(page, { method, body })
        .then(res => res.json())
        .then(res => {
            const request = {
                username,
                password
            }
            dispatch(loginFetch(request))
            dispatch(registerSuccess(res));
        })
        .catch(error => {
            dispatch(registerError(error.message));
        })
};