import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_ERROR,
	AUTH_REGISTER_REQUEST,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_ERROR,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_LOGOUT_ERROR,
	AUTH_CLEAR_ERROR
} from "./authTypes";
import {
	fetch
} from "../../utils/dataAccess";

export const loginRequest = () => {
	return {
		type: AUTH_LOGIN_REQUEST
	};
};

export const loginSuccess = user => {
	return {
		type: AUTH_LOGIN_SUCCESS,
		payload: user
	};
};

export const loginError = error => {
	return {
		type: AUTH_LOGIN_ERROR,
		payload: error
	};
};

export const registerRequest = () => {
	return {
		type: AUTH_REGISTER_REQUEST
	};
};

export const registerSuccess = user => {
	return {
		type: AUTH_REGISTER_SUCCESS,
		payload: user
	};
};

export const registerError = error => {
	return {
		type: AUTH_REGISTER_ERROR,
		payload: error
	};
};

export const logoutRequest = () => {
	return {
		type: AUTH_LOGOUT_REQUEST
	};
};

export const logoutSuccess = () => {
	return {
		type: AUTH_LOGOUT_SUCCESS
	};
};

export const logoutError = error => {
	return {
		type: AUTH_LOGOUT_ERROR,
		payload: error
	};
};

export const clearError = () => {
	return {
		type: AUTH_CLEAR_ERROR
	};
};

export const loginFetch = ({ username, password }) => dispatch => {
	dispatch(loginRequest());

	const page = "/api/authentication";
	const method = "POST";
	const headers = new Headers({
		"Content-Type": "application/json"
	});
	const body = JSON.stringify({
		username,
		password
	});

	fetch(page, {
		method,
		headers,
		body
	})
		.then(res => res.json())
		.then(res => {
			const response = {
				...res,
				id: res["@id"]
			};
			console.log(response);
			dispatch(loginSuccess(response));
		})
		.catch(error => {
			dispatch(loginError(error.message));
		});
};

export const registerFetch = (value) => dispatch => {
	dispatch(registerRequest());

	const page = "/api/users";
	const method = "POST";
	const body = JSON.stringify(value);

	fetch(page, { method, body })
		.then(res => res.json())
		.then(res => {
			const auth = {
				...res,
				id: res["@id"]
			};
			const pageUser = auth.id;
			const header = new Headers({ Authorization: `Bearer ${auth.token}` })
			fetch(pageUser, { header })
				.then(res => res.json())
				.then(res => {
					const response = {
						...res,
						auth
					}
					dispatch(registerSuccess(response));
				})
				.catch(error => {
					dispatch(registerError(error.message));
				})
		})
		.catch(error => {
			dispatch(registerError(error.message));
		})
};

export const logoutFetch = () => dispatch => {
	dispatch(logoutRequest());

	const page = "/api/logout";
	const method = "POST";

	fetch(page, { method })
		.then(() => {
			dispatch(logoutSuccess());
		})
		.catch(error => {
			dispatch(logoutError(error.message));
		});
};