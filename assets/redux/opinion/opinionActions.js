import { fetch } from '../../utils/dataAccess'
import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionTypes'

export const opinionRequest = () => {
    return {
        type: OPINIONS_LIST_REQUEST
    }
}

export const opinionSuccess = (opinions) => {
    return {
        type: OPINIONS_LIST_SUCCESS,
        payload: opinions
    }
}

export const opinionError = (error) => {
    return {
        type: OPINIONS_LIST_ERROR,
        payload: error
    }
}

export const opinionFetch = (page = "/api/reviews") => dispatch => {
    dispatch(opinionRequest());

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const resource = res['hydra:member'].map(value => {
                /* add those values */
                value['autor'] = ''
                value['image'] = ''
                return {
                    id: value['@id'],
                    reviewText: value['reviewText'],
                    autor: value['autor'],
                    image: value['image']
                }
            })
            dispatch(opinionSuccess(resource));
        })
        .catch(error => {
            dispatch(opinionError(error.message));
        })
}
