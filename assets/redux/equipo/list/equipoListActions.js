import {
    LIST_EQUIPO_ERROR,
    LIST_EQUIPO_REQUEST,
    LIST_EQUIPO_SUCCESS
} from "./equipoListTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const listEquipoRequest = () => {
    return {
        type: LIST_EQUIPO_REQUEST
    };
};

export const listEquipoSuccess = turnos => {
    return {
        type: LIST_EQUIPO_SUCCESS,
        payload: turnos
    };
};

export const listEquipoError = error => {
    return {
        type: LIST_EQUIPO_ERROR,
        payload: error
    };
};

export const listEquipoFetch = () => (dispatch, getState) => {
    dispatch(listEquipoRequest());

    const page = "/api/equipos";
    const headers = getHeaders(getState);
    return fetch(page, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(listEquipoSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(listEquipoError(error.message));
            throw error.message;
        });
};