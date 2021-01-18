import {
    SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR
} from './serviceListTypes'

const initialState = {
    loading: false,
    services: null,
    error: null,
}

const serviceListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SERVICE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SERVICE_LIST_SUCCESS:
            return {
                loading: false,
                services: payload,
                error: null
            }
        case SERVICE_LIST_ERROR:
            return {
                loading: false,
                error: payload,
                services: null
            }
                default:
            return state
    }
}

export default serviceListReducer
