import {
    TURNO_UPDATE_SUCCESS,
    TURNO_UPDATE_REQUEST,
    TURNO_UPDATE_ERROR
} from './updateTurnoTypes'

const initialState = {
    loading: false,
    turno: null,
    error: null
}

const turnoUpdateReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TURNO_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TURNO_UPDATE_SUCCESS:
            return {
                loading: false,
                turno: payload,
                error: null
            }
        case TURNO_UPDATE_ERROR:
            return {
                loading: false,
                turno: null,
                error: payload
            }
        default:
            return state
    }
}

export default turnoUpdateReducer