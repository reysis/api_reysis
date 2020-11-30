import {
	RETRIEVE_TURNO_ERROR,
	RETRIEVE_TURNO_REQUEST,
	RETRIEVE_TURNO_SUCCESS
} from './updateTurnoTypes'

import { fetch } from "../../../utils/dataAccess";

import { createTurnoRequest } from "../create/createTurnoActions";
import { loading, error } from "./delete";

export const retrieveTurnoRequest = () => {
	return {
		type: RETRIEVE_TURNO_REQUEST
	};
}

export const retrieveTurnoSuccess = (retrieved) => {
	return {
		type: "RETRIEVE_TURNO_SUCCESS",
		payload: retrieved
	};
}

export const retrieveTurnoError = (error) => {
	return {
		type: RETRIEVE_TURNO_ERROR,
		payload: error
	};
}

export const retrieveTurnoFetch = (id) => dispatch => {
	dispatch(retrieveTurnoRequest());

	return fetch(id)
		.then(res => res.json())
		.then(res => {
			const response = {
				...res,
				id: res['@id']
			}
			dispatch(retrieveTurnoSuccess(response))
		})
		.catch(error => {
			dispatch(retrieveTurnoError(error.message))
		})
}

export const updateTurnoRequest = () => {
	return {
		type: UPDATE_TURNO_REQUEST,
	};
}

export const updateTurnoSuccess = (updated) => {
	return {
		type: "UPDATE_TURNO_SUCCESS",
		payload: updated
	};
}

export const updateTurnoError = (error) => {
	return {
		type: UPDATE_TURNO_ERROR,
		payload: error
	};
}

export const updateTurnoFetch = (item, values) => dispatch => {
	dispatch(updateError(null));
	dispatch(createSuccess(null));
	dispatch(updateLoading(true));

	return fetch(item["@id"], {
		method: "PUT",
		body: JSON.stringify(values)
	})
		.then(response =>
			response
				.json()
				.then(retrieved => ({
					retrieved,
					hubURL: extractHubURL(response)
				}))
		)
		.then(({ retrieved, hubURL }) => {
			retrieved = normalize(retrieved);

			dispatch(updateLoading(false));
			dispatch(updateSuccess(retrieved));

			if (hubURL)
				dispatch(mercureSubscribe(hubURL, retrieved["@id"]));
		})
		.catch(e => {
			dispatch(updateLoading(false));

			if (e instanceof SubmissionError) {
				dispatch(updateError(e.errors._error));
				throw e;
			}

			dispatch(updateError(e.message));
		});
};

export function reset(eventSource) {
	return dispatch => {
		if (eventSource) eventSource.close();

		dispatch({ type: "TURNO_UPDATE_RESET" });
		dispatch(error(null));
		dispatch(loading(false));
		dispatch(createSuccess(null));
	};
}

export function mercureSubscribe(hubURL, topic) {
	return dispatch => {
		const eventSource = subscribe(hubURL, [topic]);
		dispatch(mercureOpen(eventSource));
		eventSource.addEventListener("message", event =>
			dispatch(mercureMessage(normalize(JSON.parse(event.data))))
		);
	};
}

export function mercureOpen(eventSource) {
	return { type: "TURNO_UPDATE_MERCURE_OPEN", eventSource };
}

export function mercureMessage(retrieved) {
	return dispatch => {
		if (1 === Object.keys(retrieved).length) {
			dispatch({ type: "TURNO_UPDATE_MERCURE_DELETED", retrieved });
			return;
		}

		dispatch({ type: "TURNO_UPDATE_MERCURE_MESSAGE", retrieved });
	};
}
