import {fetch} from '../../../utils/dataAccess';
import {TURNO_DELETE_ERROR, TURNO_DELETE_REQUEST, TURNO_DELETE_SUCCESS} from './deleteTurnoTypes'
import {getHeaders} from "../../utiles";

export function turnoDeleteError(error) {
  return { type: TURNO_DELETE_ERROR, payload: error };
}

export function turnoDeleteRequest(loading) {
  return { type: TURNO_DELETE_REQUEST, payload: loading };
}

export function turnoDeleteSuccess(deleted) {
  return { type: TURNO_DELETE_SUCCESS, payload: deleted };
}

export function turnoDelete(id) {
  return dispatch => {
    dispatch(turnoDeleteRequest(true));

    let headers = getHeaders();
      return fetch(id, { method: 'DELETE', headers })
        .then(res => {
          dispatch(turnoDeleteSuccess(true));
        })
        .catch(e => {
          dispatch(turnoDeleteError(e.message));
        });
  };
}
