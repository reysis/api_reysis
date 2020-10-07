import{
    fetch,
    normalize,
    extractHubURL,
    mercureSubscribe as subscribe
} from "../../utils/dataAccess";
import {SubmissionError} from "redux-form";

export function error(error) {
    return { type: 'USER_REGISTER_ERROR', error };
}

export function loading(loading) {
    return { type: 'USER_REGISTER_LOADING', loading };
}

export function success(registered) {
    return { type: 'USER_REGISTER_SUCCESS', registered};
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
        }).then(retrieved => dispatch(success(retrieved)))
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