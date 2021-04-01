import {
    UPLOAD_MEDIA_OBJECT_REQUEST,
    UPLOAD_MEDIA_OBJECT_SUCCESS,
    UPLOAD_MEDIA_OBJECT_ERROR,
    UPLOAD_MEDIA_OBJECT_CLEAR_ERROR, UPLOAD_MEDIA_OBJECT_CLEAR_ALL
} from "./uploadMediaObjectTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

export const uploadFileRequest = () => {
    return {
        type: UPLOAD_MEDIA_OBJECT_REQUEST
    };
};

export const uploadFileSuccess = file => {
    return {
        type: UPLOAD_MEDIA_OBJECT_SUCCESS,
        payload: file
    };
};

export const uploadFileError = error => {
    return {
        type: UPLOAD_MEDIA_OBJECT_ERROR,
        payload: error
    };
};

export const uploadFileFetch = (value) => (dispatch, getState) => {
    dispatch(uploadFileRequest());

    const page = "/api/media-objects";
    const method = "POST"
    const body = JSON.stringify({
        filename: value.filename,
        data: value.data,
        user: value.user
    })
    const headers = getHeaders(getState);

    fetch(page, { method, body, headers })
        .then(res => res.json())
        .then(res => {
            dispatch(uploadFileSuccess(res));
        })
        .catch(error => {
            dispatch(uploadFileError(error.message));
        });
};

export const uploadFileClearError = () => {
    return {
        type: UPLOAD_MEDIA_OBJECT_CLEAR_ERROR
    };
};

export const uploadFileClearAll = () => {
    return {
        type: UPLOAD_MEDIA_OBJECT_CLEAR_ALL
    };
};