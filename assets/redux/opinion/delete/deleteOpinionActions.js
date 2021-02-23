import { fetch } from '../../../utils/dataAccess';
import {
    OPINION_DELETE_ERROR,
    OPINION_DELETE_REQUEST,
    OPINION_DELETE_SUCCESS,
    OPINION_DELETE_CLEAR_ALL
} from './deleteOpinionTypes'
import {getHeaders} from "../../utiles";
export function opinionDeleteError(error) {
    return { type: OPINION_DELETE_ERROR, error };
}

export function opinionDeleteRequest() {
    return { type: OPINION_DELETE_REQUEST };
}

export function opinionDeleteSuccess(deleted) {
    return { type: OPINION_DELETE_SUCCESS, deleted };
}

export function opinionDelete(item) {
    return dispatch => {
        dispatch(opinionDeleteRequest());

        let headers = getHeaders();
        return fetch(item, { method: 'DELETE', headers })
            .then(res => {
                dispatch(opinionDeleteSuccess(true));
            })
            .catch(e => {
                dispatch(opinionDeleteError(e.message));
            });
    };
}

export function opinionDeleteClearAll(){
    return {type: OPINION_DELETE_CLEAR_ALL}
}
