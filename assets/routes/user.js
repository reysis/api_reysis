import React from 'react';
import { Route } from 'react-router-dom';

import UserProfilePage from "../views/UserProfilePage";
import PrivateRoute from "./Routes Component/PrivateRoute";

export default [
    <PrivateRoute path="/profile" component={UserProfilePage} key="profile" />
];
