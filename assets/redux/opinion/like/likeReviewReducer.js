import {
    LIKE_REVIEW_ERROR,
    LIKE_REVIEW_REQUEST,
    LIKE_REVIEW_SUCCESS,
    LIKE_REVIEW_CLEAR_ALL
} from './likeReviewTypes'

const initialState = {
    loading: false,
    liked: null,
    error: null
}

const likeReviewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LIKE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIKE_REVIEW_SUCCESS:
            return {
                loading: false,
                liked: payload,
                error: null
            }
        case LIKE_REVIEW_ERROR:
            return {
                loading: false,
                liked: null,
                error: payload
            }
        case LIKE_REVIEW_CLEAR_ALL:
            return initialState
        default:
            return state
    }
}

export default likeReviewReducer