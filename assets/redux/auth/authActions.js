import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_ERROR,
	AUTH_REGISTER_REQUEST,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_ERROR,
	AUTH_LOGOUT_SUCCESS,
	AUTH_CLEAR_ERROR,
	AUTH_SAVE_TOKEN
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

export const logoutSuccess = () => {
	return {
		type: AUTH_LOGOUT_SUCCESS
	};
};

export const clearError = () => {
	return {
		type: AUTH_CLEAR_ERROR
	};
};


export const saveToken = (token) => {
	return {
		type: AUTH_SAVE_TOKEN,
		payload: token
	};
};

export const loadUser = () => (dispatch, getState) => {

	const page = getState().auth.tokenUser;
	const token = getState().auth.token;

	if (page && token) {
		dispatch(loginRequest());
		fetch(page, getUser(token))
			.then(res => res.json())
			.then(res => {
				const response = {
					token,
					tokenUser: page,
					user: {
						...res,
						id: res['@id']
					}
				}
				dispatch(loginSuccess(response));
			})
			.catch(error => {
				dispatch(loginError(error.message));
			});
	}
}

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
			const token = res.token
			const location = res.location
			dispatch(saveToken({
				token,
				tokenUser: location
			}))
			fetch(location, getUser(token))
				.then(res => res.json())
				.then(res => {
					const response = {
						token,
						tokenUser: location,
						user: {
							...res,
							id: res['@id']
						}
					}
					dispatch(loginSuccess(response));
				})
				.catch(error => {
					console.log(error)
					dispatch(loginError(error.message));
				});
		})
		.catch(error => {
			console.log(error)
			dispatch(loginError(error.message));
		});
};

const getUser = (token) => {
	return {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/ld+json',
			Authorization: `Bearer ${token}`
		})
	}
}

export const registerFetch = (value) => dispatch => {
	dispatch(registerRequest());

	const page = "/api/users";
	const method = "POST";
	const body = JSON.stringify({
		persona: { ...value.persona },
		phoneNumbers: { ...value.phoneNumbers },
		address: { ...value.address },
		username: value.username,
		email: value.email,
		password: value.password,
		nationality: value.nationality
	});

	const username = value.username;
	const password = value.password;

	fetch(page, { method, body })
		.then(res => res.json())
		.then(res => {
			const request = {
				username,
				password
			}
			dispatch(loginFetch(request))
		})
		.catch(error => {
			dispatch(registerError(error.message));
		})
};