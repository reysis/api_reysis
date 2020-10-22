import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { createBrowserHistory } from 'history';
import {Route, Switch} from 'react-router-dom';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
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

import { library} from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {logged} from "./reducers/user/auth";
//import { faFacebook, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(fab)//, faFacebook, faLinkedin, faTwitter, faInstagram)

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
class Index extends Component{
    componentDidMount(){
        AOS.init({
            duration : 1500,
            once: true
        })
    }
    render(){
        return(
            <React.Fragment>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Header userLogged={window.user}/>
                    <Switch>
                        <Route path="/" component={Home} strict={true} exact={true}/>
                        {navbarRoutes}
                        {turnoRoutes}
                        {authenticationsRoutes}
                        <Route component={NotFoundPage} />
                    </Switch>
                    <Footer />
                </ConnectedRouter>
            </Provider>
            </React.Fragment>
        )
    }
};

ReactDOM.render(<Index/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
