import {
	Event,
	ADD_EVENT,
	REMOVE_EVENT,
	REMOVE_EVENTS_WITH_SUBSCRIPTION_ID,
	REMOVE_ALL_EVENTS,
	EventActionTypes
} from './types';

export const addEvent = (newEvent: Event): EventActionTypes => ({
	type: ADD_EVENT,
	payload: newEvent
});

export const removeEvent = (id: string): EventActionTypes => ({
	type: REMOVE_EVENT,
	meta: {
		id
	}
});

export const removeEventsWithSubscriptionId = (id: string): EventActionTypes => ({
	type: REMOVE_EVENTS_WITH_SUBSCRIPTION_ID,
	meta: {
		id
	}
});

export const removeAllEvents = (): EventActionTypes => ({
	type: REMOVE_ALL_EVENTS
});