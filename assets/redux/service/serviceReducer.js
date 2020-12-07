import {
    SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR,
    SERVICE_ITEM_REQUEST, SERVICE_ITEM_SUCCESS, SERVICE_ITEM_ERROR
} from './serviceTypes'

const initialState = {
    loading: false,
    services: [],
    totalItems: 0,
    currentPage: 1,
    lastPage: 1,
    error: null,
    itemLoading: false,
    itemService: {},
    itemError: null
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
                error: null
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
        case SERVICE_ITEM_REQUEST:
            return {
                ...state,
                itemLoading: true
            }
        case SERVICE_ITEM_SUCCESS:
            return {
                itemLoading: false,
                itemService: payload,
                itemError: null
            }
        case SERVICE_ITEM_ERROR:
            return {
                itemLoading: false,
                itemService: {},
                itemError: payload
            }
        default:
            return state
    }
}

export default serviceReducer
