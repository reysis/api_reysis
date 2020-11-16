import {
	AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAIL, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR,
 	AUTH_REGISTER_REQUEST, AUTH_REGISTER_FAIL, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
 	AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_FAIL, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_ERROR,
 	AUTH_CLEAR_ERROR 
 } from './authTypes'

export const loginRequest = () => {
    return { 
        type: AUTH_LOGIN_REQUEST
    }
}

export const loginSuccess = (user) => {
    return { 
        type: AUTH_LOGIN_SUCCESS, 
        payload: user 
    }
}

export const loginError = (error) => {
    return { 
        type: AUTH_LOGIN_ERROR, 
        payload: error 
    }
}

export const logoutRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST
    }
}

export const logoutSuccess = () => {
    return { 
        type: AUTH_LOGOUT_SUCCESS
    }
}

export const logoutError = (error) => {
    return {
        type: AUTH_LOGIN_ERROR,
        payload: error
    }
}

export const registerRequest = (user) => {
    return { 
        type: AUTH_REGISTER_REQUEST
    }
}

export const registerSuccess = (user) => {
    return { 
        type: AUTH_REGISTER_SUCCESS, 
        payload: user 
    }
}

export const registerError = (error) => {
    return {
        type: AUTH_REGISTER_ERROR,
        payload: error
    }
}

export const clearError = () => {
    return {
        type: AUTH_CLEAR_ERROR
    }
}

export const loginFetch = (values) => dispatch => {
    console.log(values)
    dispatch(loginRequest());

    return fetch('/api/login', { 
            method: 'POST', 
            body: JSON.stringify(values) 
        })
        .then(res => {
            console.log(res.headers.get('location'))
            fetch(res.headers.get('location'))
                .then(res => res.json())
                .then(res => {
                    const response = {
                        id: res['@id'],
                        ...res
                    }
                    console.log(res, response)
                    dispatch(loginSuccess(response))
                })
                .catch(error => {
                    dispatch(loginError(error.message));
                })
        })
        .catch(error => {
            dispatch(loginError(error.message));
        })
}

export const registerFetch = (values) => dispatch => {
    dispatch(registerRequest(true));

    return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(res => {
        const response = {
            id: res['@id'],
            ...res
        }
        dispatch(registerSuccess(response))
    })
    .catch(error => {
        dispatch(registerError(error.message));
    });
}

export const logoutFetch = () => dispatch => {
    dispatch(logoutRequest());

    return fetch('/api/logout', {
        method: 'POST'
    })
        .then(() => {
            dispatch(logoutSuccess())
        })
        .catch(error => {
            dispatch(logoutError(error.message));
        })
}