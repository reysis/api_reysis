import {
    LIST_TURNO_DISPONIBLE_ERROR,
    LIST_TURNO_DISPONIBLE_REQUEST,
    LIST_TURNO_DISPONIBLE_SUCCESS,
    LIST_TURNO_CLEAR_ALL
} from './listTurnoDisponibleTypes'

const initialState = {
    loading: false,
    turnosDisponibles: null,
    error: null
}

const listTurnoDisponiblesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_TURNO_DISPONIBLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_TURNO_DISPONIBLE_SUCCESS:
            return {
                loading: false,
                turnosDisponibles: payload,
                error: null
            }
        case LIST_TURNO_DISPONIBLE_ERROR:
            return {
                loading: false,
                turnosDisponibles: null,
                error: payload
            }
        case LIST_TURNO_CLEAR_ALL:
            return initialState
        default:
            return state
    }
}

export default listTurnoDisponiblesReducer