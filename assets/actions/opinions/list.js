import {
    fetch,
    normalize,
    extractHubURL,
    mercureSubscribe as subscribe
} from '../../utils/dataAccess';

export function error(error) {
    return { type: 'OPINIONS_LIST_ERROR', error };
}

export function loading(loading) {
    return { type: 'OPINIONS_LIST_LOADING', loading };
}

export function success(loaded) {
    return { type: 'OPINIONS_LIST_SUCCESS', loaded };
}

export function load(page = "/api/reviews") {
    return dispatch => {
        dispatch(loading(true));
        dispatch(error(''));

        fetch(page)
            .then(response =>
                response
                    .json()
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
        if (eventSource) eventSource.close();

        dispatch({ type: 'OPINIONS_LIST_RESET' });
        //dispatch(deleteSuccess(null));
    };
}

export function mercureSubscribe(hubURL, topics) {
    return dispatch => {
        const eventSource = subscribe(hubURL, topics);
        dispatch(mercureOpen(eventSource));
        eventSource.addEventListener('message', event =>
            dispatch(mercureMessage(normalize(JSON.parse(event.data))))
        );
    };
}

export function mercureOpen(eventSource) {
    return { type: 'OPINIONS_LIST_MERCURE_OPEN', eventSource };
}

export function mercureMessage(retrieved) {
    return dispatch => {
        if (1 === Object.keys(retrieved).length) {
            dispatch({ type: 'OPINIONS_LIST_MERCURE_DELETED', retrieved });
            return;
        }

        dispatch({ type: 'OPINIONS_LIST_MERCURE_MESSAGE', retrieved });
    };
}
