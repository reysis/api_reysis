import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import turno from './turno';
import tipoEquipo from './tipo_equipo';

import tipoUsuario from '../redux/tipo_usuario/tipoUsuarioReducer';
import auth from '../redux/auth/authReducer';
import opinion from '../redux/opinion/opinionReducer';
import service from '../redux/service/serviceReducer';
import faq from '../redux/faq/faqReducer';
import notification from '../redux/notification/notificationReducer'
import contactMessage from '../redux/contact_message/messageReducer'
import configuration from '../redux/configuration/configurationReducer'

export default combineReducers({
	router: connectRouter(history),
	turno,
	auth,
	tipoEquipo,
	tipoUsuario,
	service,
	opinion,
	faq,
	notification,
	contactMessage,
	configuration
});