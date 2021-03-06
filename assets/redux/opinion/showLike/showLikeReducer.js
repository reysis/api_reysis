import {
    SHOW_LIKE_ERROR,
    SHOW_LIKE_REQUEST,
    SHOW_LIKE_SUCCESS
} from './showLikeTypes'

const initialState = {
    loading: false,
    likeReview: null,
    error: ''
}

const showLikeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_LIKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SHOW_LIKE_SUCCESS:
            return {
                loading: false,
                likeReview: payload,
                error: null
            }
        case SHOW_LIKE_ERROR:
            return {
                loading: false,
                likeReview: null,
                error: payload
            }
        default:
            return state
    }
}

export default showLikeReducer