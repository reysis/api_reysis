import {
    STATISTICS_LIST_CLEAT_ALL,
    STATISTICS_LIST_ERROR,
    STATISTICS_LIST_REQUEST,
    STATISTICS_LIST_SUCCESS
} from './statisticsListTypes';

const initialState = {
    loading: false,
    statistics: null,
    error: null,
}

const statisticsListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case STATISTICS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case STATISTICS_LIST_SUCCESS:
            return {
                loading: false,
                statistics: payload,
                error: null
            }
        case STATISTICS_LIST_ERROR:
            return {
                loading: false,
                error: payload,
                statistics: null
            }
        case STATISTICS_LIST_CLEAT_ALL:
            return initialState;
        default:
            return state
    }
}

export default statisticsListReducer
