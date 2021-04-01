import {
    AVAILABLE_DATE_LIST_ERROR,
    AVAILABLE_DATE_LIST_REQUEST,
    AVAILABLE_DATE_LIST_SUCCESS
} from './availableDateTypes'

const initialState = {
    loading: false,
    availableDates: null,
    error: ''
}

const availableDateListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AVAILABLE_DATE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case AVAILABLE_DATE_LIST_SUCCESS:
            return {
                loading: false,
                availableDates: payload,
                error: ''
            }
        case AVAILABLE_DATE_LIST_ERROR:
            return {
                loading: false,
                availableDates: null,
                error: payload
            }
        default:
            return state
    }
}

export default availableDateListReducer