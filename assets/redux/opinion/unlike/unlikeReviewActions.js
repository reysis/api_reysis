import { fetch } from '../../../utils/dataAccess';
import {
    UNLIKE_OPINION_CLEAR_ALL,
    UNLIKE_OPINION_ERROR,
    UNLIKE_OPINION_SUCCESS,
    UNLIKE_OPINION_REQUEST
} from './unlikeReviewTypes'
import {getHeaders} from "../../utiles";

export function unlikeOpinionError(error) {
    return {
        type: UNLIKE_OPINION_ERROR,
        payload: error
    };
}

export function unlikeOpinionRequest() {
    return {
        type: UNLIKE_OPINION_REQUEST
    };
}

export function unlikeOpinionSuccess(unliked) {
    return {
        type: UNLIKE_OPINION_SUCCESS,
        payload: unliked
    };
}

export function unlikeOpinionDelete(item) {
    return dispatch => {
        dispatch(unlikeOpinionRequest());

        let headers = getHeaders();
        return fetch(item, { method: 'DELETE', headers })
            .then(res => {
                dispatch(unlikeOpinionSuccess(true));
            })
            .catch(e => {
                dispatch(unlikeOpinionError(e.message));
                throw e.message;
            });
    };
}

export const unlikeReviewClearAll = () => {
    return {
        type: UNLIKE_OPINION_CLEAR_ALL
    };
};