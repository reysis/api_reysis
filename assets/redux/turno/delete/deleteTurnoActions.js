import {fetch} from '../../../utils/dataAccess';
import {TURNO_DELETE_ERROR, TURNO_DELETE_REQUEST, TURNO_DELETE_SUCCESS} from './deleteTurnoTypes'
import {getHeaders} from "../../utiles";

export function turnoDeleteError(error) {
  return { type: TURNO_DELETE_ERROR, error };
}

export function turnoDeleteRequest(loading) {
  return { type: TURNO_DELETE_REQUEST, loading };
}

export function turnoDeleteSuccess(deleted) {
  return { type: TURNO_DELETE_SUCCESS, deleted };
}

export function turnoDelete(id) {
  return dispatch => {
    dispatch(turnoDeleteRequest(true));

    let headers = getHeaders();
      return fetch(id, { method: 'DELETE', headers })
        .then((item) => {
          dispatch(turnoDeleteRequest(false));
          dispatch(turnoDeleteSuccess(item));
        })
        .catch(e => {
          dispatch(turnoDeleteRequest(false));
          dispatch(turnoDeleteError(e.message));
        });
  };
}
