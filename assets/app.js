import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
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
import review from "./routes/review";
import footer from "./routes/footer";

// import { ConnectedRouter } from 'connected-react-router';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import { loadConfiguration } from './redux/configuration/configurationActions';
import { useLocation } from 'react-router-dom'
import {authRefreshToken, userLoguedFetch} from "./redux/auth/token/authTokenActions";
import {loginSuccess} from "./redux/auth/login/authLoginActions";

let expirationInterval = null;
const App = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const authenticated = useSelector(state => state.auth.login.authenticated);
    let expirationTime = 10;

    useEffect(()=>{
        if(expirationInterval)
            clearInterval(expirationInterval);
        if(authenticated){
            expirationInterval = setInterval(()=>{
                if(expirationTime === 1){
                    dispatch(authRefreshToken(localStorage.getItem('refreshToken')));
                    expirationTime = 10
                }
                expirationTime--;
            },60000);
        }
    },[authenticated])

    useEffect(async () => {
        AOS.init({
            easing: 'ease-in-sine',
            duration: 1000,
            offset: 100,
            once: true
        })
        if(localStorage.getItem('user')){
            await dispatch(authRefreshToken(localStorage.getItem('refreshToken')))
        }
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
                {review}
                {footer}
                <Route component={NotFoundPage} key="notfound" />
            </Switch>
            <LoaderSpinner />
            <Footer />
        </>
    )
};

export default App;