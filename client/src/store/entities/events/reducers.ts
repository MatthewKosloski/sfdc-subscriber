import {
	Event,
	EventState,
	EventActionTypes,
	ADD_EVENT,
	REMOVE_EVENT,
	REMOVE_EVENTS_WITH_SUBSCRIPTION_ID,
	REMOVE_ALL_EVENTS
} from './types';

const initialState: EventState = {};

export function eventsReducer(
	state = initialState,
	action: EventActionTypes
): EventState {

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