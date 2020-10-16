import{
    fetch,
    normalize,
    extractHubURL,
    mercureSubscribe as subscribe
} from "../../utils/dataAccess";
import {SubmissionError} from "redux-form";

export function error(error) {
    return { type: 'USER_LOGOUT_ERROR', error };
}

export function loading(loading) {
    return { type: 'USER_LOGOUT_LOADING', loading };
}

export function success(message) {
    return { type: 'USER_LOGOUT_SUCCESS', message };
}

export function logout() {
    return dispatch => {
        dispatch(loading(true));

        return fetch('/api/logout', {
            method: 'POST',
        })
        .then(retrieved => dispatch(success("Sesión cerrada con éxito!!")))
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