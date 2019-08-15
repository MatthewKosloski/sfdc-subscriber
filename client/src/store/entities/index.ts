import { combineReducers } from 'redux';

import { subscriptionsReducer } from './subscriptions/reducers';
import eventsReducer from './events/reducers';
import { toastReducer } from './toast/reducers';

export default combineReducers({
	subscriptions: subscriptionsReducer,
	events: eventsReducer,
	toasts: toastReducer
});