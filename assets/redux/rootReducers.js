import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import turno from './turno';
import tipoUsuario from './tipo_usuario/tipoUsuarioReducer';
import auth from './auth/authReducer';
import opinion from './opinion/opinionReducer';
import service from './service/serviceReducer';
import faq from './faq/faqReducer';
import notification from './notification/notificationReducer'
import contactMessage from './contact_message/messageReducer'
import configuration from './configuration/configurationReducer'

export default combineReducers({
    router: connectRouter(history),
    turno,
    auth,
    tipoUsuario,
    service,
    opinion,
    faq,
    notification,
    contactMessage,
    configuration
});