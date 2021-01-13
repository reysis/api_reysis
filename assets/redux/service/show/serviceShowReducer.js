import {
    SERVICE_SHOW_REQUEST, SERVICE_SHOW_SUCCESS, SERVICE_SHOW_ERROR
} from './serviceShowTypes'

const initialState = {
    loading: false,
    service: null,
    error: null,
}

const serviceShowReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SERVICE_SHOW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SERVICE_SHOW_SUCCESS:
            return {
                ...state,
                loading: false,
                service: payload,
                error: null
            }
        case SERVICE_SHOW_ERROR:
            return {
                ...state,
                loading: false,
                service: null,
                error: payload
            }
        default:
            return state
    }
}

export default serviceShowReducer
