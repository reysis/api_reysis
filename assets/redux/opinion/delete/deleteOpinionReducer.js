import {
    OPINION_DELETE_ERROR,
    OPINION_DELETE_REQUEST,
    OPINION_DELETE_SUCCESS
} from './deleteOpinionTypes'

const initialState = {
    loading: false,
    opinion: null,
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
                opinion: payload,
                error: null
            }
        case OPINION_DELETE_ERROR:
            return {
                loading: false,
                opinion: null,
                error: payload
            }
        default:
            return state
    }
}

export default opinionDeleteReducer