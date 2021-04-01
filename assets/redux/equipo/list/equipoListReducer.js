import {
    LIST_EQUIPO_SUCCESS,
    LIST_EQUIPO_REQUEST,
    LIST_EQUIPO_ERROR
} from './equipoListTypes'

const initialState = {
    loading: false,
    equipos: null,
    error: null
}

const listEquipoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_EQUIPO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_EQUIPO_SUCCESS:
            return {
                loading: false,
                equipos: payload,
                error: null
            }
        case LIST_EQUIPO_ERROR:
            return {
                loading: false,
                equipos: null,
                error: payload
            }
        default:
            return state
    }
}

export default listEquipoReducer