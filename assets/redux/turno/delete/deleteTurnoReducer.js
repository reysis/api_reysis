import {
    TURNO_DELETE_ERROR,
    TURNO_DELETE_REQUEST,
    TURNO_DELETE_SUCCESS
} from './deleteTurnoTypes'

const initialState = {
    loading: false,
    deleted: null,
    error: null
}

const turnoDeleteReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TURNO_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TURNO_DELETE_SUCCESS:
            return {
                loading: false,
                deleted: payload,
                error: null
            }
        case TURNO_DELETE_ERROR:
            return {
                loading: false,
                deleted: null,
                error: payload
            }
        default:
            return state
    }
}

export default turnoDeleteReducer