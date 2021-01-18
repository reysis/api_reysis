import {
  TURNO_SHOW_ERROR,
  TURNO_SHOW_REQUEST,
  TURNO_SHOW_SUCCESS
} from './showTurnoTypes'

import { fetch } from "../../../utils/dataAccess";
import {getHeaders} from "../../utiles";

export const showTurnoRequest = () => {
  return {
    type: TURNO_SHOW_REQUEST
  };
}

export const showTurnoSuccess = (retrieved) => {
  return {
    type: TURNO_SHOW_SUCCESS,
    payload: retrieved
  };
}

export const showTurnoError = (error) => {
  return {
    type: TURNO_SHOW_ERROR,
    payload: error
  };
}

export const showTurnoFetch = (id) => (dispatch, getState) => {
  dispatch(showTurnoRequest());

  const page = "/api/turnos/" + id;
  const method = "GET"
  const headers = getHeaders(getState);
  console.log(getState());
  console.log(headers);
  return fetch(page, {method, headers})
      .then(res => res.json())
      .then(res => {
        dispatch(showTurnoSuccess(res))
      })
      .catch(error => {
        dispatch(showTurnoError(error.message))
      })
}


