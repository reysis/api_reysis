import React from 'react';
import { Route } from 'react-router-dom';
import login from '../components/user/Login';
import register from '../components/user/Register';
import logout from "../components/user/Logout";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

export default [
    <Route path="/login" component={LoginPage} exact key="login"/>,
    <Route path="/register" component={RegisterPage} exact key="register"/>,
    <Route path="/logout" component={logout} exact key="logout"/>,
];
