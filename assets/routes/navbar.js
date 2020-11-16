import React from 'react';
import { Route } from 'react-router-dom';
import ServiciosPage from '../views/ServiciosPage';
import FAQ from '../views/FaqPage';
import ContactPage from '../views/ContactPage';
import AboutPage from '../views/AboutPage';

export default [
    <Route path="/services" component={ServiciosPage} key="servicios"/>,
    <Route path="/contact" component={ContactPage} key="contactos"/>,
    <Route path="/about" component={AboutPage} key="about"/>,
    <Route path="/faq" component={FAQ} key="faq"/>
];
