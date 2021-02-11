import {
    LIST_TURNO_ERROR,
    LIST_TURNO_REQUEST,
    LIST_TURNO_SUCCESS
} from "./listTurnoTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const listTurnoRequest = () => {
    return {
        type: LIST_TURNO_REQUEST
    };
};

export const listTurnoSuccess = turnos => {
    return {
        type: LIST_TURNO_SUCCESS,
        payload: turnos
    };
};

export const listTurnoError = error => {
    return {
        type: LIST_TURNO_ERROR,
        payload: error
    };
};

export const listTurnoFetch = () => (dispatch, getState) => {
    dispatch(listTurnoRequest());

    const page = "/api/turnos";
    const headers = getHeaders(getState);

    fetch(page, {headers})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch(listTurnoSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(listTurnoError(error.message));
        });
};