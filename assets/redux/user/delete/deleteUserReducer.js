import {
    USER_DELETE_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS
} from './deleteUserTypes'

const initialState = {
    loading: false,
    user: null,
    error: null
}

const userDeleteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                user: payload,
                error: null
            }
        case USER_DELETE_ERROR:
            return {
                loading: false,
                user: null,
                error: payload
            }
        default:
            return state
    }
}

export default userDeleteReducer