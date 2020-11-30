import { combineReducers } from 'redux';
import list from './list';
import update from './update';
import del from './delete';
import show from './show';

import createTurno from '../../redux/turno/create/createTurnoReducer'

export default combineReducers({ list, createTurno, update, del, show });
