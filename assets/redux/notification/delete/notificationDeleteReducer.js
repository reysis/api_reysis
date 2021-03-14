import {
    NOTIFICATION_DELETE_SUCCESS,
    NOTIFICATION_DELETE_REQUEST,
    NOTIFICATION_DELETE_ERROR,
    NOTIFICATION_DELETE_CLEAR_ALL
} from './notificationDeleteTypes'

const initialState = {
    loading: false,
    deleted: null,
    error: null
}

const opinionDeleteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NOTIFICATION_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NOTIFICATION_DELETE_SUCCESS:
            return {
                loading: false,
                deleted: payload,
                error: null
            }
        case NOTIFICATION_DELETE_ERROR:
            return {
                loading: false,
                deleted: null,
                error: payload
            }
        case NOTIFICATION_DELETE_CLEAR_ALL:
            return initialState;
        default:
            return state
    }
}

export default opinionDeleteReducer