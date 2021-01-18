import { fetch } from '../../utils/dataAccess';
import {
  TURNO_DELETE_ERROR,
  TURNO_DELETE_REQUEST,
  TURNO_DELETE_SUCCESS
} from './deleteTurnoTypes'
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
    const url = '/api/turnos/' + id;
    return fetch(url, { method: 'DELETE' })
        .then(() => {
          dispatch(loading(false));
          dispatch(success(item));
        })
        .catch(e => {
          dispatch(loading(false));
          dispatch(error(e.message));
        });
  };
}
