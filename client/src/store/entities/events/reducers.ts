import { combineReducers } from 'redux';

import {
	Event,
	EventByIdState,
	EventAllIdsState,
	EventActionTypes,
	ADD_EVENT,
	REMOVE_EVENT,
	REMOVE_EVENTS_WITH_SUBSCRIPTION_ID,
	REMOVE_ALL_EVENTS
} from './types';

const byIdInitialState: EventByIdState = {};
const allIdsInitialState: EventAllIdsState = [];

function byIdReducer(state = byIdInitialState, action: EventActionTypes) {
	switch(action.type) {
		case ADD_EVENT: {
			const payload = action.payload as Event;
			return {
				[payload.id as string]: {
					...payload
				},
				...state
			};
		}
		case REMOVE_EVENT: {
			if(state[action.meta.id] !== undefined) {
				const newState = {...state};
				delete newState[action.meta.id];
				return newState;
			}

			return state;
		}
		case REMOVE_EVENTS_WITH_SUBSCRIPTION_ID: {
			const newState = {...state};
			// TODO: extract these out as functions
			const eventsWithSubscriptionId = Object.values(state)
				.filter((event) => event.subscriptionId === action.meta.id);
			const eventIdsWithSubscriptionId = eventsWithSubscriptionId
				.map((event) => event.id);

			eventIdsWithSubscriptionId.forEach((id) => {
				delete newState[id as string];
			});

			return newState;
		}
		case REMOVE_ALL_EVENTS: {
			return {};
		}
		default: {
			return state;
		}
	}
}

function allIdsReducer(state = allIdsInitialState, action: EventActionTypes): string[] {

	switch(action.type) {
		case ADD_EVENT: {
			return [...state, action.payload.id as string];
		}
		case REMOVE_EVENT: {
			return state.filter((id) => id !== action.meta.id);
		}
		case REMOVE_EVENTS_WITH_SUBSCRIPTION_ID: {
			// TODO: figure this out...
			return state;
		}
		case REMOVE_ALL_EVENTS: {
			return [];
		}
		default: {
			return state;
		}
	}
}

export default combineReducers({
	byId: byIdReducer,
	allIds: allIdsReducer
});