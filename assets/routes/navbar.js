import React from 'react';
import { Route } from 'react-router-dom';
import ServiciosPage from '../views/ServiciosPage';
import FAQ from '../views/FaqPage';
import AboutPage from '../views/AboutPage';
import ServicioItemPage from '../views/ServicioItemPage';
import GarantiaPage from "../views/GarantiaPage";
import ValoresPage from "../views/ValoresPage";

export default [
    <Route path="/services" component={ServiciosPage} exact key="servicios" />,
    <Route path="/services/:id" component={ServicioItemPage} key="servicio" />,
    <Route path="/about" component={AboutPage} key="about" />,
    <Route path="/faq" component={FAQ} key="faq" />,
    <Route path="/garanty" component={GarantiaPage} key="garantia" />,
    <Route path="/valores" component={ValoresPage} key="valores" />
];
