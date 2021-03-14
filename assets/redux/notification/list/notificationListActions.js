import {
    NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_LIST_ERROR,
    NOTIFICATION_ITEM_READING, NOTIFICATION_ITEM_READED, NOTIFICATION_ITEM_READERROR, NOTIFICATION_LIST_ASSIGN
} from './notificationListTypes'
import { fetch } from '../../../utils/dataAccess'

import { getHeaders } from '../../utiles'

export const notificationRequest = () => {
    return {
        type: NOTIFICATION_LIST_REQUEST
    };
}

export const notificationSuccess = notifications => {
    console.log(notifications);
    return {
        type: NOTIFICATION_LIST_SUCCESS,
        payload: notifications
    };
}

export const notificationError = error => {
    return {
        type: NOTIFICATION_LIST_ERROR,
        payload: error
    };
}

export const notificationAssign = notifications =>{
    return {
        type: NOTIFICATION_LIST_ASSIGN,
        payload: notifications
    }
}

export const notificationGet = (pag = 1) => (dispatch, getState) => {
    dispatch(notificationRequest());

    const page = `/api/notifications?page=${pag}`

    const headers = getHeaders(getState);

    fetch(page, { headers })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const notifications = res['hydra:member'].map(value => {
                return {
                    ...value,
                    id: value['@id']
                }
            })
            const totalItems = res["hydra:totalItems"]
            const currentPage = pag
            let lastPage = 1
            if (res['hydra:view'])
                lastPage = Number.parseInt(res['hydra:view']['hydra:last'].split('=')[1])
            dispatch(notificationSuccess({ notifications, totalItems, lastPage, currentPage }))
        })
        .catch(error => {
            dispatch(notificationError(error.message))
        })
}

export const notificationReading = () => {
    return {
        type: NOTIFICATION_ITEM_READING
    }
}

export const notificationReaded = id => {
    return {
        type: NOTIFICATION_ITEM_READED,
        payload: id
    }
}

export const notificationReadError = error => {
    return {
        type: NOTIFICATION_ITEM_READERROR,
        payload: error
    }
}

export const notificationReadPut = (id) => (dispatch, getState) => {
    dispatch(notificationReading())
    const options = {
        method: 'PUT',
        body: JSON.stringify({ readed: true }),
        headers: getHeaders(getState)
    }
    fetch(id, options)
        .then(() => {
            dispatch(notificationReaded(id))
        })
        .catch(error => {
            dispatch(notificationReadError(error.message))
        })
}