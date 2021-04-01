import {
    LIST_TBS_ERROR,
    LIST_TBS_REQUEST,
    LIST_TBS_SUCCESS
} from './listTallerBrindaServicioTypes'

const initialState = {
    loading: false,
    talleres: null,
    error: null
}

const listTBSReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIST_TBS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIST_TBS_SUCCESS:
            return {
                loading: false,
                talleres: payload,
                error: null
            }
        case LIST_TBS_ERROR:
            return {
                loading: false,
                equipos: null,
                error: payload
            }
        default:
            return state
    }
}

export default listTBSReducer