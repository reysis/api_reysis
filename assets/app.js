import React, { Component, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import Header from './components/layouts/Header';
import Footer from './components/Footer';
import NotFoundPage from './components/Errors/NotFoundPage';

//Import your Routes here
import turnoRoutes from './routes/turno';
import navbarRoutes from './routes/navbar';
import authenticationsRoutes from './routes/authentication';

import { ConnectedRouter } from 'connected-react-router';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.scss';

import history from './history';

class App extends Component {
    componentDidMount() {
        AOS.init({
            duration: 1500,
            once: true
        })
    }
    render() {
        return (
            <ConnectedRouter history={history}>
                <Header />
                <Switch>
                    <Route path="/" component={Home} strict={true} exact={true} />
                    {navbarRoutes}
                    {turnoRoutes}
                    {authenticationsRoutes}
                    <Route component={NotFoundPage} />
                </Switch>
                <Footer />
            </ConnectedRouter>
        )
    }
};

export default App;