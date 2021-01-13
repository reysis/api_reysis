import { OPINION_SHOW_REQUEST, OPINION_SHOW_SUCCESS, OPINION_SHOW_ERROR } from './opinionShowTypes'

const initialState = {
    loading: false,
    opinion: null,
    error: ''
}

const opinionListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPINION_SHOW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OPINION_SHOW_SUCCESS:
            return {
                loading: false,
                opinion: payload,
                error: ''
            }
        case OPINION_SHOW_ERROR:
            return {
                loading: false,
                opinion: null,
                error: payload
            }
        default:
            return state
    }
}

export default opinionListReducer