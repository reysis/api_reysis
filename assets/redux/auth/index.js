import { combineReducers } from 'redux';

import login from './login/authLoginReducer'
import register from './register/authRegisterReducer';
import token from './token/authTokenReducer';

export default combineReducers({
    login, register, token
});
