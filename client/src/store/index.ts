import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { subscriptionsReducer } from './subscriptions/reducers';

const rootReducer = combineReducers({
	subscriptions: subscriptionsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const store = createStore(
		rootReducer,
		devToolsEnhancer({})
	);
	return store;
}