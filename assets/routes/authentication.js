import React from 'react';
import { Route } from 'react-router-dom';
// import Login from '../components/user/Login';
// import Register from '../components/user/Register';
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import Logout from "../components/user/Logout";

export default [
    <Route path="/login" component={LoginPage} key="login"/>,
    <Route path="/register" component={RegisterPage} key="register"/>,
    <Route path="/logout" component={Logout} key="logout"/>,
];
