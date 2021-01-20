import React from 'react';
import { Route } from 'react-router-dom';

import TurnosCreatePage from "../views/TurnosCreatePage";
import TurnosUpdatePage from "../views/TurnosUpdatePage";
import TurnosListPage from "../views/TurnosListPage";
import PrivateRoute from "./Routes Component/PrivateRoute";

export default [
  <PrivateRoute path="/turnos/create" component={TurnosCreatePage} exact key="create" />,
  <PrivateRoute path="/turnos/edit/:id" component={TurnosUpdatePage} key="update" />,
  // <Route path="/turnos/show/:id" component={Show} key="show" />,
  <PrivateRoute path="/turnos" component={TurnosListPage} exact key="list"/>,
  // <Route path="/turnos/:page" component={List} key="page" />
];
