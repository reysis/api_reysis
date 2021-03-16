import {
    WHYUS_LIST_ERROR,
    WHYUS_LIST_REQUEST,
    WHYUS_LIST_SUCCESS
} from './whyusListTypes'

const initialState = {
    loading: false,
    whyus: null,
    error: null
}

const listWhyusReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case WHYUS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case WHYUS_LIST_SUCCESS:
            return {
                loading: false,
                whyus: payload,
                error: null
            }
        case WHYUS_LIST_ERROR:
            return {
                loading: false,
                whyus: null,
                error: payload
            }
        default:
            return state
    }
}

export default listWhyusReducer