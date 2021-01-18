import {
    TURNO_SHOW_ERROR,
    TURNO_SHOW_REQUEST,
    TURNO_SHOW_SUCCESS
} from './showTurnoTypes'

const initialState = {
    loading: false,
    turno: null,
    error: null
}

const turnoShowReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TURNO_SHOW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TURNO_SHOW_SUCCESS:
            return {
                loading: false,
                turno: payload,
                error: null
            }
        case TURNO_SHOW_ERROR:
            return {
                loading: false,
                turno: null,
                error: payload
            }
        default:
            return state
    }
}

export default turnoShowReducer