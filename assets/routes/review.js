import React from 'react';
import { Route } from 'react-router-dom';
import ReviewsListPage from "../views/ReviewsListPage";

//import PrivateRoute from "./Routes Component/PrivateRoute";

export default [
     <Route path="/reviews" component={ReviewsListPage} key="reviewsList" />
];
