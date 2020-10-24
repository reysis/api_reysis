import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './views/Home';
import Header from './components/layouts/Header';
import Footer from './components/Footer';
import NotFoundPage from './components/Errors/NotFoundPage';

//Import your Routes here
import turnoRoutes from './routes/turno';
import navbarRoutes from './routes/navbar';
import authenticationsRoutes from './routes/authentication';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab, faFacebook, faInstagram, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { fas, faChartArea, faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons';
// library.add(faFacebook, faInstagram, faTwitter, faLinkedin, faWhatsapp, faChartArea, faChartLine, faChartBar);

import store from "./store"

import App from "./App";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
