import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import history from './history';

const middleware = [routerMiddleware(history), thunk];

import rootReducers from './redux/rootReducers';

const store = process.env.NODE_ENV !== 'production'
	? createStore(
		rootReducers,
		compose(
			applyMiddleware(...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	)
	: createStore(
		rootReducers,
		compose(
			applyMiddleware(...middleware)
		)
	);

export default store;