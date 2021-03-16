import {
    WHYUS_LIST_ERROR,
    WHYUS_LIST_REQUEST,
    WHYUS_LIST_SUCCESS
} from "./whyusListTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'
import {LIST_TURNO_SUCCESS} from "../../turno/list/listTurnoTypes";

export const listWhyusRequest = () => {
    return {
        type: WHYUS_LIST_REQUEST
    };
};

export const listWhyusSuccess = whyus => {
    return {
        type: WHYUS_LIST_SUCCESS,
        payload: whyus
    };
};

export const listWhyusError = error => {
    return {
        type: WHYUS_LIST_ERROR,
        payload: error
    };
};

export const listWhyusFetch = () => (dispatch, getState) => {
    dispatch(listWhyusRequest());

    const page = "/api/whyuses";
    const headers = getHeaders(getState);

    return fetch(page, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(listWhyusSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(listWhyusError(error.message));
            throw error.message;
        });
};