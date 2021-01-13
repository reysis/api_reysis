import { OPINION_SHOW_REQUEST, OPINION_SHOW_SUCCESS, OPINION_SHOW_ERROR } from './opinionShowTypes'
import { fetch } from '../../../utils/dataAccess'

export const opinionRequest = () => {
    return {
        type: OPINION_SHOW_REQUEST
    }
}

export const opinionSuccess = (opinions) => {
    return {
        type: OPINION_SHOW_SUCCESS,
        payload: opinions
    }
}

export const opinionError = (error) => {
    return {
        type: OPINION_SHOW_ERROR,
        payload: error
    }
}

export const opinionFetch = (id) => async dispatch => {
    dispatch(opinionRequest());

    let page = "/api/reviews" + id;

    try {
        dispatch(opinionRequest());
        const review_resp = await fetch(page);
        const response = await review_resp.json();

        dispatch(opinionSuccess(response));
    }
    catch (error) {
        console.error(error.message)
        dispatch(opinionError(error.message));
    }
}
