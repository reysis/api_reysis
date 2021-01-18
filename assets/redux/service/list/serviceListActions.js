import {
    SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR
} from './serviceListTypes'
import { fetch } from '../../../utils/dataAccess'

export const serviceListRequest = () => {
    return {
        type: SERVICE_LIST_REQUEST
    }
}

export const serviceListSuccess = (services) => {
    return {
        type: SERVICE_LIST_SUCCESS,
        payload: services
    }
}

export const serviceListError = (error) => {
    return {
        type: SERVICE_LIST_ERROR,
        payload: error
    }
}

export const servicesFetch = (pag) => dispatch => {
    dispatch(serviceListRequest());

    fetch(pag)
        .then(res => res.json())
        .then(res => {
            dispatch(serviceListSuccess(res));
        })
        .catch(error => {
            dispatch(serviceListError(error.message));
        })
}