import {
    SERVICE_SHOW_REQUEST, SERVICE_SHOW_SUCCESS, SERVICE_SHOW_ERROR
} from './serviceShowTypes';
import { fetch } from '../../../utils/dataAccess';

export const serviceShowRequest = () => {
    return {
        type: SERVICE_SHOW_REQUEST
    }
}

export const serviceShowSuccess = (service) => {
    return {
        type: SERVICE_SHOW_SUCCESS,
        payload: service
    }
}

export const serviceShowError = (error) => {
    return {
        type: SERVICE_SHOW_ERROR,
        payload: error
    }
}

export const serviceFetch = (id) => dispatch => {
    dispatch(serviceShowRequest());

    const page = `/api/servicios/${id}`;

    fetch(page)
        .then(res => res.json())
        .then(res => {
            let images = [];
            if (res['serviceImage'])
                images.push({
                    id: res['serviceImage']['@id'],
                    url: res['serviceImage']['contentUrl']
                })
            const servicio = {
                id: res['@id'],
                nombre: res['nombre'],
                descripcion: res['descripcion'],
                shortDescription: res['shortDescription'],
                images
            }
            dispatch(serviceShowSuccess(servicio));
        })
        .catch(error => {
            dispatch(serviceShowError(error.message));
        })
}