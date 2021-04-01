import {
    LIST_TBS_SUCCESS,
    LIST_TBS_REQUEST,
    LIST_TBS_ERROR
} from "./listTallerBrindaServicioTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const listTBSRequest = () => {
    return {
        type: LIST_TBS_REQUEST
    };
};

export const listTBSSuccess = turnos => {
    return {
        type: LIST_TBS_SUCCESS,
        payload: turnos
    };
};

export const listTBSError = error => {
    return {
        type: LIST_TBS_ERROR,
        payload: error
    };
};

export const listTBSFetch = (url) => (dispatch, getState) => {
    dispatch(listTBSRequest());

    const headers = getHeaders(getState);

    return fetch(url, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(listTBSSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(listTBSError(error.message));
            throw error.message;
        });
};