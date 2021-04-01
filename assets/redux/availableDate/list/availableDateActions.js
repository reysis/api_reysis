import {
    AVAILABLE_DATE_LIST_SUCCESS,
    AVAILABLE_DATE_LIST_REQUEST,
    AVAILABLE_DATE_LIST_ERROR
} from './availableDateTypes';
import { fetch } from '../../../utils/dataAccess'

export const availableDateRequest = () => {
    return {
        type: AVAILABLE_DATE_LIST_REQUEST
    }
}

export const availableDateSuccess = (availableDates) => {
    return {
        type: AVAILABLE_DATE_LIST_SUCCESS,
        payload: availableDates
    }
}

export const availableDateError = (error) => {
    return {
        type: AVAILABLE_DATE_LIST_ERROR,
        payload: error
    }
}

export const availableDateFetch = (url) => async dispatch => {
    dispatch(availableDateRequest());

    try {
        const review_resp = await fetch(url);
        const response = await review_resp.json();
        dispatch(availableDateSuccess(response));
    }
    catch (error) {
        dispatch(availableDateError(error.message));
    }
}
