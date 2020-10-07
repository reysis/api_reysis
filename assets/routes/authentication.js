import React from 'react';
import { Route } from 'react-router-dom';
import login from '../components/user/Login';
import register from '../components/user/Register';
import logout from "../components/user/Logout";

export default [
    <Route path="/login" component={login} exact key="login"/>,
    <Route path="/register" component={register} exact key="register"/>,
    <Route path="/logout" component={logout} exact key="logout"/>,
];
