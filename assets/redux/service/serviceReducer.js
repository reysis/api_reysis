import { SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR } from './serviceTypes'

const initialState = {
    loading: false,
    services: [],
    error: ''
}

const serviceReducer = (state = initialState, { type, payload }) => {
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
                error: ''
            }
        case SERVICE_LIST_ERROR:
            return {
                loading: false,
                services: [],
                error: payload
            }
        default:
            return state
    }
}

export default serviceReducer
