import { SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR } from './serviceTypes'

const initialState = {
    loading: false,
    services: [],
    totalItems: 0,
    currentPage: 1,
    lastPage: 1,
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
                services: payload.services,
                totalItems: payload.totalItems,
                currentPage: payload.currentPage,
                lastPage: payload.lastPage,
                error: ''
            }
        case SERVICE_LIST_ERROR:
            return {
                loading: false,
                services: [],
                totalItems: 0,
                currentPage: 1,
                lastPage: 1,
                error: payload
            }
        default:
            return state
    }
}

export default serviceReducer
