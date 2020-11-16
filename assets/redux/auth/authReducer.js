import {
	AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR,
 	AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
 	AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_ERROR,
 	AUTH_CLEAR_ERROR 
 } from './authTypes'

const initialState = {
	loading: false,
	authenticated: window.user != null,
	user: window.user,
	error: ''
}

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH_LOGIN_REQUEST:
		case AUTH_REGISTER_REQUEST:
		case AUTH_LOGOUT_REQUEST:
			return { 
				...state,
				loading: true
			}
		case AUTH_LOGIN_SUCCESS:
		case AUTH_REGISTER_SUCCESS:
			return { 
				loading: false,
				authenticated: true,
				user: payload,
				error: ''
			}
		case AUTH_LOGOUT_SUCCESS:
			return {
				loading: false,
				authenticated: false,
				user: null,
				error: ''
			}
		case AUTH_LOGIN_ERROR:
		case AUTH_REGISTER_ERROR:
			return {
				loading: false,
				authenticated: false,
				user: null,
				error: payload
			}
		case AUTH_LOGOUT_ERROR: 
			return {
				...state,
				loading: false,
				error: payload
			}
		case AUTH_CLEAR_ERROR:
			return {
				...state,
				error: ''
			}
		default:
			return state
	}
}

export default authReducer