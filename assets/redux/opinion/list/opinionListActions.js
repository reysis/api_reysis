import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionListTypes'
import { fetch } from '../../../utils/dataAccess'
import {getHeaders} from "../../utiles";
import {listTurnoError, listTurnoSuccess} from "../../turno/list/listTurnoActions";

export const opinionListRequest = () => {
    return {
        type: OPINIONS_LIST_REQUEST
    }
}

export const opinionListSuccess = (opinions) => {
    return {
        type: OPINIONS_LIST_SUCCESS,
        payload: opinions
    }
}

export const opinionListError = (error) => {
    return {
        type: OPINIONS_LIST_ERROR,
        payload: error
    }
}

export const opinionListFetch = (url) => (dispatch, getState) => {
    dispatch(opinionListRequest());

    const headers = getHeaders(getState);

    fetch(url, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(opinionListSuccess(res));
        })
        .catch(error => {
            dispatch(opinionListError(error.message));
        });
}
