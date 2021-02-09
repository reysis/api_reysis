import {
    OPINION_UPDATE_SUCCESS,
    OPINION_UPDATE_REQUEST,
    OPINION_UPDATE_ERROR
} from "./updateOpinionTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const updateOpinionRequest = () => {
    return {
        type: OPINION_UPDATE_REQUEST
    };
};

export const updateOpinionSuccess = turno => {
    return {
        type: OPINION_UPDATE_SUCCESS,
        payload: turno
    };
};

export const updateOpinionError = error => {
    return {
        type: OPINION_UPDATE_ERROR,
        payload: error
    };
};

export const updateOpinionFetch = ({
    reviewText,
    likes,
    stars,
    iri
}) => (dispatch, getState) => {
    dispatch(updateOpinionRequest());

    const page = iri;
    const method = "PUT";
    const body = JSON.stringify({
        reviewText,
        likes: 0,
        stars
    })
    const headers = getHeaders(getState);

    fetch(page, { method, body, headers })
        .then(res => res.json())
        .then(res => {
            dispatch(updateOpinionSuccess(res));
        })
        .catch(error => {
            dispatch(updateOpinionError(error.message));
        });
};