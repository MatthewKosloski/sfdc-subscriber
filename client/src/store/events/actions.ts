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

export const removeEvent = (uuid: string): EventActionTypes => ({
	type: REMOVE_EVENT,
	meta: {
		uuid
	}
});

export const removeAllEvents = (): EventActionTypes => ({
	type: REMOVE_ALL_EVENTS
});