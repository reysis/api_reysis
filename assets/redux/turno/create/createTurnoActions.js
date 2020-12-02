import {
	CREATE_TURNO_REQUEST,
	CREATE_TURNO_SUCCESS,
	CREATE_TURNO_ERROR,
	CREATE_TURNO_CLEAR_ERROR
} from "./createTurnoTypes";

import { fetch } from "../../../utils/dataAccess";

export const createTurnoRequest = () => {
	return {
		type: CREATE_TURNO_REQUEST
	};
};

export const createTurnoSuccess = turno => {
	return {
		type: CREATE_TURNO_SUCCESS,
		payload: turno
	};
};

export const createTurnoError = error => {
	return {
		type: CREATE_TURNO_ERROR,
		payload: error
	};
};

const getHeaders = (state) => {
	const headers = {
		'Content-Type': 'application/ld+json',
	}
	if (state().auth.authenticated)
		headers.Authorization = `Bearer ${state().auth.token}`
	return new Headers(headers)
}

export const createTurnoFetch = (value) => (dispatch, getState) => {

	dispatch(createTurnoRequest());

	const page = "/api/turnos";
	const method = "POST"
	const body = JSON.stringify({
		fecha: value.fecha,
		defecto: value.defecto,
		user: value.user
	})
	const headers = getHeaders(getState);

	fetch(page, { method, body, headers })
		.then(res => res.json())
		.then(res => {
			const response = {
				...res,
				id: res['@id']
			};
			dispatch(createTurnoSuccess(response));
		})
		.catch(error => {
			dispatch(createTurnoError(error.message));
		});
};

export const createTurnoClearError = () => {
	return {
		type: CREATE_TURNO_CLEAR_ERROR
	};
};
