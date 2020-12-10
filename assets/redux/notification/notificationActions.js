import { NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESS, NOTIFICATION_LIST_ERROR } from './notificationTypes'
import { fetch } from '../../utils/dataAccess'

import { getHeaders } from '../utiles'

export const notificationRequest = () => {
    return {
        type: NOTIFICATION_LIST_REQUEST
    };
}

export const notificationSuccess = (notifications) => {
    return {
        type: NOTIFICATION_LIST_SUCCESS,
        payload: notifications
    };
}

export const notificationError = (error) => {
    return {
        type: NOTIFICATION_LIST_ERROR,
        payload: error
    };
}

export const notificationFetch = (pag = 1) => (dispatch, getState) => {
    dispatch(notificationRequest());

    const page = `/api/notifications?page=${pag}`

    const headers = getHeaders(getState);

    fetch(page, { headers })
        .then(res => res.json())
        .then(res => {
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
