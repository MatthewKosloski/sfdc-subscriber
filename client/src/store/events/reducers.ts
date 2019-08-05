import {
	EventState,
	EventActionTypes,
	ADD_EVENT,
	REMOVE_EVENT
} from './types';

const initialState: EventState = [];

/**
 * Indicates if there exists an event object in state with a
 * particular uuid.
 *
 * @param state The reducer state
 * @param uuid The uuid to use for the check.
 */
function hasEvent(state: EventState, uuid: string): boolean {
	return state.some((event) => event.uuid === uuid);
};

export function eventsReducer(
	state = initialState,
	action: EventActionTypes
): EventState {

	switch(action.type) {
		case ADD_EVENT: {
			if(hasEvent(state, action.payload.uuid)) {
				console.log(`Already have event ${action.payload.uuid}.`);
				return state;
			} else {
				console.log(state);
				return [action.payload, ...state];
			}
		}
		case REMOVE_EVENT: {
			if(hasEvent(state, action.meta.uuid)) {
				return state.filter((event) =>
					event.uuid !== action.meta.uuid);
			} else {
				return state;
			}
		}
		default: {
			return state;
		}
	}
}