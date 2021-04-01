import {
    UPDATE_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from './updateUserTypes'
import {updateUserAuthenticated} from "../../auth/token/authTokenActions";

import { fetch } from "../../../utils/dataAccess";

import {getHeaders} from "../../utiles";

export const updateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST
    };
}

export const updateUserSuccess = (retrieved) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: retrieved
    };
}

export const updateUserError = (error) => {
    return {
        type: UPDATE_USER_ERROR,
        payload: error
    };
}

export const updateUserFetch = (id, {
    name,
    indications,
    password,
    address,
    ci,
    email,
    phones,
    nationality,
    user
}) => (dispatch, getState) => {
    dispatch(updateUserRequest());

    const page = id;
    let values ={};
    const method = "PUT";

    if(phones.length){
        values = {
            ...values,
            phoneNumbers: phones
        };
    }
    if(email !== "" && email !== user.email){
        values={
            ...values,
            email: email
        };
    }
    if(password !== ""){
        values = {
            ...values,
            password: password
        };
    }
    if(indications !== "" && indications !== user['address']['indications']){
        values = {
            ...values,
            address: {
                ...values['address'],
                indications: indications
            }
        };
    }
    if(address !== "" && address !== user['address']['postAddress']){
        values = {
            ...values,
            address: {
                ...values['address'],
                postAddress: address
            }
        }
    }
    if(nationality !== "" && nationality !== user['nationality']){
        values = {
            ...values,
            nationality: nationality
        };
    }
    if(ci !== "" && ci !== user['persona']['ci']){
        values = {
            ...values,
            persona:{
                ...values['persona'],
                ci: ci
            }
        };
    }
    if(name !== "" && name !== user['persona']['nombre']){
        values = {
            ...values,
            persona:{
                ...values,
                nombre: name
            }
        }
    }

    const body = JSON.stringify(values);
    const headers = getHeaders(getState);
    return fetch(page, {method, body, headers})
        .then(res => res.json())
        .then(res => {
            dispatch(updateUserSuccess(res))
            dispatch(updateUserAuthenticated(res));
        })
        .catch(error => {
            dispatch(updateUserError(error.message))
        })
}

export function reset(eventSource) {
    return dispatch => {
        if (eventSource) eventSource.close();

        dispatch({ type: "UPDATE_USER_RESET" });
        dispatch(updateUserError(null));
        dispatch(updateUserRequest(false));
        dispatch(updateUserSuccess(null));
    };
}
