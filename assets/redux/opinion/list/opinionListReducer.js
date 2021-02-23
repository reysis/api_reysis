import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionListTypes'

const initialState = {
    loading: false,
    opinions: null,
    error: ''
}

const opinionListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPINIONS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case OPINIONS_LIST_SUCCESS:
            return {
                loading: false,
                opinions: payload,
                error: null
            }
        case OPINIONS_LIST_ERROR:
            return {
                loading: false,
                opinions: null,
                error: payload
            }
        default:
            return state
    }
}

export default opinionListReducer