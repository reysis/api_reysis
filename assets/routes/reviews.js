import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/turno/';
import ReviewsCreatePage from "../views/ReviewsCreatePage";
import ReviewsListPage from "../views/ReviewsListPage";

export default [
    <Route path="/reviews/create" component={ReviewsCreatePage} exact key="create" />,
    <Route path="/reviews" component={ReviewsListPage} exact key="list" />,
];