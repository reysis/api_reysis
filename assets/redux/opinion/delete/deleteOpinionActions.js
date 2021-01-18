import { fetch } from '../../utils/dataAccess';
import {
    OPINION_DELETE_ERROR,
    OPINION_DELETE_REQUEST,
    OPINION_DELETE_SUCCESS
} from './deleteOpinionTypes'
export function opinionError(error) {
    return { type: OPINION_DELETE_ERROR, error };
}

export function loading(loading) {
    return { type: OPINION_DELETE_REQUEST, loading };
}

export function success(deleted) {
    return { type: OPINION_DELETE_SUCCESS, deleted };
}

export function del(item) {
    return dispatch => {
        dispatch(loading(true));

        return fetch(item['@id'], { method: 'DELETE' })
            .then(() => {
                dispatch(loading(false));
                dispatch(success(item));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}
