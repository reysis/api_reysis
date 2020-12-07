import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionTypes'
import { fetch } from '../../utils/dataAccess'

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

export const opinionFetch = (pag = 0) => async dispatch => {
    dispatch(opinionRequest());

    let page = "/api/reviews"
    if (pag > 0)
        page += "?page=" + pag

    try {
        const review_resp = await fetch(page);
        const reviews = await review_resp.json();

        const responce = reviews['hydra:member'].map(value => {

            value.image = ''
            value.autor = '[Author]'

            return {
                ...value,
                id: value['@id']
            }
        })

        /*for (let i = 0; i < responce.length; i++) {
            try {
                const userLocation = responce[i].user
                const user_resp = await fetch(userLocation);
                const user = await user_resp.json();

                if (user.persona.nombre)
                    responce[i].autor = user.persona.nombre
            }
            catch (error) {
                console.error(error.message)
            }
        }*/

        dispatch(opinionSuccess(responce));
    }
    catch (error) {
        console.error(error.message)
        dispatch(opinionError(error.message));
    }
}
