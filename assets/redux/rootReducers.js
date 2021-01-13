import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import turno from './turno';
import auth from './auth/authReducer';
import opinion from './opinion';
import service from './service';
import faq from './faq/faqReducer';
import notification from './notification/notificationReducer'
import contactMessage from './contact_message/messageReducer'
import configuration from './configuration/configurationReducer'
import user from './user';
import mediaObject from './mediaObject';

export default combineReducers({
    router: connectRouter(history),
    turno,
    auth,
    service,
    opinion,
    faq,
    notification,
    contactMessage,
    configuration,
    user,
    mediaObject
});