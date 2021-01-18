import {
    OPINION_UPDATE_ERROR,
    OPINION_UPDATE_REQUEST,
    OPINION_UPDATE_SUCCESS
} from './updateOpinionTypes'

const initialState = {
    loading: false,
    opinion: null,
    error: null
}

const opinionUpdateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPINION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OPINION_UPDATE_SUCCESS:
            return {
                loading: false,
                opinion: payload,
                error: null
            }
        case OPINION_UPDATE_ERROR:
            return {
                loading: false,
                opinion: null,
                error: payload
            }
        default:
            return state
    }
}

export default opinionUpdateReducer