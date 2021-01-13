import {
    USER_SHOW_REQUEST,
    USER_SHOW_SUCCESS,
    USER_SHOW_ERROR,
    USER_SHOW_CLEAR_ERROR
} from './userShowTypes'

const initialState = {
    loading: false,
    user: null,
    error: null
}

const userShowReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_SHOW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SHOW_SUCCESS:
            return {
                loading: false,
                user: payload,
                error: null
            }
        case USER_SHOW_ERROR:
            return {
                loading: false,
                user: null,
                error: payload
            }
        case USER_SHOW_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default userShowReducer