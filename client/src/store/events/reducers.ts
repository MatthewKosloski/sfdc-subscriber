import {
	EventState,
	EventActionTypes,
	ADD_EVENT,
	REMOVE_EVENT,
	REMOVE_ALL_EVENTS
} from './types';

import uuidv1 from 'uuid/v1';

const initialState: EventState = [];

/**
 * Indicates if there exists an event object in state with a
 * particular uuid.
 *
 * @param state The reducer state
 * @param uuid The uuid to use for the check.
 */
function hasEvent(state: EventState, uuid: string): boolean {
	return state.some((event) => event.Uuid === uuid);
};

export function eventsReducer(
	state = initialState,
	action: EventActionTypes
): EventState {

	switch(action.type) {
		case ADD_EVENT: {
			if(hasEvent(state, action.payload.Uuid)) {
				return state;
			} else {
				return [action.payload, ...state];
			}
		}
		case REMOVE_EVENT: {
			if(hasEvent(state, action.meta.uuid)) {
				return state.filter((event) =>
					event.Uuid !== action.meta.uuid);
			} else {
				return state;
			}
		}
		case REMOVE_ALL_EVENTS: {
			return [];
		}
		default: {
			return state;
		}
	}
}