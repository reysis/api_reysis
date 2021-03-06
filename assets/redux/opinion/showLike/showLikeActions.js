import {
    SHOW_LIKE_SUCCESS,
    SHOW_LIKE_REQUEST,
    SHOW_LIKE_ERROR
} from './showLikeTypes'
import { fetch } from '../../../utils/dataAccess';
import {getHeaders} from "../../utiles";

export const showLikeRequest = () => {
    return {
        type: SHOW_LIKE_REQUEST
    }
}

export const showLikeSuccess = (opinions) => {
    return {
        type: SHOW_LIKE_SUCCESS,
        payload: opinions
    }
}

export const showLikeError = (error) => {
    return {
        type: SHOW_LIKE_ERROR,
        payload: error
    }
}

export const showLikeFetch = (url) => (dispatch, getState) => {
    dispatch(showLikeRequest());

    const headers = getHeaders(getState);

    return fetch(url, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(showLikeSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(showLikeError(error.message));
            throw error.message
        });
}
