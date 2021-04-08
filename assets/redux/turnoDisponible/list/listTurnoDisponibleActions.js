import {
    LIST_TURNO_DISPONIBLE_SUCCESS,
    LIST_TURNO_DISPONIBLE_REQUEST,
    LIST_TURNO_DISPONIBLE_ERROR,
    LIST_TURNO_CLEAR_ALL
} from "./listTurnoDisponibleTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const listTurnoDisponibleRequest = () => {
    return {
        type: LIST_TURNO_DISPONIBLE_REQUEST
    };
};

export const listTurnoDisponibleSuccess = turnos => {
    return {
        type: LIST_TURNO_DISPONIBLE_SUCCESS,
        payload: turnos
    };
};

export const listTurnoDisponibleError = error => {
    return {
        type: LIST_TURNO_DISPONIBLE_ERROR,
        payload: error
    };
};

export const listTurnoDisponibleFetch = (url) => (dispatch, getState) => {
    dispatch(listTurnoDisponibleRequest());
    const headers = getHeaders(getState);

    fetch(url, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(listTurnoDisponibleSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(listTurnoDisponibleError(error.message));
        });
};

export const listTurnoDisponibleClearAll = ()=>{
    return{
        type: LIST_TURNO_CLEAR_ALL
    }
}