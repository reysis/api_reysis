import {
    UPLOAD_MEDIA_OBJECT_REQUEST,
    UPLOAD_MEDIA_OBJECT_SUCCESS,
    UPLOAD_MEDIA_OBJECT_ERROR,
    UPLOAD_MEDIA_OBJECT_CLEAR_ERROR
} from './uploadMediaObjectTypes'

const initialState = {
    loading: false,
    file: null,
    error: null
}

const uploadMediaObjectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPLOAD_MEDIA_OBJECT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_MEDIA_OBJECT_SUCCESS:
            return {
                loading: false,
                file: payload,
                error: null
            }
        case UPLOAD_MEDIA_OBJECT_ERROR:
            return {
                loading: false,
                file: null,
                error: payload
            }
        case UPLOAD_MEDIA_OBJECT_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default uploadMediaObjectReducer