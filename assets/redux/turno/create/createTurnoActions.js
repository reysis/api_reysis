import {
	CREATE_TURNO_REQUEST,
	CREATE_TURNO_SUCCESS,
	CREATE_TURNO_ERROR,
	CREATE_TURNO_CLEAR_ERROR,
	CREATE_TURNO_CLEAR
} from "./createTurnoTypes";

import { fetch } from "../../../utils/dataAccess";

import { getHeaders } from '../../utiles'

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

export const createTurnoFetch = ({detalles, defecto, domicilio,user}) => (dispatch, getState) => {
	dispatch(createTurnoRequest());

	const page = "/api/turnos";
	const method = "POST"
	console.log(detalles, defecto, domicilio, user);
	const body = JSON.stringify({
		detalles: detalles,
		defecto: defecto,
		domicilio: domicilio,
		user: user
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

export const createTurnoClear = () => {
	return {
		type: CREATE_TURNO_CLEAR
	};
};