import {
    STATISTICS_LIST_CLEAT_ALL,
    STATISTICS_LIST_SUCCESS,
    STATISTICS_LIST_REQUEST,
    STATISTICS_LIST_ERROR
} from './statisticsListTypes'
import { fetch } from '../../../utils/dataAccess'

export const statisticsListRequest = () => {
    return {
        type: STATISTICS_LIST_REQUEST
    }
}

export const statisticsListSuccess = (services) => {
    return {
        type: STATISTICS_LIST_SUCCESS,
        payload: services
    }
}

export const statisticsListError = (error) => {
    return {
        type: STATISTICS_LIST_ERROR,
        payload: error
    }
}

export const statisticsListFetch = (pag = '/api/estadisticas') => dispatch => {
    dispatch(statisticsListRequest());

    fetch(pag)
        .then(res => res.json())
        .then(res => {
            dispatch(statisticsListSuccess(res['hydra:member']));
        })
        .catch(error => {
            dispatch(statisticsListError(error.message));
        })
}