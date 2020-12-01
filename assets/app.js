import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import Header from './components/layouts/Header';
import Footer from './components/Footer';
import LoaderSpinner from './components/Loader';
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

import { loadUser } from './redux/auth/authActions';

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-sine',
            duration: 1000,
            disable: 'mobile',
            offset: 100,
            once: true
        })
        dispatch(loadUser());
    }, [])

    return (
        <ConnectedRouter history={history}>
            <Header />
            <Switch>
                <Route path="/" component={Home} strict={true} exact={true} key="home" />
                {navbarRoutes}
                {turnoRoutes}
                {authenticationsRoutes}
                <Route component={NotFoundPage} key="notfound" />
            </Switch>
            <LoaderSpinner />
            <Footer />
        </ConnectedRouter>
    )
};

export default App;