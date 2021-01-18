import {
    USER_SHOW_ERROR, USER_SHOW_REQUEST, USER_SHOW_SUCCESS
} from './userShowTypes';
import { fetch } from '../../../utils/dataAccess';
import { getHeaders } from '../../utiles'

export const userShowRequest = () => {
    return {
        type: USER_SHOW_REQUEST
    }
}

export const userShowSuccess = (user) => {
    return {
        type: USER_SHOW_SUCCESS,
        payload: user
    }
}

export const userShowError = (error) => {
    return {
        type: USER_SHOW_ERROR,
        payload: error
    }
}

export const userShow = (id) => (dispatch, getState) => {
    dispatch(userShowRequest());

    const page = `/api/users/${id}`;
    const headers = getHeaders(getState);

    fetch(page, {headers})
        .then(res => res.json())
        .then(res => {
            dispatch(userShowSuccess(res));
        })
        .catch(error => {
            dispatch(userShowError(error.message));
        })
}