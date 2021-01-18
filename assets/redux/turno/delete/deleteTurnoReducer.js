import {
    TURNO_DELETE_ERROR,
    TURNO_DELETE_REQUEST,
    TURNO_DELETE_SUCCESS
} from './deleteTurnoTypes'

const initialState = {
    loading: false,
    user: null,
    error: null
}

const turnoShowReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TURNO_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TURNO_DELETE_SUCCESS:
            return {
                loading: false,
                user: payload,
                error: null
            }
        case TURNO_DELETE_ERROR:
            return {
                loading: false,
                user: null,
                error: payload
            }
        default:
            return state
    }
}

export default turnoShowReducer