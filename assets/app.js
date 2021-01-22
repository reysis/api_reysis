import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
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
import userRoutes from './routes/user';

// import { ConnectedRouter } from 'connected-react-router';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import { loadUser } from './redux/auth/authActions';
import { loadConfiguration } from './redux/configuration/configurationActions';
import { useLocation } from 'react-router-dom'

const App = () => {

    const dispatch = useDispatch()

    const location = useLocation()

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-sine',
            duration: 1000,
            offset: 100,
            once: true
        })
        dispatch(loadUser());
        dispatch(loadConfiguration())
    }, [])

    useEffect(() => {
        const id = location.hash.substr(1)
        const elem = document.getElementById(id)
        id && elem && elem.scrollIntoView({ behavior: 'smooth' })
    }, [location])

    return (
        <>
            <Header />
            <Switch>
                <Route path="/" component={Home} strict={true} exact={true} key="home" />
                {navbarRoutes}
                {turnoRoutes}
                {authenticationsRoutes}
                {userRoutes}
                <Route component={NotFoundPage} key="notfound" />
            </Switch>
            <LoaderSpinner />
            <Footer />
        </>
    )
};

export default App;