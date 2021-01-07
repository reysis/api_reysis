import React from 'react';
import { Route } from 'react-router-dom';

import TurnosCreatePage from "../views/TurnosCreatePage";
import TurnosUpdatePage from "../views/TurnosUpdatePage";
import TurnosListPage from "../views/TurnosListPage";

export default [
  <Route path="/turnos/create" component={TurnosCreatePage} exact key="create" />
  // <Route path="/turnos/edit/:id" component={TurnosUpdatePage} key="update" />, 
  // <Route path="/turnos/show/:id" component={Show} key="show" />,
  // <Route path="/turnos" component={TurnosListPage} exact key="list" />,
  // <Route path="/turnos/:page" component={List} key="page" />
];
