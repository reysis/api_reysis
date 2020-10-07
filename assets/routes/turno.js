import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/turno/';

export default [
  <Route path="/turnos/create" component={Create} exact key="create" />,
  <Route path="/turnos/edit/:id" component={Update} exact key="update" />,
  <Route path="/turnos/show/:id" component={Show} exact key="show" />,
  <Route path="/turnos/" component={List} exact strict key="list" />,
  <Route path="/turnos/:page" component={List} exact strict key="page" />
];
