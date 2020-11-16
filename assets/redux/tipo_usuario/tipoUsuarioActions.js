import { TIPO_USUARIO_REQUEST, TIPO_USUARIO_SUCCESS, TIPO_USUARIO_ERROR } from './tipoUsuarioTypes'
import { fetch } from '../../utils/dataAccess'

export const tipoUsuarioRequest = () => {
	return {
		type: TIPO_USUARIO_REQUEST
	}
}

export const tipoUsuarioSuccess = (tipoUsuarios) => {
	return {
		type: TIPO_USUARIO_SUCCESS,
		payload: tipoUsuarios
	}
}

export const tipoUsuarioError = (error) => {
	return {
		type: TIPO_USUARIO_ERROR, 
		payload: error
	}
}

export const tipoUsuarioFetch = (page = '/api/tipo_usuarios') => dispatch => {
    dispatch(tipoUsuarioRequest());

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const response = res['hydra:member'].map(value => {
                return {
                    id: value['@id'],
                    tipo: value['tipo']
                }
            })
            dispatch(tipoUsuarioSuccess(response));
        })
        .catch(error => {
            dispatch(tipoUsuarioError(error.message));
        })
}