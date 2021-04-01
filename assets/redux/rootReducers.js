import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import turno from './turno';
import turnoDisponible from './turnoDisponible';
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
import whyus from './whyus';
import equipo from './equipo';
import equipoServicio from './equipoServicio';

export default combineReducers({
    router: connectRouter(history),
    turno,
    turnoDisponible,
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
    mediaObject,
    whyus,
    equipo,
    equipoServicio
});