import {
    fetch,
    normalize,
    extractHubURL,
} from '../../utils/dataAccess';

export function error(error) {
    return { type: 'TIPO_EQUIPO_LIST_ERROR', error };
}

export function loading(loading) {
    return { type: 'TIPO_EQUIPO_LIST_LOADING', loading };
}

export function success(loaded) {
    return { type: 'TIPO_EQUIPO_LIST_SUCCESS', loaded };
}

export function load(page = '/api/tipo_equipos') {
    return dispatch => {
        dispatch(loading(true));
        dispatch(error(''));

        fetch(page)
            .then(response =>
                response.json()
            )
            .then(retrieved => {
                dispatch(loading(false));
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}

export function reset(eventSource) {
    return dispatch => {

        dispatch({ type: 'TIPO_EQUIPO_LIST_RESET' });
    };
}