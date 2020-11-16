import { TIPO_USUARIO_REQUEST, TIPO_USUARIO_SUCCESS, TIPO_USUARIO_ERROR } from './tipoUsuarioTypes'

const initialState = {
    loading: false,
    tipoUsuarios: [],
    error: ''
}

const tipoUsuarioReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TIPO_USUARIO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TIPO_USUARIO_SUCCESS:
            return {
                loading: false,
                tipoUsuarios: payload,
                error: ''
            }
        case TIPO_USUARIO_ERROR:
            return {
                loading: false,
                tipoUsuarios: [],
                error: payload
            }
        default:
            return state
    }
}

export default tipoUsuarioReducer
