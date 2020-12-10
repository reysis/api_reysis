import { NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_LIST_ERROR } from './notificationTypes'

const initialState = {
    loading: false,
    notifications: [],
    totalItems: 0,
    currentPage: 1,
    lastPage: 1,
    error: ''
}

const notificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NOTIFICATION_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NOTIFICATION_LIST_SUCCESS:
            const notifications = state.notifications.concat(payload.notifications)
            return {
                loading: false,
                notifications,
                totalItems: payload.totalItems,
                currentPage: payload.currentPage,
                lastPage: payload.lastPage,
                error: ''
            }
        case NOTIFICATION_LIST_ERROR:
            return {
                loading: false,
                notifications: [],
                totalItems: 0,
                currentPage: 1,
                lastPage: 1,
                error: payload
            }
        default:
            return state
    }
}

export default notificationReducer