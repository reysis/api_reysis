import {
    SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR,
    SERVICE_ITEM_REQUEST, SERVICE_ITEM_SUCCESS, SERVICE_ITEM_ERROR
} from './serviceTypes'
import { fetch } from '../../utils/dataAccess'

export const serviceRequest = () => {
    return {
        type: SERVICE_LIST_REQUEST
    }
}

export const serviceItemRequest = () => {
    return {
        type: SERVICE_ITEM_REQUEST
    }
}

export const serviceSuccess = (services) => {
    return {
        type: SERVICE_LIST_SUCCESS,
        payload: services
    }
}

export const serviceItemSuccess = (service) => {
    return {
        type: SERVICE_ITEM_SUCCESS,
        payload: service
    }
}

export const serviceError = (error) => {
    return {
        type: SERVICE_LIST_ERROR,
        payload: error
    }
}

export const serviceItemError = (error) => {
    return {
        type: SERVICE_ITEM_ERROR,
        payload: error
    }
}

export const serviceFetch = (pag = 1) => dispatch => {
    dispatch(serviceRequest());

    const page = `/api/servicios?page=${pag}`

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const services = res['hydra:member'].map(value => {
                let image = null
                if (value['image'].length)
                    image = value['image'][0]['contentUrl']
                return {
                    id: value['@id'],
                    nombre: value['nombre'],
                    descripcion: value['shortDescription'],
                    image
                }
            })
            const totalItems = res["hydra:totalItems"]
            const currentPage = pag
            let lastPage = 1
            if (res["hydra:view"])
                // /api/servicios?page=3
                lastPage = Number.parseInt(res["hydra:view"]["hydra:last"].split('=')[1])
            dispatch(serviceSuccess({ services, totalItems, lastPage, currentPage }));
        })
        .catch(error => {
            dispatch(serviceError(error.message));
        })
}

export const serviceItemFetch = (id) => dispatch => {
    dispatch(serviceItemRequest());

    const page = id

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const images = res['image'].map(value => {
                return {
                    id: value['@id'],
                    url: value['contentUrl']
                }
            })
            const servicio = {
                id: res['@id'],
                nombre: res['nombre'],
                descripcion: res['descripcion'],
                shortDescription: res['shortDescription'],
                images
            }
            dispatch(serviceItemSuccess(servicio));
        })
        .catch(error => {
            dispatch(serviceItemError(error.message));
        })
}