import {
    LIST_TURNO_REQUEST,
    LIST_TURNO_SUCCESS,
    LIST_TURNO_ERROR
} from './listTurnoTypes'

const initialState = {
    loading: false,
    turnos: null,
    error: null
}

const listTurnoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_TURNO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_TURNO_SUCCESS:
            return {
                loading: false,
                turnos: payload,
                error: null
            }
        case LIST_TURNO_ERROR:
            return {
                loading: false,
                turnos: null,
                error: payload
            }
        default:
            return state
    }
}

export default listTurnoReducer