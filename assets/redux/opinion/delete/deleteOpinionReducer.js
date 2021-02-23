import {
    OPINION_DELETE_CLEAR_ALL,
    OPINION_DELETE_ERROR,
    OPINION_DELETE_REQUEST,
    OPINION_DELETE_SUCCESS
} from './deleteOpinionTypes'

const initialState = {
    loading: false,
    deleted: null,
    error: null
}

const opinionDeleteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPINION_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OPINION_DELETE_SUCCESS:
            return {
                loading: false,
                deleted: payload,
                error: null
            }
        case OPINION_DELETE_ERROR:
            return {
                loading: false,
                deleted: null,
                error: payload
            }
        case OPINION_DELETE_CLEAR_ALL:
            return initialState;
        default:
            return state
    }
}

export default opinionDeleteReducer