import {
    UNLIKE_OPINION_CLEAR_ALL,
    UNLIKE_OPINION_ERROR,
    UNLIKE_OPINION_REQUEST,
    UNLIKE_OPINION_SUCCESS
} from './unlikeReviewTypes'

const initialState = {
    loading: false,
    unliked: null,
    error: null
}

const unlikeOpinionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UNLIKE_OPINION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UNLIKE_OPINION_SUCCESS:
            return {
                loading: false,
                unliked: payload,
                error: null
            }
        case UNLIKE_OPINION_ERROR:
            return {
                loading: false,
                unliked: null,
                error: payload
            }
        case UNLIKE_OPINION_CLEAR_ALL:
            return initialState;
        default:
            return state
    }
}

export default unlikeOpinionReducer