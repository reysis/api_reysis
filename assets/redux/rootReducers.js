import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import turno from './turno';
import availableDate from './availableDate';
import auth from './auth';
import opinion from './opinion';
import service from './service';
import statistics from './statistic';
import faq from './faq/faqReducer';
import notification from './notification'
import contactMessage from './contact_message/messageReducer'
import configuration from './configuration/configurationReducer'
import user from './user';
import mediaObject from './mediaObject';

export default combineReducers({
    router: connectRouter(history),
    turno,
    availableDate,
    auth,
    service,
    opinion,
    statistics,
    faq,
    notification,
    contactMessage,
    configuration,
    user,
    mediaObject
});