import React, { useEffect, Fragment } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';

import Home from './views/Home';
import Header from './components/layouts/Header';
import Footer from './components/Footer';
import NotFoundPage from './components/Errors/NotFoundPage';

// Import your reducers here
import turno from './reducers/turno';
import user from './reducers/user';
import tipoEquipo from './reducers/tipo equipo';
import services from './reducers/services';
import opinions from './reducers/opinions';
import faq from './reducers/faq';

//Import your Routes here
import turnoRoutes from './routes/turno';
import navbarRoutes from './routes/navbar';
import authenticationsRoutes from './routes/authentication';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.scss';

const history = createBrowserHistory();

const store = createStore(
    combineReducers({
        router: connectRouter(history),
        form,
        turno,
        user,
        tipoEquipo,
        services,
        opinions,
        faq,
        /* Add your reducers here */
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    });

    return (
        <Fragment>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Header userLogged={window.user} />
                    <Switch>
                        <Route path="/" component={Home} strict exact />
                        {navbarRoutes}
                        {turnoRoutes}
                        {authenticationsRoutes}
                        <Route component={NotFoundPage} />
                    </Switch>
                    <Footer />
                </ConnectedRouter>
            </Provider>
        </Fragment>
    )
};

export default App;