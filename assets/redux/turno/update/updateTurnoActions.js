import {
	TURNO_UPDATE_ERROR,
	TURNO_UPDATE_REQUEST,
	TURNO_UPDATE_SUCCESS
} from './updateTurnoTypes'

import { fetch } from "../../../utils/dataAccess";
import {getHeaders} from "../../utiles";

export const updateTurnoRequest = () => {
	return {
		type: TURNO_UPDATE_REQUEST
	};
}

export const updateTurnoSuccess = (retrieved) => {
	return {
		type: TURNO_UPDATE_SUCCESS,
		payload: retrieved
	};
}

export const updateTurnoError = (error) => {
	return {
		type: TURNO_UPDATE_ERROR,
		payload: error
	};
}

export const updateTurnoFetch = (id, {fecha, defecto, turno}) => (dispatch, getState) => {
	dispatch(updateTurnoRequest());

	const page = "/api/turnos/" + id;
	const method = "PUT"
	let values ={};
	if(fecha !== "" && fecha !== turno['fecha']){
		values = {
			...values,
			fecha: fecha
		};
	}
	if(defecto !== "" && defecto !== turno['defecto']){
		values = {
			...values,
			defecto: defecto
		};
	}
	const headers = getHeaders(getState);
	const body = JSON.stringify({
		fecha: fecha,
		defecto: defecto,
		user: turno['user']
	})
	return fetch(page, {method, body, headers})
		.then(res => res.json())
		.then(res => {
			dispatch(updateTurnoSuccess(res))
		})
		.catch(error => {
			dispatch(updateTurnoError(error.message))
		})
}


