import { CONFIGURATION_REQUEST, CONFIGURATION_SUCCESS, CONFIGURATION_ERROR } from './configurationTypes'
import { fetch } from '../../utils/dataAccess'

export const configurationRequest = () => {
    return {
        type: CONFIGURATION_REQUEST
    }
}

export const configurationSuccess = (configurations) => {
    return {
        type: CONFIGURATION_SUCCESS,
        payload: configurations
    }
}

export const configurationError = (error) => {
    return {
        type: CONFIGURATION_ERROR,
        payload: error
    }
}

export const loadConfiguration = () => dispatch => {
    dispatch(configurationRequest());

    const page = '/api/configurations'

    fetch(page)
        .then(res => res.json())
        .then(res => {
            let response = {}
            if (res['hydra:member'].length > 0) {
                response = { ...res['hydra:member'][0] };
                response.values = '<ul><li>Ullam aliquid qui sint.</li><li>Repellat rerum dolor accusamus.</li><li>Rerum quibusdam rerum sunt voluptatibus.</li></ul>'
                response.meetOurTeam = 'Ullam aliquid qui sint. Repellat rerum dolor accusamus sit quos nihil voluptas. Rerum quibusdam rerum sunt voluptatibus. Dignissimos magni culpa eligendi in debitis. Et et earum ducimus aut id.'
                response.aboutUs = 'Rerum quibusdam rerum sunt voluptatibus. Dignissimos magni culpa eligendi in debitis. Et et earum ducimus aut id.'
                response.whyUs = ["Garantía en nuestros servicios", "Garantía en nuestros servicios",
                    "Velocidad de entrega", "Personal capacitado", "Velocidad de entrega",
                    "Garantía en nuestros servicios", "Personal capacitado"]
                response.experienceYears = 16
                response.clientsPerYear = 620
                response.rating = 4.3
            }

            dispatch(configurationSuccess(response));
        })
        .catch(error => {
            dispatch(configurationError(error.message));
        })
}