import { createStore, combineReducers, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';

import { subscriptionsReducer } from './subscriptions/reducers';
import { eventsReducer } from './events/reducers';
import { toastReducer } from './toast/reducers';
import { loggerMiddleware, socketMiddlware } from './middleware';
import socketController from './socketController';

const rootReducer = combineReducers({
	subscriptions: subscriptionsReducer,
	events: eventsReducer,
	toasts: toastReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const socket = io('http://localhost:3001');
	const store = createStore(rootReducer, composeWithDevTools(
		applyMiddleware(
			loggerMiddleware(),
			socketMiddlware(socket)
		)
	));

	socketController(socket, store.dispatch);

	return store;
}