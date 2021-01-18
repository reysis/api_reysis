import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionListTypes'
import { fetch } from '../../../utils/dataAccess'

export const opinionRequest = () => {
    return {
        type: OPINIONS_LIST_REQUEST
    }
}

export const opinionSuccess = (opinions) => {
    return {
        type: OPINIONS_LIST_SUCCESS,
        payload: opinions
    }
}

export const opinionError = (error) => {
    return {
        type: OPINIONS_LIST_ERROR,
        payload: error
    }
}

export const opinionFetch = (url) => async dispatch => {
    dispatch(opinionRequest());

    try {
        console.log(url);
        const review_resp = await fetch(url);
        const response = await review_resp.json();
        console.log(response);
        dispatch(opinionSuccess(response));
    }
    catch (error) {
        console.error(error.message)
        dispatch(opinionError(error.message));
    }
}
