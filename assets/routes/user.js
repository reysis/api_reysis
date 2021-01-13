import React from 'react';
import { Route } from 'react-router-dom';

import UserProfilePage from "../views/UserProfilePage";

export default [
    <Route path="/profile" component={UserProfilePage} key="profile" />
];
