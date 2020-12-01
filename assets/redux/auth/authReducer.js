import {
	AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR,
	AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
	AUTH_LOGOUT_SUCCESS,
	AUTH_CLEAR_ERROR
} from './authTypes'

const initialState = {
	loading: false,
	authenticated: false,
	token: localStorage.getItem('token'),
	tokenUser: localStorage.getItem('tokenUser'),
	user: null,
	error: ''
}

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH_LOGIN_REQUEST:
		case AUTH_REGISTER_REQUEST:
			return {
				...state,
				loading: true
			}
		case AUTH_LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token)
			localStorage.setItem('tokenUser', payload.tokenUser)
			return {
				loading: false,
				authenticated: true,
				...payload,
				error: ''
			}
		case AUTH_REGISTER_SUCCESS:
			return {
				loading: false,
				authenticated: true,
				user: payload,
				error: ''
			}
		case AUTH_LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			localStorage.removeItem('tokenUser');
			return {
				loading: false,
				authenticated: false,
				token: null,
				tokenUser: null,
				user: null,
				error: ''
			}
		case AUTH_LOGIN_ERROR:
		case AUTH_REGISTER_ERROR:
			localStorage.removeItem('token');
			localStorage.removeItem('tokenUser');
			return {
				loading: false,
				authenticated: false,
				token: null,
				tokenUser: null,
				user: null,
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