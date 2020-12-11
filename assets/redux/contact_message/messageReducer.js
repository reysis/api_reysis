import { CONTACT_MESSAGE_SENDING, CONTACT_MESSAGE_SUCCESS, CONTACT_MESSAGE_ERROR } from './messageTypes'

const initialState = {
    loading: false,
    message: null,
    error: null
}

const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CONTACT_MESSAGE_SENDING:
            return {
                ...state,
                loading: true
            }
        case CONTACT_MESSAGE_SUCCESS: {
            return {
                loading: false,
                message: payload,
                error: null
            }
        }
        case CONTACT_MESSAGE_ERROR:
            return {
                loading: false,
                message: null,
                error: payload
            }
        default:
            return state
    }
}

export default messageReducer