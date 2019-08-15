import { createStore, combineReducers, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';

import entitiesReducer from './entities';
import {
	loggerMiddleware,
	socketMiddlware,
	addEventMiddleware,
	addSubscriptionMiddleware,
	addToastMiddleware
} from './middleware';
import socketController from './socketController';

const rootReducer = combineReducers({
	entities: entitiesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const socket = io('http://localhost:3001');
	const store = createStore(rootReducer, composeWithDevTools(
		applyMiddleware(
			loggerMiddleware(),
			addEventMiddleware(),
			addSubscriptionMiddleware(),
			addToastMiddleware(),
			socketMiddlware(socket)
		)
	));

	socketController(socket, store.dispatch);

	return store;
}