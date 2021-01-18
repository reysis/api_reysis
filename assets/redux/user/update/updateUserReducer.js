import {
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_ERROR
} from './updateUserTypes'

const initialState = {
    loading: false,
    user: null,
    error: null
}

const updateUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                user: payload,
                error: null
            }
        case UPDATE_USER_ERROR:
            return {
                loading: false,
                user: null,
                error: payload
            }
        default:
            return state
    }
}

export default updateUserReducer