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

export const updateTurnoFetch = (id, {fecha, defecto, turno}) => dispatch => {
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
	if(defecto !== "" && defecto !== turno['defectp']){
		values = {
			...values,
			fecha: fecha
		};
	}
	const headers = getHeaders(getState);
	const body = JSON.stringify({
		fecha: fecha,
		defecto: defecto,
		user: turno['user']['@id']
	})
	return fetch(id, {method, values, headers})
		.then(res => res.json())
		.then(res => {
			const response = {
				...res,
				id: res['@id']
			}
			dispatch(updateTurnoSuccess(response))
		})
		.catch(error => {
			dispatch(updateTurnoError(error.message))
		})
}


