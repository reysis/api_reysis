import {
    OPINION_CREATE_ERROR,
    OPINION_CREATE_REQUEST,
    OPINION_CREATE_SUCCESS
} from './createOpinionTypes'

const initialState = {
    loading: false,
    opinion: null,
    error: null
}

const opinionCreateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPINION_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OPINION_CREATE_SUCCESS:
            return {
                loading: false,
                opinion: payload,
                error: null
            }
        case OPINION_CREATE_ERROR:
            return {
                loading: false,
                opinion: null,
                error: payload
            }
        default:
            return state
    }
}

export default opinionCreateReducer