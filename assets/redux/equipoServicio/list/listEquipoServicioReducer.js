import {
    LIST_ES_ERROR,
    LIST_ES_REQUEST,
    LIST_ES_SUCCESS
} from './listEquipoServicioTypes'

const initialState = {
    loading: false,
    equipoServicio: null,
    error: null
}

const listESReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_ES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_ES_SUCCESS:
            return {
                loading: false,
                equipoServicio: payload,
                error: null
            }
        case LIST_ES_ERROR:
            return {
                loading: false,
                equipoServicio: null,
                error: payload
            }
        default:
            return state
    }
}

export default listESReducer