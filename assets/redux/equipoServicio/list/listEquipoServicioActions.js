import {
    LIST_ES_SUCCESS,
    LIST_ES_REQUEST,
    LIST_ES_ERROR
} from './listEquipoServicioTypes'

import { fetch } from "../../../utils/dataAccess";
import {getHeaders} from "../../utiles";

export const listESRequest = () => {
    return {
        type: LIST_ES_REQUEST
    };
}

export const listESSuccess = (retrieved) => {
    return {
        type: LIST_ES_SUCCESS,
        payload: retrieved
    };
}

export const listESError = (error) => {
    return {
        type: LIST_ES_ERROR,
        payload: error
    };
}

export const listESFetch = (url) => (dispatch, getState) => {
    dispatch(listESRequest());

    const method = "GET"
    const headers = getHeaders(getState);
    return fetch(url, {method, headers})
        .then(res => res.json())
        .then(res => {
            dispatch(listESSuccess(res))
        })
        .catch(error => {
            dispatch(listESError(error.message))
            throw error.message;
        })
}


