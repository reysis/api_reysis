import { CONFIGURATION_REQUEST, CONFIGURATION_SUCCESS, CONFIGURATION_ERROR } from './configurationTypes'

const initialState = {
    loading: false,
    configurations: {},
    error: null
}

const configurationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CONFIGURATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CONFIGURATION_SUCCESS:
            return {
                loading: false,
                configurations: payload,
                error: null
            }
        case CONFIGURATION_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export default configurationReducer
