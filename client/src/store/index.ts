import { createStore, combineReducers, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { subscriptionsReducer } from './subscriptions/reducers';
import { eventsReducer } from './events/reducers';
import { toastReducer } from './toast/reducers';
import { logger, socket } from './middleware';

const rootReducer = combineReducers({
	subscriptions: subscriptionsReducer,
	events: eventsReducer,
	toasts: toastReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer, composeWithDevTools(
		applyMiddleware(
			thunk,
			logger(),
			socket(io('http://localhost:3001'))
		)
	));
	return store;
}