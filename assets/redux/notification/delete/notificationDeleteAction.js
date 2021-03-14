import { fetch } from '../../../utils/dataAccess';
import {
    NOTIFICATION_DELETE_CLEAR_ALL,
    NOTIFICATION_DELETE_ERROR,
    NOTIFICATION_DELETE_REQUEST,
    NOTIFICATION_DELETE_SUCCESS
} from './notificationDeleteTypes'
import {getHeaders} from "../../utiles";

export function notificationDeleteError(error) {
    return { type: NOTIFICATION_DELETE_ERROR, error };
}

export function notificationDeleteRequest() {
    return { type: NOTIFICATION_DELETE_REQUEST };
}

export function notificationDeleteSuccess(deleted) {
    return { type: NOTIFICATION_DELETE_SUCCESS, deleted };
}

export function notificationDelete(item) {
    return dispatch => {
        dispatch(notificationDeleteRequest());

        let headers = getHeaders();
        return fetch(item, { method: 'DELETE', headers })
            .then(res => {
                dispatch(notificationDeleteSuccess(true));
            })
            .catch(e => {
                dispatch(notificationDeleteError(e.message));
            });
    };
}

export function notifiationDeleteClearAll(){
    return {type: NOTIFICATION_DELETE_CLEAR_ALL}
}
