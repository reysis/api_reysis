import {
	CREATE_TURNO_REQUEST,
	CREATE_TURNO_SUCCESS,
	CREATE_TURNO_ERROR,
	CREATE_TURNO_CLEAR_ERROR
} from "./createTurnoTypes";
import { fetch } from "../../utils/dataAccess";

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

export const createTurnoFetch = values => dispatch => {
	dispatch(createTurnoRequest());

	const page = "/api/turnos";
	const method = "POST"
	const body = JSON.stringify(values)

	fetch(page, { method, body })
		.then(res => res.json())
		.then(res => {
			const response = {
				...res
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
