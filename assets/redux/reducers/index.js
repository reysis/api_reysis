import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as form } from 'redux-form';
import history from '../history';

import turno from './turno';
import user from './user';
import tipoEquipo from './tipo_equipo';
import services from './services';
import opinions from './opinions';
import faq from './faq';

export default combineReducers({
	router: connectRouter(history),
	form,
	turno,
	user,
	tipoEquipo,
	services,
	opinions,
	faq
});