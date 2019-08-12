import {
	Event,
	ADD_EVENT,
	REMOVE_EVENT,
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

export const removeAllEvents = (): EventActionTypes => ({
	type: REMOVE_ALL_EVENTS
});