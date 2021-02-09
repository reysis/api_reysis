import {
    OPINION_CREATE_SUCCESS,
    OPINION_CREATE_REQUEST,
    OPINION_CREATE_ERROR
} from "./CREATEOpinionTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const createOpinionRequest = () => {
    return {
        type: OPINION_CREATE_REQUEST
    };
};

export const createOpinionSuccess = turno => {
    return {
        type: OPINION_CREATE_SUCCESS,
        payload: turno
    };
};

export const createOpinionError = error => {
    return {
        type: OPINION_CREATE_ERROR,
        payload: error
    };
};

export const createOpinionFetch = ({
   reviewText,
   stars
}) => (dispatch, getState) => {
    dispatch(createOpinionRequest());

    const page = "/api/reviews";
    const method = "POST";
    const body = JSON.stringify({
        reviewText,
        likes: 0,
        stars
    })
    const headers = getHeaders(getState);

    fetch(page, { method, body, headers })
        .then(res => res.json())
        .then(res => {
            dispatch(createOpinionSuccess(res));
        })
        .catch(error => {
            dispatch(createOpinionError(error.message));
        });
};