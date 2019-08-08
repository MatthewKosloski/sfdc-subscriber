export interface Event {
	Uuid: string,
	EventApiName: string,
	CreatedById: string,
	CreatedDate: string,
	CustomFields: {
		[key: string]: string
	}
}

export type EventState = Event[];

export const ADD_EVENT = 'ADD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const REMOVE_ALL_EVENTS = 'REMOVE_ALL_EVENTS';

interface AddEventAction {
	type: typeof ADD_EVENT,
	payload: Event
}

interface RemoveEventAction {
	type: typeof REMOVE_EVENT,
	meta: {
		uuid: string
	}
}

interface RemoveAllEventsAction {
	type: typeof REMOVE_ALL_EVENTS
}

export type EventActionTypes = AddEventAction | RemoveEventAction | RemoveAllEventsAction;