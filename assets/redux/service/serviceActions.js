import { SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR } from './serviceTypes'
import { fetch } from '../../utils/dataAccess'

export const serviceRequest = () => {
    return {
        type: SERVICE_LIST_REQUEST
    }
}

export const serviceSuccess = (services) => {
    return {
        type: SERVICE_LIST_SUCCESS,
        payload: services
    }
}

export const serviceError = (error) => {
    return {
        type: SERVICE_LIST_ERROR,
        payload: error
    }
}

export const serviceFetch = (page = "/api/tipos_servicios") => dispatch => {
    dispatch(serviceRequest());

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const response = res['hydra:member'].map(value => {
                return {
                    id: value['@id'],
                    nombre: value['nombre'],
                    descripcion: value['descripcion'],
                    image: value['image']
                }
            })
            dispatch(serviceSuccess(response));
        })
        .catch(error => {
            dispatch(serviceError(error.message));
        })
}