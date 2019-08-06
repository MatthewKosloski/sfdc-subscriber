import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { subscriptionsReducer } from './subscriptions/reducers';
import { eventsReducer } from './events/reducers';
import { logger, socket } from './middleware';

const rootReducer = combineReducers({
	subscriptions: subscriptionsReducer,
	events: eventsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(rootReducer, composeWithDevTools(
		applyMiddleware(thunk, logger(), socket())
	));
	return store;
}