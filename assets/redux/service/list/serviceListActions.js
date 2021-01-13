import {
    SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_ERROR
} from './serviceListTypes'
import { fetch } from '../../../utils/dataAccess'

export const serviceListRequest = () => {
    return {
        type: SERVICE_LIST_REQUEST
    }
}

export const serviceListSuccess = (services) => {
    return {
        type: SERVICE_LIST_SUCCESS,
        payload: services
    }
}

export const serviceListError = (error) => {
    return {
        type: SERVICE_LIST_ERROR,
        payload: error
    }
}

export const servicesFetch = (pag = 1) => dispatch => {
    dispatch(serviceListRequest());

    const page = `/api/servicios?page=${pag}`

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const services = res['hydra:member'].map(value => {
                let image = null
                if (value['serviceImage'] && value['serviceImage']['contentUrl'])
                    image = value['serviceImage']['contentUrl']
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
                lastPage = Number.parseInt(res["hydra:view"]["hydra:last"].split('=')[1])
            dispatch(serviceListSuccess({ services, totalItems, lastPage, currentPage }));
        })
        .catch(error => {
            dispatch(serviceListError(error.message));
        })
}