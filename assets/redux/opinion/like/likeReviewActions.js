import {
    LIKE_REVIEW_ERROR,
    LIKE_REVIEW_SUCCESS,
    LIKE_REVIEW_REQUEST,
    LIKE_REVIEW_CLEAR_ALL
} from './likeReviewTypes'
import { fetch } from '../../../utils/dataAccess'
import {getHeaders} from "../../utiles";

export const likeReviewRequest = () => {
    return {
        type: LIKE_REVIEW_REQUEST
    }
}

export const likeReviewSuccess = (liked) => {
    return {
        type: LIKE_REVIEW_SUCCESS,
        payload: liked
    }
}

export const likeReviewError = (error) => {
    return {
        type: LIKE_REVIEW_ERROR,
        payload: error
    }
}

export const likeReviewFetch = ({idUser, idReview}) => (dispatch, getState) => {
    dispatch(likeReviewRequest());

    const headers = getHeaders(getState);
    const method = "POST";
    const body = JSON.stringify({
        idReview,
        idUser
    })
    return fetch('/api/like-reviews', {body, method,headers})
        .then(res => res.json())
        .then(res => {
            dispatch(likeReviewSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(likeReviewError(error.message));
            throw error.message;
        });
}

export const likeReviewClearAll = () => {
    return {
        type: LIKE_REVIEW_CLEAR_ALL
    };
};