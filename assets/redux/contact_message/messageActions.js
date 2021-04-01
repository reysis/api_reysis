import { CONTACT_MESSAGE_SENDING, CONTACT_MESSAGE_SUCCESS, CONTACT_MESSAGE_ERROR } from './messageTypes'
import { fetch } from '../../utils/dataAccess'

export const messageSending = () => {
    return {
        type: CONTACT_MESSAGE_SENDING
    }
}

export const messageSuccess = message => {
    return {
        type: CONTACT_MESSAGE_SUCCESS,
        payload: message
    }
}

export const messageError = error => {
    return {
        type: CONTACT_MESSAGE_ERROR,
        payload: error
    }
}

export const messagePost = ({ nombre, fromEmail, contactPhone, message }) => dispatch => {
    dispatch(messageSending())

    const page = '/api/contact-messages'

    const options = {
        method: 'POST',
        body: JSON.stringify({ nombre, fromEmail, contactPhone, message })
    }

    fetch(page, options)
        .then(res => res.json())
        .then(res => {
            dispatch(messageSuccess(res))
        })
        .catch(error => {
            console.error(error)
            dispatch(messageError(error.message))
        })
} 