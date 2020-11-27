import {
    TURNO_CREATE_REQUEST,
    TURNO_CREATE_SUCCESS,
    TURNO_CREATE_ERROR,
    TURNO_CREATE_CLEAR_ERROR
} from './createTurnoTypes'

const initialState = {
    loading: false,
    turno: null,
    error: null
}

const createTurnoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TURNO_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TURNO_CREATE_SUCCESS:
            return {
                loading: false,
                turno: payload,
                error: null
            }
        case TURNO_CREATE_ERROR:
            return {
                loading: false,
                turno: null,
                error: payload
            }
        case TURNO_CREATE_CLEAR_ERROR: 
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default createTurnoReducer