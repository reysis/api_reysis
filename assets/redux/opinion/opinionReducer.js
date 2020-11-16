import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionTypes'

const initialState = {
    loading: false,
    opinions: [],
    error: ''
}

const opinionReducer = (state = initialState, { type, payload }) => {
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
                error: ''
            }
        case OPINIONS_LIST_ERROR:
            return {
                loading: false,
                opinions: [],
                error: payload
            }
        default:
            return state
    }
}

export default opinionReducer