import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Import your reducers here
import turno from './reducers/turno';
import user from './reducers/user';
import tipoEquipo from './reducers/tipo_equipo';
import services from './reducers/services';
import opinions from './reducers/opinions';
import faq from './reducers/faq';

import history from './history';

const middleware = [ routerMiddleware(history), thunk ];

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
	compose(
    	applyMiddleware( ...middleware ), 
    	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;