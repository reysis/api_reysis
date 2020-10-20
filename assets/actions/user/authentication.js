import{
    fetch,
    normalize,
    extractHubURL,
    mercureSubscribe as subscribe
} from "../../utils/dataAccess";
import {SubmissionError} from "redux-form";

export function error(error) {
    return { type: 'USER_LOGIN_ERROR', error };
}

export function loading(loading) {
    return { type: 'USER_LOGIN_LOADING', loading };
}

export function successLogin(logged) {
    console.log(logged);
    return { type: 'USER_LOGIN_SUCCESS', logged };
}

export function successLogout(logged) {
    console.log(logged);
    return { type: 'USER_LOGOUT_SUCCESS', logged };
}

export function successRegister(logged) {
    console.log(logged);
    return { type: 'USER_REGISTER_SUCCESS', logged };
}

export function login(values) {
    return dispatch => {
        dispatch(loading(true));

        return fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(values),
            })
            .then(response => {
                console.log(response);
                fetch(response.headers.get('location'))
                    .then(response2 => {
                        dispatch(loading(false));

                        return response2.json();
                    })
                    .then(retrieved => dispatch(successLogin(retrieved)))
                    .catch(e => {
                        dispatch(loading(false));
                        dispatch(error(e));
                    })
            })
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }
                dispatch(error(e.message));
            });
    };
}

export function register(values) {
    return dispatch => {
        dispatch(loading(true));

        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        .then(response => {
            dispatch(loading(false));

            return response.json();
        })
        .then(retrieved => dispatch(successRegister(retrieved)))
        .catch(e => {
            dispatch(loading(false));

            if (e instanceof SubmissionError) {
                dispatch(error(e.errors._error));
                throw e;
            }
            dispatch(error(e.message));
        });
    };
}

export function logout() {
    return dispatch => {
        dispatch(loading(true));

        return fetch('/api/logout', {
            method: 'POST',
        })
            .then(retrieved => {
                dispatch(loading(false));

            })
            .then(() => dispatch(successLogout(null)))
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }
                dispatch(error(e.message));
            });
    };
}

export function reset() {
    return dispatch => {
        dispatch(loading(false));
        dispatch(error(null));
    };
}
