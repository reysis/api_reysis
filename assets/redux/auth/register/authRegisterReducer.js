import {
    AUTH_REGISTER_ERROR,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS
} from './authRegisterTypes';

const initialState = {
    loading: false,
    user: null,
    error: null,
}

const authRegisterReducer = (state = initialState, {type, payload})=>{
    switch (type){
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: payload
            }
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case AUTH_REGISTER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default authRegisterReducer;